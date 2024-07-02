<?php

declare(strict_types=1);

namespace OCA\AppAPI\Service;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Db\ExApp;
use OCA\AppAPI\Db\ExAppMapper;
use OCA\AppAPI\Fetcher\ExAppArchiveFetcher;
use OCA\AppAPI\Fetcher\ExAppFetcher;
use OCA\AppAPI\Service\ProvidersAI\SpeechToTextService;
use OCA\AppAPI\Service\ProvidersAI\TaskProcessingService;
use OCA\AppAPI\Service\ProvidersAI\TextProcessingService;
use OCA\AppAPI\Service\ProvidersAI\TranslationService;
use OCA\AppAPI\Service\UI\FilesActionsMenuService;
use OCA\AppAPI\Service\UI\InitialStateService;
use OCA\AppAPI\Service\UI\ScriptsService;
use OCA\AppAPI\Service\UI\SettingsService;
use OCA\AppAPI\Service\UI\StylesService;
use OCA\AppAPI\Service\UI\TopMenuService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\DB\Exception;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IUser;
use OCP\IUserManager;
use Psr\Log\LoggerInterface;
use SimpleXMLElement;

class ExAppService {
	private ICache $cache;

	public function __construct(
		private readonly LoggerInterface            $logger,
		ICacheFactory                               $cacheFactory,
		private readonly IUserManager               $userManager,
		private readonly ExAppFetcher               $exAppFetcher,
		private readonly ExAppArchiveFetcher        $exAppArchiveFetcher,
		private readonly ExAppMapper                $exAppMapper,
		private readonly ExAppUsersService          $exAppUsersService,
		private readonly ExAppApiScopeService       $exAppApiScopeService,
		private readonly TopMenuService             $topMenuService,
		private readonly InitialStateService        $initialStateService,
		private readonly ScriptsService             $scriptsService,
		private readonly StylesService              $stylesService,
		private readonly FilesActionsMenuService    $filesActionsMenuService,
		private readonly SpeechToTextService        $speechToTextService,
		private readonly TextProcessingService      $textProcessingService,
		private readonly TranslationService         $translationService,
		private readonly TaskProcessingService      $taskProcessingService,
		private readonly TalkBotsService            $talkBotsService,
		private readonly SettingsService            $settingsService,
		private readonly ExAppEventsListenerService $eventsListenerService,
		private readonly ExAppOccService            $occService,
	) {
		$this->cache = $cacheFactory->createDistributed(Application::APP_ID . '/service');
	}

	public function getExApp(string $appId): ?ExApp {
		foreach ($this->getExApps() as $exApp) {
			if ($exApp->getAppid() === $appId) {
				return $exApp;
			}
		}
		$this->logger->debug(sprintf('ExApp "%s" not found.', $appId));
		return null;
	}

	public function registerExApp(array $appInfo): ?ExApp {
		$exApp = new ExApp([
			'appid' => $appInfo['id'],
			'version' => $appInfo['version'],
			'name' => $appInfo['name'],
			'daemon_config_name' => $appInfo['daemon_config_name'],
			'port' => $appInfo['port'],
			'secret' => $appInfo['secret'],
			'status' => json_encode(['deploy' => 0, 'init' => 0, 'action' => '', 'type' => 'install', 'error' => '']),
			'created_time' => time(),
			'last_check_time' => time(),
			'is_system' => (int)filter_var($appInfo['external-app']['system'], FILTER_VALIDATE_BOOLEAN),
			'api_scopes' => $appInfo['api_scopes'],
		]);
		try {
			$this->exAppMapper->insert($exApp);
			$exApp = $this->exAppMapper->findByAppId($appInfo['id']);
			$this->cache->remove('/ex_apps');
			return $exApp;
		} catch (Exception | MultipleObjectsReturnedException | DoesNotExistException $e) {
			$this->logger->error(sprintf('Error while registering ExApp %s: %s', $appInfo['id'], $e->getMessage()));
			return null;
		}
	}

	public function unregisterExApp(string $appId): bool {
		$exApp = $this->getExApp($appId);
		if ($exApp === null) {
			return false;
		}
		$this->exAppUsersService->removeExAppUsers($appId);
		$this->talkBotsService->unregisterExAppTalkBots($exApp); // TODO: Think about internal Events for clean and flexible unregister ExApp callbacks
		$this->filesActionsMenuService->unregisterExAppFileActions($appId);
		$this->topMenuService->unregisterExAppMenuEntries($appId);
		$this->initialStateService->deleteExAppInitialStates($appId);
		$this->scriptsService->deleteExAppScripts($appId);
		$this->stylesService->deleteExAppStyles($appId);
		$this->speechToTextService->unregisterExAppSpeechToTextProviders($appId);
		$this->textProcessingService->unregisterExAppTextProcessingProviders($appId);
		$this->translationService->unregisterExAppTranslationProviders($appId);
		$this->taskProcessingService->unregisterExAppTaskProcessingProviders($appId);
		$this->settingsService->unregisterExAppForms($appId);
		$this->exAppArchiveFetcher->removeExAppFolder($appId);
		$this->eventsListenerService->unregisterExAppEventListeners($appId);
		$this->occService->unregisterExAppOccCommands($appId);
		$r = $this->exAppMapper->deleteExApp($appId);
		if ($r !== 1) {
			$this->logger->error(sprintf('Error while unregistering %s ExApp from the database.', $appId));
		}
		$this->cache->remove('/ex_apps');
		return $r === 1;
	}

