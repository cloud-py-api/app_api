<?php

declare(strict_types=1);

namespace OCA\AppAPI\Controller;

use Exception;
use OC\App\AppStore\Fetcher\CategoryFetcher;
use OC\App\AppStore\Version\VersionParser;
use OC\App\DependencyAnalyzer;
use OC\App\Platform;
use OC_App;
use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Db\ExAppScope;
use OCA\AppAPI\DeployActions\DockerActions;
use OCA\AppAPI\Fetcher\ExAppFetcher;
use OCA\AppAPI\Service\AppAPIService;
use OCA\AppAPI\Service\DaemonConfigService;
use OCA\AppAPI\Service\ExAppApiScopeService;
use OCA\AppAPI\Service\ExAppScopesService;
use OCA\AppAPI\Service\ExAppService;
use OCA\AppAPI\Service\ExAppUsersService;
use OCP\App\IAppManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PasswordConfirmationRequired;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\L10N\IFactory;
use Psr\Log\LoggerInterface;

/**
 * ExApps actions controller similar to default one with project-specific changes and additions
 */
class ExAppsPageController extends Controller {
	private IInitialState $initialStateService;
	private IConfig $config;
	private AppAPIService $service;
	private DaemonConfigService $daemonConfigService;
	private ExAppScopesService $exAppScopeService;
	private DockerActions $dockerActions;
	private CategoryFetcher $categoryFetcher;
	private IFactory $l10nFactory;
	private ExAppFetcher $exAppFetcher;
	private ExAppApiScopeService $exAppApiScopeService;
	private IL10N $l10n;
	private LoggerInterface $logger;
	private IAppManager $appManager;
	private ExAppUsersService $exAppUsersService;

	public function __construct(
		IRequest $request,
		IConfig $config,
		IInitialState $initialStateService,
		AppAPIService $service,
		DaemonConfigService $daemonConfigService,
		ExAppScopesService $exAppScopeService,
		ExAppApiScopeService $exAppApiScopeService,
		ExAppUsersService $exAppUsersService,
		DockerActions $dockerActions,
		CategoryFetcher $categoryFetcher,
		IFactory $l10nFactory,
		ExAppFetcher $exAppFetcher,
		IL10N $l10n,
		LoggerInterface $logger,
		IAppManager $appManager,
		private readonly ExAppService $exAppService,
	) {
		parent::__construct(Application::APP_ID, $request);

		$this->initialStateService = $initialStateService;
		$this->config = $config;
		$this->service = $service;
		$this->daemonConfigService = $daemonConfigService;
		$this->exAppScopeService = $exAppScopeService;
		$this->exAppApiScopeService = $exAppApiScopeService;
		$this->dockerActions = $dockerActions;
		$this->categoryFetcher = $categoryFetcher;
		$this->l10nFactory = $l10nFactory;
		$this->l10n = $l10n;
		$this->exAppFetcher = $exAppFetcher;
		$this->logger = $logger;
		$this->appManager = $appManager;
		$this->exAppUsersService = $exAppUsersService;
	}

	#[NoCSRFRequired]
	public function viewApps(): TemplateResponse {
		$defaultDaemonConfigName = $this->config->getAppValue(Application::APP_ID, 'default_daemon_config');

		$appInitialData = [
			'appstoreEnabled' => $this->config->getSystemValueBool('appstoreenabled', true),
			'updateCount' => count($this->getExAppsWithUpdates()),
		];

		if ($defaultDaemonConfigName !== '') {
			$daemonConfig = $this->daemonConfigService->getDaemonConfigByName($defaultDaemonConfigName);
			if ($daemonConfig !== null) {
				$this->dockerActions->initGuzzleClient($daemonConfig);
				$daemonConfigAccessible = $this->dockerActions->ping($this->dockerActions->buildDockerUrl($daemonConfig));
				$appInitialData['daemon_config_accessible'] = $daemonConfigAccessible;
				$appInitialData['default_daemon_config'] = $daemonConfig->jsonSerialize();
				unset($appInitialData['default_daemon_config']['deploy_config']['haproxy_password']); // do not expose password
				if (!$daemonConfigAccessible) {
					$this->logger->error(sprintf('Deploy daemon "%s" is not accessible by Nextcloud. Please verify its configuration', $daemonConfig->getName()));
				}
			}
		}

		$this->initialStateService->provideInitialState('apps', $appInitialData);

		$templateResponse = new TemplateResponse(Application::APP_ID, 'main');
		$policy = new ContentSecurityPolicy();
		$policy->addAllowedImageDomain('https://usercontent.apps.nextcloud.com');
		$templateResponse->setContentSecurityPolicy($policy);

		return $templateResponse;
	}

