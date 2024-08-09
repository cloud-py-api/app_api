<?php

declare(strict_types=1);

namespace OCA\AppAPI\Service\ProvidersAI;

use JsonException;
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
use OCP\TaskProcessing\EShapeType;
use OCP\TaskProcessing\IProvider;
use OCP\TaskProcessing\ITaskType;
use OCP\TaskProcessing\ShapeDescriptor;
use OCP\TaskProcessing\ShapeEnumValue;
use Psr\Log\LoggerInterface;

class TaskProcessingService {
	private ?ICache $cache = null;

	public function __construct(
		ICacheFactory $cacheFactory,
		private readonly TaskProcessingProviderMapper $mapper,
		private readonly LoggerInterface $logger,
	) {
		if ($cacheFactory->isAvailable()) {
			$this->cache = $cacheFactory->createDistributed(Application::APP_ID . '/ex_task_processing_providers');
		}
	}

	/**
	 * Get list of registered TaskProcessing providers (only for enabled ExApps)
	 *
	 * @return TaskProcessingProvider[]
	 */
	public function getRegisteredTaskProcessingProviders(): array {
		try {
			$cacheKey = '/ex_task_processing_providers';
			$records = $this->cache?->get($cacheKey);
			if ($records === null) {
				$records = $this->mapper->findAllEnabled();
				$this->cache?->set($cacheKey, $records);
			}

			return array_map(static function ($record) {
				return new TaskProcessingProvider($record);
			}, $records);
		} catch (Exception) {
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

	private function everyElementHasKeys(array|null $array, array $keys): bool {
		if (!is_array($array)) {
			return false;
		}

		foreach ($array as $propertyName => $properties) {
			if (!is_string($propertyName) || !is_array($properties)) {
				return false;
			}
			foreach ($properties as $property) {
				if (!is_array($property)) {
					return false;
				}
				foreach ($keys as $key) {
					if (!array_key_exists($key, $property)) {
						return false;
					}
				}
			}
		}

		return true;
	}

	private function validateTaskProcessingProvider(array $provider): void {
		if (!isset($provider['id']) || !is_string($provider['id'])) {
			throw new Exception('"id" key must be a string');
		}
		if (!isset($provider['name']) || !is_string($provider['name'])) {
			throw new Exception('"name" key must be a string');
		}
		if (!isset($provider['task_type']) || !is_string($provider['task_type'])) {
			throw new Exception('"task_type" key must be a string');
		}
		if (!isset($provider['expected_runtime']) || !is_int($provider['expected_runtime'])) {
			throw new Exception('"expected_runtime" key must be an integer');
		}
		if (!$this->everyElementHasKeys($provider['optional_input_shape'], ['name', 'description', 'shape_type'])) {
			throw new Exception('"optional_input_shape" should be an array and must have "name", "description" and "shape_type" keys');
		}
		if (!$this->everyElementHasKeys($provider['optional_output_shape'], ['name', 'description', 'shape_type'])) {
			throw new Exception('"optional_output_shape" should be an array and must have "name", "description" and "shape_type" keys');
		}
		if (!$this->everyElementHasKeys($provider['input_shape_enum_values'], ['name', 'value'])) {
			throw new Exception('"input_shape_enum_values" should be an array and must have "name" and "value" keys');
		}
		if (!isset($provider['input_shape_defaults']) || !is_array($provider['input_shape_defaults'])) {
			throw new Exception('"input_shape_defaults" key must be an array');
		}
		if (!$this->everyElementHasKeys($provider['optional_input_shape_enum_values'], ['name', 'value'])) {
			throw new Exception('"optional_input_shape_enum_values" should be an array and must have "name" and "value" keys');
		}
		if (!isset($provider['optional_input_shape_defaults']) || !is_array($provider['optional_input_shape_defaults'])) {
			throw new Exception('"optional_input_shape_defaults" key must be an array');
		}
		if (!$this->everyElementHasKeys($provider['output_shape_enum_values'], ['name', 'value'])) {
			throw new Exception('"output_shape_enum_values" should be an array and must have "name" and "value" keys');
		}
		if (!$this->everyElementHasKeys($provider['optional_output_shape_enum_values'], ['name', 'value'])) {
			throw new Exception('"optional_output_shape_enum_values" should be an array and must have "name" and "value" keys');
		}
	}

	public function registerTaskProcessingProvider(
		string $appId,
		array $provider,
		?array $customTaskType,
	): ?TaskProcessingProvider {
		try {
			if (is_array($customTaskType) && $provider['task_type'] !== $customTaskType['id']) {
				throw new Exception('Task type and custom task type must be the same if custom task type is provided');
			} elseif ($customTaskType === null && $provider['task_type'] === null) {
				throw new Exception('Task type must be provided if custom task type is not provided');
			}
			$this->validateTaskProcessingProvider($provider);
		} catch (Exception $e) {
			$this->logger->error(
				sprintf('Failed to register the ExApp "%s" TaskProcessingProvider "%s". Error: %s', $appId, $provider['name'] ?? '(no name found)', $e->getMessage()),
				['exception' => $e],
			);
			return null;
		}

		$name = $provider['id'];
		$displayName = $provider['name'];
		$taskType = $provider['task_type'];

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
				'provider' => json_encode($provider, JSON_THROW_ON_ERROR),
				'custom_task_type' => json_encode($customTaskType, JSON_THROW_ON_ERROR),
			]);

			if ($taskProcessingProvider !== null) {
				$newTaskProcessingProvider->setId($taskProcessingProvider->getId());
			}

			$taskProcessingProvider = $this->mapper->insertOrUpdate($newTaskProcessingProvider);
			$this->resetCacheEnabled();
		} catch (Exception $e) {
			$this->logger->error(
				sprintf('Failed to register ExApp "%s" TaskProcessingProvider "%s". Error: %s', $appId, $name, $e->getMessage()), ['exception' => $e]
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
			/** @var class-string<IProvider> $className */
			$className = '\\OCA\\AppAPI\\' . $exAppProvider->getAppId() . '\\' . $exAppProvider->getName();

			try {
				$provider = $this->getAnonymousExAppProvider(json_decode($exAppProvider->getProvider(), true, flags: JSON_THROW_ON_ERROR));
			} catch (JsonException $e) {
				$this->logger->debug('Failed to register ExApp TaskProcessing provider', ['exAppId' => $exAppProvider->getAppId(), 'taskType' => $exAppProvider->getName(), 'exception' => $e]);
				continue;
			} catch (\Throwable) {
				continue;
			}

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
		array $provider,
	): IProvider {
		return new class($provider) implements IProvider {
			public function __construct(
				private readonly array $provider,
			) {
			}

			public function getId(): string {
				return $this->provider['id'];
			}

			public function getName(): string {
				return $this->provider['name'];
			}

			public function getTaskTypeId(): string {
				return $this->provider['task_type'];
			}

			public function getExpectedRuntime(): int {
				return $this->provider['expected_runtime'];
			}

			public function getOptionalInputShape(): array {
				return array_map(function ($shape) {
					return new ShapeDescriptor(
						$shape['name'],
						$shape['description'],
						EShapeType::from($shape['shape_type']),
					);
				}, $this->provider['optional_input_shape']);
			}

			public function getOptionalOutputShape(): array {
				return array_map(static function (array $shape) {
					return new ShapeDescriptor(
						$shape['name'],
						$shape['description'],
						EShapeType::from($shape['shape_type']),
					);
				}, $this->provider['optional_output_shape']);
			}

			public function getInputShapeEnumValues(): array {
				return $this->arrayToTaskProcessingEnumValues($this->provider['input_shape_enum_values']);
			}

			public function getInputShapeDefaults(): array {
				return $this->provider['input_shape_defaults'];
			}

			public function getOptionalInputShapeEnumValues(): array {
				return $this->arrayToTaskProcessingEnumValues($this->provider['optional_input_shape_enum_values']);
			}

			public function getOptionalInputShapeDefaults(): array {
				return $this->provider['optional_input_shape_defaults'];
			}

			public function getOutputShapeEnumValues(): array {
				return $this->arrayToTaskProcessingEnumValues($this->provider['output_shape_enum_values']);
			}

			public function getOptionalOutputShapeEnumValues(): array {
				return $this->arrayToTaskProcessingEnumValues($this->provider['optional_output_shape_enum_values']);
			}

			private function arrayToTaskProcessingEnumValues(array $enumValues): array {
				$taskProcessingEnumValues = [];
				foreach ($enumValues as $key => $value) {
					$taskProcessingEnumValues[$key] = array_map(static fn (array $shape) => new ShapeEnumValue(...$shape), $value);
				}
				return $taskProcessingEnumValues;
			}
		};
	}

	public function resetCacheEnabled(): void {
		$this->cache?->remove('/ex_task_processing_providers');
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

	/**
	 * @param IRegistrationContext $context
	 *
	 * @return void
	 */
	public function registerExAppTaskProcessingCustomTaskTypes(IRegistrationContext $context): void {
		$exAppsProviders = $this->getRegisteredTaskProcessingProviders();
		foreach ($exAppsProviders as $exAppProvider) {
			$customTaskType = $exAppProvider->getCustomTaskType();
			if ($customTaskType === null) {
				continue;
			}

			/** @var class-string<ITaskType> $className */
			$className = '\\OCA\\AppAPI\\' . $exAppProvider->getAppId() . '\\' . $exAppProvider->getName() . '\\TaskType';
			try {
				$taskType = $this->getAnonymousTaskType(json_decode($customTaskType, true, 512, JSON_THROW_ON_ERROR));
			} catch (JsonException $e) {
				$this->logger->debug('Failed to register ExApp TaskProcessing custom task type', ['exAppId' => $exAppProvider->getAppId(), 'taskType' => $exAppProvider->getName(), 'exception' => $e]);
				continue;
			} catch (\Throwable) {
				continue;
			}

			$context->registerService($className, function () use ($taskType) {
				return $taskType;
			});
			$context->registerTaskProcessingTaskType($className);
		}
	}

	private function getAnonymousTaskType(
		array $customTaskType,
	): ITaskType {
		return new class($customTaskType) implements ITaskType {
			public function __construct(
				private readonly array $customTaskType,
			) {
			}

			public function getId(): string {
				return $this->customTaskType['id'];
			}

			public function getName(): string {
				return $this->customTaskType['name'];
			}

			public function getDescription(): string {
				return $this->customTaskType['description'];
			}

			public function getInputShape(): array {
				return array_map(static fn (array $shape) => new ShapeDescriptor(
					$shape['name'],
					$shape['description'],
					EShapeType::from($shape['type']),
				), $this->customTaskType['input_shape']);
			}

			public function getOutputShape(): array {
				return array_map(static fn (array $shape) => new ShapeDescriptor(
					$shape['name'],
					$shape['description'],
					EShapeType::from($shape['type']),
				), $this->customTaskType['output_shape']);
			}
		};
	}
}
