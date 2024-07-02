<?php

declare(strict_types=1);

namespace OCA\AppAPI\Service\ProvidersAI;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Db\TaskProcessing\TaskProcessingProvider;
use OCA\AppAPI\Db\TaskProcessing\TaskProcessingProviderMapper;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\DB\Exception;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IServerContainer;
use OCP\TaskProcessing\IProvider;
use Psr\Log\LoggerInterface;

class TaskProcessingService {
	private ICache $cache;

	public function __construct(
		ICacheFactory $cacheFactory,
		private readonly TaskProcessingProviderMapper $mapper,
		private readonly LoggerInterface $logger,
	) {
		$this->cache = $cacheFactory->createDistributed(Application::APP_ID . '/ex_task_processing_providers');
	}

	/**
	 * Get list of registered TaskProcessing providers (only for enabled ExApps)
	 *
	 * @return TaskProcessingProvider[]
	 */
	public function getRegisteredTaskProcessingProviders(): array {
		try {
			$cacheKey = '/ex_task_processing_providers';
			$records = $this->cache->get($cacheKey);
			if ($records === null) {
				$records = $this->mapper->findAllEnabled();
				$this->cache->set($cacheKey, $records);
			}

			return array_map(static function ($record) {
				return new TaskProcessingProvider($record);
			}, $records);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), [
				'app' => 'app_api',
				'exception' => $e,
			]);
			return [];
		}
	}

	public function getExAppTaskProcessingProvider(string $appId, string $name): ?TaskProcessingProvider {
		foreach ($this->getRegisteredTaskProcessingProviders() as $provider) {
			if (($provider->getAppId() === $appId) && ($provider->getName() === $name)) {
				return $provider;
			}
		}
		try {
			return $this->mapper->findByAppIdName($appId, $name);
		} catch (DoesNotExistException|MultipleObjectsReturnedException|Exception) {
			return null;
		}
	}

	public function registerTaskProcessingProvider(
		string $appId,
		string $name,
		string $displayName,
		string $taskType
	): ?TaskProcessingProvider {
		try {
			$taskProcessingProvider = $this->mapper->findByAppidName($appId, $name);
		} catch (DoesNotExistException|MultipleObjectsReturnedException|Exception) {
			$taskProcessingProvider = null;
		}
		try {
			$newTaskProcessingProvider = new TaskProcessingProvider([
				'app_id' => $appId,
				'name' => $name,
				'display_name' => $displayName,
				'task_type' => $taskType,
			]);

			if ($taskProcessingProvider !== null) {
				$newTaskProcessingProvider->setId($taskProcessingProvider->getId());
			}

			$taskProcessingProvider = $this->mapper->insertOrUpdate($newTaskProcessingProvider);
			$this->resetCacheEnabled();
		} catch (Exception $e) {
			$this->logger->error(
				sprintf('Failed to register ExApp %s TaskProcessingProvider %s. Error: %s', $appId, $name, $e->getMessage()), ['exception' => $e]
			);
			return null;
		}
		return $taskProcessingProvider;
	}

	public function unregisterTaskProcessingProvider(string $appId, string $name): ?TaskProcessingProvider {
		try {
			$taskProcessingProvider = $this->getExAppTaskProcessingProvider($appId, $name);
			if ($taskProcessingProvider !== null) {
				$this->mapper->delete($taskProcessingProvider);
				$this->resetCacheEnabled();
				return $taskProcessingProvider;
			}
		} catch (Exception $e) {
			$this->logger->error(sprintf('Failed to unregister ExApp %s TaskProcessingProvider %s. Error: %s', $appId, $name, $e->getMessage()), ['exception' => $e]);
		}
		return null;
	}

	/**
	 * Register dynamically ExApps TaskProcessing providers with ID using anonymous classes.
	 *
	 * @param IRegistrationContext $context
	 * @param IServerContainer $serverContainer
	 *
	 * @return void
	 */
	public function registerExAppTaskProcessingProviders(IRegistrationContext $context, IServerContainer $serverContainer): void {
		$exAppsProviders = $this->getRegisteredTaskProcessingProviders();
		foreach ($exAppsProviders as $exAppProvider) {
			$className = '\\OCA\\AppAPI\\' . $exAppProvider->getAppId() . '\\' . $exAppProvider->getName();
			$provider = $this->getAnonymousExAppProvider($exAppProvider);
			$context->registerService($className, function () use ($provider) {
				return $provider;
			});
			$context->registerTaskProcessingProvider($className);
		}
	}

	/**
	 * @psalm-suppress UndefinedClass, MissingDependency, InvalidReturnStatement, InvalidReturnType
	 */
	private function getAnonymousExAppProvider(
		TaskProcessingProvider $provider,
	): IProvider {
		return new class($provider) implements IProvider {
			public function __construct(
				private readonly TaskProcessingProvider $provider,
			) {
			}

			public function getId(): string {
				return $this->provider->getName();
			}

			public function getName(): string {
				return $this->provider->getDisplayName();
			}

			public function getTaskTypeId(): string {
				return $this->provider->getTaskType();
			}

			public function getExpectedRuntime(): int {
				return 0;
			}

			public function getOptionalInputShape(): array {
				return [];
			}

			public function getOptionalOutputShape(): array {
				return [];
			}
		};
	}

	public function resetCacheEnabled(): void {
		$this->cache->remove('/ex_task_processing_providers');
	}

	public function unregisterExAppTaskProcessingProviders(string $appId): int {
		try {
			$result = $this->mapper->removeAllByAppId($appId);
		} catch (Exception) {
			$result = -1;
		}
		$this->resetCacheEnabled();
		return $result;
	}
}