	private function getExAppsWithUpdates(): array {
		$apps = $this->exAppFetcher->get();
		$appsWithUpdates = array_filter($apps, function (array $app) {
			$exApp = $this->exAppService->getExApp($app['id']);
			$newestVersion = $app['releases'][0]['version'];
			return $exApp !== null && isset($app['releases'][0]['version']) && version_compare($newestVersion, $exApp->getVersion(), '>');
		});
		return array_values($appsWithUpdates);
	}

	/**
	 * Using the same algorithm of ExApps listing as for regular apps.
	 * Returns all apps for a category from the App Store
	 *
	 * @throws Exception
	 */
	private function getAppsForCategory(string $requestedCategory = ''): array {
		$versionParser = new VersionParser();
		$formattedApps = [];
		$apps = $this->exAppFetcher->get();
		foreach ($apps as $app) {
			$exApp = $this->exAppService->getExApp($app['id']);

			// Skip all apps not in the requested category
			if ($requestedCategory !== '') {
				$isInCategory = false;
				foreach ($app['categories'] as $category) {
					if ($category === $requestedCategory) {
						$isInCategory = true;
					}
				}
				if (!$isInCategory) {
					continue;
				}
			}

			// Default PHP and NC versions requirements check preserved
			if (!isset($app['releases'][0]['rawPlatformVersionSpec'])) {
				continue;
			}
			$nextCloudVersion = $versionParser->getVersion($app['releases'][0]['rawPlatformVersionSpec']);
			$nextCloudVersionDependencies = [];
			if ($nextCloudVersion->getMinimumVersion() !== '') {
				$nextCloudVersionDependencies['nextcloud']['@attributes']['min-version'] = $nextCloudVersion->getMinimumVersion();
			}
			if ($nextCloudVersion->getMaximumVersion() !== '') {
				$nextCloudVersionDependencies['nextcloud']['@attributes']['max-version'] = $nextCloudVersion->getMaximumVersion();
			}
			$phpVersion = $versionParser->getVersion($app['releases'][0]['rawPhpVersionSpec']);
			$existsLocally = $exApp !== null;
			$phpDependencies = [];
			if ($phpVersion->getMinimumVersion() !== '') {
				$phpDependencies['php']['@attributes']['min-version'] = $phpVersion->getMinimumVersion();
			}
			if ($phpVersion->getMaximumVersion() !== '') {
				$phpDependencies['php']['@attributes']['max-version'] = $phpVersion->getMaximumVersion();
			}
			if (isset($app['releases'][0]['minIntSize'])) {
				$phpDependencies['php']['@attributes']['min-int-size'] = $app['releases'][0]['minIntSize'];
			}
			$authors = '';
			foreach ($app['authors'] as $key => $author) {
				$authors .= $author['name'];
				if ($key !== count($app['authors']) - 1) {
					$authors .= ', ';
				}
			}

			$currentLanguage = substr(\OC::$server->getL10NFactory()->findLanguage(), 0, 2);

			if ($exApp !== null) {
				$currentVersion = $exApp->getVersion();
			} else {
				$currentVersion = $app['releases'][0]['version'];
			}

			$scopes = null;
			$daemon = null;

			if ($exApp !== null) {
				$scopes = $this->exAppApiScopeService->mapScopeGroupsToNames(array_map(function (ExAppScope $exAppScope) {
					return $exAppScope->getScopeGroup();
				}, $this->exAppScopeService->getExAppScopes($exApp)));
				$daemon = $this->daemonConfigService->getDaemonConfigByName($exApp->getDaemonConfigName());
			}

			$formattedApps[] = [
				'id' => $app['id'],
				'installed' => $exApp !== null, // if ExApp registered then it's assumed that it was already deployed (installed)
				'appstore' => true,
				'name' => $app['translations'][$currentLanguage]['name'] ?? $app['translations']['en']['name'],
				'description' => $app['translations'][$currentLanguage]['description'] ?? $app['translations']['en']['description'],
				'summary' => $app['translations'][$currentLanguage]['summary'] ?? $app['translations']['en']['summary'],
				'license' => $app['releases'][0]['licenses'],
				'author' => $authors,
				'shipped' => false,
				'version' => $currentVersion,
				'types' => [],
				'documentation' => [
					'admin' => $app['adminDocs'],
					'user' => $app['userDocs'],
					'developer' => $app['developerDocs']
				],
				'website' => $app['website'],
				'bugs' => $app['issueTracker'],
				'detailpage' => $app['website'],
				'dependencies' => array_merge(
					$nextCloudVersionDependencies,
					$phpDependencies
				),
				'level' => ($app['isFeatured'] === true) ? 200 : 100,
				'missingMaxOwnCloudVersion' => false,
				'missingMinOwnCloudVersion' => false,
				'canInstall' => true,
				'screenshot' => isset($app['screenshots'][0]['url']) ? 'https://usercontent.apps.nextcloud.com/' . base64_encode($app['screenshots'][0]['url']) : '',
				'score' => $app['ratingOverall'],
				'ratingNumOverall' => $app['ratingNumOverall'],
				'ratingNumThresholdReached' => $app['ratingNumOverall'] > 5,
				'removable' => $existsLocally,
				'active' => $exApp !== null && $exApp->getEnabled() === 1,
				'needsDownload' => !$existsLocally,
				'fromAppStore' => true,
				'appstoreData' => $app,
				'scopes' => $scopes,
				'daemon' => $daemon,
				'systemApp' => $exApp !== null && $this->exAppUsersService->exAppUserExists($exApp->getAppid(), ''),
				'status' => $exApp !== null ? $exApp->getStatus() : [],
				'error' => $exApp !== null ? $exApp->getStatus()['error'] ?? '' : '',
			];
		}

		return $formattedApps;
	}