	public function getExAppFreePort(): int {
		try {
			$ports = $this->exAppMapper->getUsedPorts();
			for ($port = 23000; $port <= 23999; $port++) {
				if (!in_array($port, $ports)) {
					return $port;
				}
			}
		} catch (Exception) {
		}
		return 0;
	}

	public function enableExAppInternal(ExApp $exApp): bool {
		$exApp->setEnabled(1);
		$status = $exApp->getStatus();
		$status['error'] = '';
		$exApp->setStatus($status);
		$exApp->setLastCheckTime(time());
		return $this->updateExApp($exApp, ['enabled', 'status', 'last_check_time']);
	}

	public function disableExAppInternal(ExApp $exApp): void {
		$exApp->setEnabled(0);
		$exApp->setLastCheckTime(time());
		$this->updateExApp($exApp, ['enabled', 'last_check_time']);
	}

	public function getExAppsByDaemonName(string $daemonName): array {
		try {
			return array_filter($this->exAppMapper->findAll(), function (ExApp $exApp) use ($daemonName) {
				return $exApp->getDaemonConfigName() === $daemonName;
			});
		} catch (Exception $e) {
			$this->logger->error(sprintf('Error while getting ExApps list. Error: %s', $e->getMessage()), ['exception' => $e]);
			return [];
		}
	}

	public function getExAppsList(string $list = 'enabled'): array {
		$exApps = $this->getExApps();
		if ($list === 'enabled') {
			$exApps = array_values(array_filter($exApps, function (ExApp $exApp) {
				return $exApp->getEnabled() === 1;
			}));
		}
		return array_map(function (ExApp $exApp) {
			return $this->formatExAppInfo($exApp);
		}, $exApps);
	}

	public function formatExAppInfo(ExApp $exApp): array {
		return [
			'id' => $exApp->getAppid(),
			'name' => $exApp->getName(),
			'version' => $exApp->getVersion(),
			'enabled' => filter_var($exApp->getEnabled(), FILTER_VALIDATE_BOOLEAN),
			'last_check_time' => $exApp->getLastCheckTime(),
			'system' => $exApp->getIsSystem(),
			'status' => $exApp->getStatus(),
			'scopes' => $this->exAppApiScopeService->mapScopeGroupsToNames($exApp->getApiScopes()),
		];
	}

	public function getNCUsersList(): ?array {
		return array_map(function (IUser $user) {
			return $user->getUID();
		}, $this->userManager->searchDisplayName(''));
	}

	public function updateExAppInfo(ExApp $exApp, array $appInfo): bool {
		$exApp->setVersion($appInfo['version']);
		$exApp->setName($appInfo['name']);
		$exApp->setIsSystem((int)filter_var($appInfo['external-app']['system'], FILTER_VALIDATE_BOOLEAN));
		$exApp->setApiScopes($appInfo['api_scopes']);
		if (!$this->updateExApp($exApp, ['version', 'name', 'is_system', 'api_scopes'])) {
			return false;
		}
		return true;
	}

	public function updateExApp(ExApp $exApp, array $fields = ['version', 'name', 'port', 'status', 'enabled', 'last_check_time', 'is_system', 'api_scopes']): bool {
		try {
			$this->exAppMapper->updateExApp($exApp, $fields);
			$this->cache->remove('/ex_apps');
			if (in_array('enabled', $fields)) {
				$this->resetCaches();
			}
			return true;
		} catch (Exception $e) {
			$this->logger->error(sprintf('Failed to update "%s" ExApp info.', $exApp->getAppid()), ['exception' => $e]);
			$this->cache->remove('/ex_apps');
			$this->resetCaches();
		}
		return false;
	}

	public function getLatestExAppInfoFromAppstore(string $appId, string &$extractedDir): ?SimpleXMLElement {
		$exApps = $this->exAppFetcher->get();
		$exAppAppstoreData = array_filter($exApps, function (array $exAppItem) use ($appId) {
			return $exAppItem['id'] === $appId && count($exAppItem['releases']) > 0;
		});
		if (empty($exAppAppstoreData)) {
			return null;
		}
		$exAppAppstoreData = end($exAppAppstoreData);
		$exAppReleaseInfo = end($exAppAppstoreData['releases']);
		if ($exAppReleaseInfo !== false) {
			return $this->exAppArchiveFetcher->downloadInfoXml($exAppAppstoreData, $extractedDir);
		}
		return null;
	}

