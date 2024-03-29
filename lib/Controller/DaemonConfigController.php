<?php

declare(strict_types=1);

namespace OCA\AppAPI\Controller;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Db\DaemonConfig;

use OCA\AppAPI\DeployActions\DockerActions;
use OCA\AppAPI\Service\AppAPIService;
use OCA\AppAPI\Service\DaemonConfigService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Response;
use OCP\IConfig;
use OCP\IRequest;

/**
 * DaemonConfig actions (for UI)
 */
class DaemonConfigController extends ApiController {

	public function __construct(
		IRequest                             $request,
		private readonly IConfig             $config,
		private readonly DaemonConfigService $daemonConfigService,
		private readonly DockerActions       $dockerActions,
		private readonly AppAPIService       $service,
	) {
		parent::__construct(Application::APP_ID, $request);
	}

	#[NoCSRFRequired]
	public function getAllDaemonConfigs(): Response {
		$daemonConfigs = $this->daemonConfigService->getRegisteredDaemonConfigs();
		return new JSONResponse([
			'daemons' => $daemonConfigs,
			'default_daemon_config' => $this->config->getAppValue(Application::APP_ID, 'default_daemon_config', ''),
		]);
	}

	#[NoCSRFRequired]
	public function registerDaemonConfig(array $daemonConfigParams, bool $defaultDaemon = false): Response {
		$daemonConfig = $this->daemonConfigService->registerDaemonConfig($daemonConfigParams);
		if ($daemonConfig !== null && $defaultDaemon) {
			$this->config->setAppValue(Application::APP_ID, 'default_daemon_config', $daemonConfig->getName());
		}
		return new JSONResponse([
			'success' => $daemonConfig !== null,
			'daemonConfig' => $daemonConfig,
		]);
	}

	#[NoCSRFRequired]
	public function updateDaemonConfig(string $name, array $params): Response {
		$daemonConfig = $this->daemonConfigService->getDaemonConfigByName($name);
		$updatedDaemonConfig = new DaemonConfig($params);
		$updatedDaemonConfig->setId($daemonConfig->getId());
		$updatedDaemonConfig = $this->daemonConfigService->updateDaemonConfig($daemonConfig);
		return new JSONResponse([
			'success' => $updatedDaemonConfig !== null,
			'daemonConfig' => $updatedDaemonConfig,
		]);
	}

	#[NoCSRFRequired]
	public function unregisterDaemonConfig(string $name): Response {
		$daemonConfig = $this->daemonConfigService->getDaemonConfigByName($name);
		$defaultDaemonConfig = $this->config->getAppValue(Application::APP_ID, 'default_daemon_config', '');
		$this->service->removeExAppsByDaemonConfigName($daemonConfig);
		if ($daemonConfig->getName() === $defaultDaemonConfig) {
			$this->config->deleteAppValue(Application::APP_ID, 'default_daemon_config');
		}
		$daemonConfig = $this->daemonConfigService->unregisterDaemonConfig($daemonConfig);
		return new JSONResponse([
			'success' => $daemonConfig !== null,
			'daemonConfig' => $daemonConfig,
		]);
	}

	#[NoCSRFRequired]
	public function verifyDaemonConnection(string $name): Response {
		$daemonConfig = $this->daemonConfigService->getDaemonConfigByName($name);
		if ($daemonConfig->getAcceptsDeployId() !== $this->dockerActions->getAcceptsDeployId()) {
			return new JSONResponse([
				'error' => sprintf('Only "%s" is supported', $this->dockerActions->getAcceptsDeployId()),
			]);
		}
		$this->dockerActions->initGuzzleClient($daemonConfig);
		$dockerDaemonAccessible = $this->dockerActions->ping($this->dockerActions->buildDockerUrl($daemonConfig));
		return new JSONResponse([
			'success' => $dockerDaemonAccessible,
		]);
	}

	#[NoCSRFRequired]
	public function checkDaemonConnection(array $daemonParams): Response {
		$daemonConfig = new DaemonConfig([
			'name' => $daemonParams['name'],
			'display_name' => $daemonParams['display_name'],
			'accepts_deploy_id' => $daemonParams['accepts_deploy_id'],
			'protocol' => $daemonParams['protocol'],
			'host' => $daemonParams['host'],
			'deploy_config' => $daemonParams['deploy_config'],
		]);
		if ($daemonConfig->getAcceptsDeployId() !== $this->dockerActions->getAcceptsDeployId()) {
			return new JSONResponse([
				'error' => sprintf('Only "%s" is supported', $this->dockerActions->getAcceptsDeployId()),
			]);
		}
		$this->dockerActions->initGuzzleClient($daemonConfig);
		$dockerDaemonAccessible = $this->dockerActions->ping($this->dockerActions->buildDockerUrl($daemonConfig));
		return new JSONResponse([
			'success' => $dockerDaemonAccessible,
		]);
	}
}