	#[NoCSRFRequired]
	public function listApps(): JSONResponse {
		$apps = $this->getAppsForCategory('');
		$appsWithUpdate = $this->getExAppsWithUpdates();

		$exApps = $this->exAppService->getExAppsList('all');
		$dependencyAnalyzer = new DependencyAnalyzer(new Platform($this->config), $this->l10n);

		$ignoreMaxApps = $this->config->getSystemValue('app_install_overwrite', []);
		if (!is_array($ignoreMaxApps)) {
			$this->logger->warning('The value given for app_install_overwrite is not an array. Ignoring...');
			$ignoreMaxApps = [];
		}

		// Extend existing app details
		$apps = array_map(function (array $appData) use ($appsWithUpdate, $dependencyAnalyzer, $ignoreMaxApps) {
			if (isset($appData['appstoreData'])) {
				$appstoreData = $appData['appstoreData'];
				$appData['screenshot'] = isset($appstoreData['screenshots'][0]['url']) ? 'https://usercontent.apps.nextcloud.com/' . base64_encode($appstoreData['screenshots'][0]['url']) : '';
				$appData['category'] = $appstoreData['categories'];
				$appData['releases'] = $appstoreData['releases'];
			}

			$appIdsWithUpdate = array_map(function (array $appWithUpdate) {
				return $appWithUpdate['id'];
			}, $appsWithUpdate);
			if (in_array($appData['id'], $appIdsWithUpdate)) {
				$appData['update'] = array_values(array_filter($appsWithUpdate, function ($appUpdate) use ($appData) {
					return $appUpdate['id'] === $appData['id'];
				}))[0]['releases'][0]['version'];
			}

			$appData['canUnInstall'] = !$appData['active'] && $appData['removable'] && !isset($appData['status']['type'])
				|| (isset($appData['status']['action']) && $appData['status']['action'] === 'init')
				|| !empty($appData['status']['error']);

			// fix licence vs license
			if (isset($appData['license']) && !isset($appData['licence'])) {
				$appData['licence'] = $appData['license'];
			}

			$ignoreMax = in_array($appData['id'], $ignoreMaxApps);

			// analyse dependencies
			$missing = $dependencyAnalyzer->analyze($appData, $ignoreMax);
			$appData['canInstall'] = empty($missing);
			$appData['missingDependencies'] = $missing;

			$appData['missingMinOwnCloudVersion'] = !isset($appData['dependencies']['nextcloud']['@attributes']['min-version']);
			$appData['missingMaxOwnCloudVersion'] = !isset($appData['dependencies']['nextcloud']['@attributes']['max-version']);
			$appData['isCompatible'] = $dependencyAnalyzer->isMarkedCompatible($appData);

			return $appData;
		}, $apps);

		$apps = $this->buildLocalAppsList($apps, $exApps);

		usort($apps, [$this, 'sortApps']);

		return new JSONResponse(['apps' => $apps, 'status' => 'success']);
	}