	private function resetCaches(): void {
		$this->topMenuService->resetCacheEnabled();
		$this->filesActionsMenuService->resetCacheEnabled();
		$this->textProcessingService->resetCacheEnabled();
		$this->speechToTextService->resetCacheEnabled();
		$this->translationService->resetCacheEnabled();
		$this->settingsService->resetCacheEnabled();
		$this->eventsListenerService->resetCacheEnabled();
		$this->occService->resetCacheEnabled();
	}

	public function getAppInfo(string $appId, ?string $infoXml, ?string $jsonInfo): array {
		$extractedDir = '';
		if ($jsonInfo !== null) {
			$appInfo = json_decode($jsonInfo, true);
			# fill 'id' if it is missing(this field was called `appid` in previous versions in json)
			$appInfo['id'] = $appInfo['id'] ?? $appId;
			# during manual install JSON can have all values at root level
			foreach (['docker-install', 'scopes', 'system', 'system_app', 'translations_folder'] as $key) {
				if (isset($appInfo[$key])) {
					$appInfo['external-app'][$key] = $appInfo[$key];
					unset($appInfo[$key]);
				}
			}
			# TO-DO: remove this in AppAPI 2.4.0
			if (isset($appInfo['external-app']['system_app'])) {
				$appInfo['external-app']['system'] = $appInfo['external-app']['system_app'];
				unset($appInfo['external-app']['system_app']);
			}
		} else {
			if ($infoXml !== null) {
				$xmlAppInfo = simplexml_load_string(file_get_contents($infoXml));
				if ($xmlAppInfo === false) {
					return ['error' => sprintf('Failed to load info.xml from %s', $infoXml)];
				}
			} else {
				$xmlAppInfo = $this->getLatestExAppInfoFromAppstore($appId, $extractedDir);
				if (empty($xmlAppInfo)) {
					return ['error' => sprintf('Failed to get app info for `%s` from the Appstore', $appId)];
				}
			}
			$appInfo = json_decode(json_encode((array)$xmlAppInfo), true);
			if (isset($appInfo['external-app']['scopes']['value'])) {
				if (is_array($appInfo['external-app']['scopes']['value'])) {
					$appInfo['external-app']['scopes'] = $appInfo['external-app']['scopes']['value'];
				} else {
					$appInfo['external-app']['scopes'] = [$appInfo['external-app']['scopes']['value']];
				}
			}
			if ($extractedDir) {
				if (file_exists($extractedDir . '/l10n')) {
					$appInfo['translations_folder'] = $extractedDir . '/l10n';
				} else {
					$this->logger->info(sprintf('Application %s does not support translations', $appId));
				}
			}
		}
		return $appInfo;
	}

	public function setAppDeployProgress(ExApp $exApp, int $progress, string $error = ''): void {
		if ($progress < 0 || $progress > 100) {
			throw new \InvalidArgumentException('Invalid ExApp deploy status progress value');
		}
		$status = $exApp->getStatus();
		if ($progress !== 0 && isset($status['deploy']) && $status['deploy'] === 100) {
			return;
		}
		if ($error !== '') {
			$this->logger->error(sprintf('ExApp %s deploying failed. Error: %s', $exApp->getAppid(), $error));
			$status['error'] = $error;
		} else {
			if ($progress === 0) {
				$status['action'] = 'deploy';
				$status['deploy_start_time'] = time();
				$status['error'] = '';
			}
			$status['deploy'] = $progress;
		}
		unset($status['active']);  # TO-DO: Remove in AppAPI 2.4.0
		if ($progress === 100) {
			$status['action'] = 'healthcheck';
		}
		$exApp->setStatus($status);
		$exApp->setLastCheckTime(time());
		$this->updateExApp($exApp, ['status', 'last_check_time']);
	}

	public function waitInitStepFinish(string $appId): string {
		do {
			$exApp = $this->getExApp($appId);
			$status = $exApp->getStatus();
			if (isset($status['error']) && $status['error'] !== '') {
				return sprintf('ExApp %s initialization step failed. Error: %s', $appId, $status['error']);
			}
			usleep(100000); // 0.1s
		} while ($status['init'] !== 100);
		return "";
	}

	public function setStatusError(ExApp $exApp, string $error): void {
		$status = $exApp->getStatus();
		$status['error'] = $error;
		$exApp->setStatus($status);
		$this->updateExApp($exApp, ['status']);
	}

	/**
	 * Get list of registered ExApps
	 *
	 * @return ExApp[]
	 */
	public function getExApps(): array {
		try {
			$cacheKey = '/ex_apps';
			$records = $this->cache->get($cacheKey);
			if ($records !== null) {
				return array_map(function ($record) {
					return $record instanceof ExApp ? $record : new ExApp($record);
				}, $records);
			}
			$records = $this->exAppMapper->findAll();
			$this->cache->set($cacheKey, $records);
			return $records;
		} catch (Exception) {
			return [];
		}
	}
}
