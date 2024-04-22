<?php

declare(strict_types=1);

namespace OCA\AppAPI\Service;

use OCA\AppAPI\Db\DaemonConfig;
use OCA\AppAPI\Db\DaemonConfigMapper;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\DB\Exception;
use Psr\Log\LoggerInterface;

/**
 * Daemon configuration (daemons)
 */
class DaemonConfigService {
	public function __construct(
		private readonly LoggerInterface    $logger,
		private readonly DaemonConfigMapper $mapper,
		private readonly ExAppService       $exAppService,
	) {
	}

	public function registerDaemonConfig(array $params): ?DaemonConfig {
		$bad_patterns = ['http', 'https', 'tcp', 'udp', 'ssh'];
		$docker_host = (string)$params['host'];
		foreach ($bad_patterns as $bad_pattern) {
			if (str_starts_with($docker_host, $bad_pattern . '://')) {
				$this->logger->error('Failed to register daemon configuration. `host` must not include a protocol.');
				return null;
			}
		}
		if ($params['protocol'] !== 'http' && $params['protocol'] !== 'https') {
			$this->logger->error('Failed to register daemon configuration. `protocol` must be `http` or `https`.');
			return null;
		}
		$params['deploy_config']['nextcloud_url'] = rtrim($params['deploy_config']['nextcloud_url'], '/');
		try {
			return $this->mapper->insert(new DaemonConfig([
				'name' => $params['name'],
				'display_name' => $params['display_name'],
				'accepts_deploy_id' => $params['accepts_deploy_id'],
				'protocol' => $params['protocol'],
				'host' => $params['host'],
				'deploy_config' => $params['deploy_config'],
			]));
		} catch (Exception $e) {
			$this->logger->error('Failed to register daemon config. Error: ' . $e->getMessage(), ['exception' => $e]);
			return null;
		}
	}

	public function unregisterDaemonConfig(DaemonConfig $daemonConfig): ?DaemonConfig {
		try {
			return $this->mapper->delete($daemonConfig);
		} catch (Exception $e) {
			$this->logger->error('Failed to unregister daemon config. Error: ' . $e->getMessage(), ['exception' => $e]);
			return null;
		}
	}

	/**
	 * @return DaemonConfig[]
	 */
	public function getRegisteredDaemonConfigs(): array {
		try {
			return $this->mapper->findAll();
		} catch (Exception $e) {
			$this->logger->debug('Failed to get registered daemon configs. Error: ' . $e->getMessage(), ['exception' => $e]);
			return [];
		}
	}

	public function getDaemonConfigsWithAppsCount(): array {
		$exApps = $this->exAppService->getExAppsList('all');
		$daemonsExAppsCount = [];
		foreach ($exApps as $app) {
			$exApp = $this->exAppService->getExApp($app['id']);
			if (!isset($daemonsExAppsCount[$exApp->getDaemonConfigName()])) {
				$daemonsExAppsCount[$exApp->getDaemonConfigName()] = 0;
			}
			$daemonsExAppsCount[$exApp->getDaemonConfigName()] += 1;
		}
		return array_map(function (DaemonConfig $daemonConfig) use ($daemonsExAppsCount) {
			return [
				...$daemonConfig->jsonSerialize(),
				'exAppsCount' => isset($daemonsExAppsCount[$daemonConfig->getName()]) ? $daemonsExAppsCount[$daemonConfig->getName()] : 0,
			];
		}, $this->getRegisteredDaemonConfigs());
	}

	public function getDaemonConfigByName(string $name): ?DaemonConfig {
		try {
			return $this->mapper->findByName($name);
		} catch (DoesNotExistException|MultipleObjectsReturnedException|Exception $e) {
			$this->logger->debug('Failed to get daemon config by name. Error: ' . $e->getMessage(), ['exception' => $e]);
			return null;
		}
	}

	public function updateDaemonConfig(DaemonConfig $daemonConfig): ?DaemonConfig {
		try {
			return $this->mapper->update($daemonConfig);
		} catch (Exception $e) {
			$this->logger->error('Failed to update DaemonConfig. Error: ' . $e->getMessage(), ['exception' => $e]);
			return null;
		}
	}
}