	/**
	 * Prepare list of local ExApps with required data structure to be listed in UI.
	 * This is a temporal solution to display local apps with lack of information about it until
	 * it's support extended.
	 *
	 * @param array $apps Formatted list of apps available in App Store
	 * @param array $exApps List of registered ExApps (could be not listed in App Store)
	 *
	 * @return array
	 */
	private function buildLocalAppsList(array $apps, array $exApps): array {
		$registeredAppsIds = array_map(function ($app) {
			return $app['id'];
		}, $apps);
		$formattedLocalApps = [];
		$auth = [];
		foreach ($exApps as $app) {
			if (!in_array($app['id'], $registeredAppsIds)) {
				$exApp = $this->exAppService->getExApp($app['id']);
				$daemon = $this->daemonConfigService->getDaemonConfigByName($exApp->getDaemonConfigName());
				$scopes = $this->exAppApiScopeService->mapScopeGroupsToNames(array_map(function (ExAppScope $exAppScope) {
					return $exAppScope->getScopeGroup();
				}, $this->exAppScopeService->getExAppScopes($exApp)));

				$formattedLocalApps[] = [
					'id' => $app['id'],
					'appstore' => false,
					'installed' => true,
					'name' => $exApp->getName(),
					'description' => '',
					'summary' => '',
					'license' => '',
					'author' => '',
					'shipped' => false,
					'version' => $exApp->getVersion(),
					'types' => [],
					'documentation' => [
						'admin' => '',
						'user' => '',
						'developer' => ''
					],
					'website' => '',
					'bugs' => '',
					'detailpage' => '',
					'dependencies' => [],
					'level' => 100,
					'missingMaxOwnCloudVersion' => false,
					'missingMinOwnCloudVersion' => false,
					'canInstall' => true, // to allow "remove" command for manual-install
					'canUnInstall' => !($exApp->getEnabled() === 1),
					'isCompatible' => true,
					'screenshot' => '',
					'score' => 0,
					'ratingNumOverall' => 0,
					'ratingNumThresholdReached' => false,
					'removable' => true, // to allow "remove" command for manual-install
					'active' => $exApp->getEnabled() === 1,
					'needsDownload' => false,
					'fromAppStore' => false,
					'appstoreData' => $app,
					'scopes' => $scopes,
					'daemon' => $daemon,
					'systemApp' => $this->exAppUsersService->exAppUserExists($exApp->getAppid(), ''),
					'exAppUrl' => $this->service->getExAppUrl($exApp, $exApp->getPort(), $auth),
					'releases' => [],
					'update' => null,
					'status' => $exApp->getStatus(),
					'error' => $exApp->getStatus()['error'] ?? '',
				];
			}
		}
		return array_merge($apps, $formattedLocalApps);
	}

	#[PasswordConfirmationRequired]
	public function enableApp(string $appId): JSONResponse {
		$updateRequired = false;
		$exApp = $this->exAppService->getExApp($appId);
		// If ExApp is not registered - then it's a "Deploy and Enable" action.
		if (!$exApp) {
			if (!$this->service->runOccCommand(sprintf("app_api:app:register --force-scopes --silent %s", $appId))) {
				return new JSONResponse(['data' => ['message' => $this->l10n->t('Error starting install of ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
			}
			$elapsedTime = 0;
			while ($elapsedTime < 5000000 && !$this->exAppService->getExApp($appId)) {
				usleep(150000); // 0.15
				$elapsedTime += 150000;
			}
			if (!$this->exAppService->getExApp($appId)) {
				return new JSONResponse(['data' => ['message' => $this->l10n->t('Could not perform installation of ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
			}
			return new JSONResponse([]);
		}

		$appsWithUpdate = $this->getExAppsWithUpdates();
		$appIdsWithUpdate = array_map(function (array $appWithUpdate) {
			return $appWithUpdate['id'];
		}, $appsWithUpdate);

		if (in_array($appId, $appIdsWithUpdate)) {
			$updateRequired = true;
		}

		if (!$this->service->enableExApp($exApp)) {
			return new JSONResponse(['data' => ['message' => $this->l10n->t('Failed to enable ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
		return new JSONResponse(['data' => ['update_required' => $updateRequired]]);
	}

	#[PasswordConfirmationRequired]
	public function disableApp(string $appId): JSONResponse {
		$exApp = $this->exAppService->getExApp($appId);
		if ($exApp) {
			if ($exApp->getEnabled()) {
				if (!$this->service->disableExApp($exApp)) {
					return new JSONResponse(['data' => ['message' => $this->l10n->t('Failed to disable ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
				}
			}
		}
		return new JSONResponse([]);
	}

	/**
	 * Default forced ExApp update process.
	 * Update approval via password confirmation.
	 * Scopes approval does not applied in UI for now.
	 */
	#[PasswordConfirmationRequired]
	#[NoCSRFRequired]
	public function updateApp(string $appId): JSONResponse {
		$appsWithUpdate = $this->getExAppsWithUpdates();
		$appIdsWithUpdate = array_map(function (array $appWithUpdate) {
			return $appWithUpdate['id'];
		}, $appsWithUpdate);
		if (!in_array($appId, $appIdsWithUpdate)) {
			return new JSONResponse(['data' => ['message' => $this->l10n->t('Could not update ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		$exAppOldVersion = $this->exAppService->getExApp($appId)->getVersion();
		if (!$this->service->runOccCommand(sprintf("app_api:app:update --force-scopes --silent %s", $appId))) {
			return new JSONResponse(['data' => ['message' => $this->l10n->t('Error starting update of ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		$elapsedTime = 0;
		while ($elapsedTime < 5000000) {
			$exApp = $this->exAppService->getExApp($appId);
			if ($exApp && ($exApp->getStatus()['type'] == 'update' || $exApp->getVersion() !== $exAppOldVersion)) {
				break;
			}
			usleep(150000); // 0.15
			$elapsedTime += 150000;
		}
		if ($elapsedTime >= 5000000) {
			return new JSONResponse(['data' => ['message' => $this->l10n->t('Could not perform update of ExApp')]], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
		return new JSONResponse();
	}

	/**
	 * Unregister ExApp, remove container and volume by default
	 */
	#[PasswordConfirmationRequired]
	public function uninstallApp(string $appId, bool $removeContainer = true, bool $removeData = false): JSONResponse {
		$exApp = $this->exAppService->getExApp($appId);
		if ($exApp) {
			if ($exApp->getEnabled()) {
				$this->service->disableExApp($exApp);
			}

			$daemonConfig = $this->daemonConfigService->getDaemonConfigByName($exApp->getDaemonConfigName());
			if ($daemonConfig->getAcceptsDeployId() === $this->dockerActions->getAcceptsDeployId()) {
				$this->dockerActions->initGuzzleClient($daemonConfig);
				if ($removeContainer) {
					$this->dockerActions->removeContainer($this->dockerActions->buildDockerUrl($daemonConfig), $this->dockerActions->buildExAppContainerName($appId));
					if ($removeData) {
						$this->dockerActions->removeVolume($this->dockerActions->buildDockerUrl($daemonConfig), $this->dockerActions->buildExAppVolumeName($appId));
					}
				}
			}
			$this->exAppService->unregisterExApp($appId);
		}
		return new JSONResponse();
	}

	/**
	 * Using default force mechanism for ExApps
	 */
	#[PasswordConfirmationRequired]
	public function force(string $appId): JSONResponse {
		$appId = OC_App::cleanAppId($appId);
		$this->appManager->ignoreNextcloudRequirementForApp($appId);
		return new JSONResponse();
	}

	/**
	 * Get all available categories
	 */
	public function listCategories(): JSONResponse {
		return new JSONResponse($this->getAllCategories());
	}

	/**
	 * Get ExApp status, that includes initialization information
	 */
	public function getAppStatus(string $appId): JSONResponse {
		$exApp = $this->exAppService->getExApp($appId);
		if (is_null($exApp)) {
			return new JSONResponse(['error' => $this->l10n->t('ExApp not found, failed to get status')], Http::STATUS_NOT_FOUND);
		}
		return new JSONResponse($exApp->getStatus());
	}

	/**
	 * Using default methods to fetch App Store categories as they are the same for ExApps
	 *
	 * @return mixed
	 */
	private function getAllCategories(): array {
		$currentLang = substr($this->l10nFactory->findLanguage(), 0, 2);
		$categories = $this->categoryFetcher->get();
		return array_map(function (array $category) use ($currentLang) {
			return [
				'id' => $category['id'],
				'ident' => $category['id'],
				'displayName' => $category['translations'][$currentLang]['name'] ?? $category['translations']['en']['name']
			];
		}, $categories);
	}

	private function sortApps($a, $b): int {
		$a = (string)$a['name'];
		$b = (string)$b['name'];
		if ($a === $b) {
			return 0;
		}
		return ($a < $b) ? -1 : 1;
	}
}
