<?php

declare(strict_types=1);

namespace OCA\AppAPI\DeployActions;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Db\DaemonConfig;
use OCA\AppAPI\Db\ExApp;
use OCA\AppAPI\Service\AppAPICommonService;

use OCA\AppAPI\Service\ExAppService;
use OCP\App\IAppManager;
use OCP\ICertificateManager;
use OCP\IConfig;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;

class DockerActions implements IDeployActions {
	public const DOCKER_API_VERSION = 'v1.41';
	public const EX_APP_CONTAINER_PREFIX = 'nc_app_';
	public const APP_API_HAPROXY_USER = 'app_api_haproxy_user';

	private Client $guzzleClient;
	private bool $useSocket = false;  # for `pullImage` function, to detect can be stream used or not.

	public function __construct(
		private readonly LoggerInterface     $logger,
		private readonly IConfig             $config,
		private readonly ICertificateManager $certificateManager,
		private readonly IAppManager         $appManager,
		private readonly IURLGenerator       $urlGenerator,
		private readonly AppAPICommonService $service,
		private readonly ExAppService		 $exAppService,
	) {
	}

	public function getAcceptsDeployId(): string {
		return 'docker-install';
	}

	public function deployExApp(ExApp $exApp, DaemonConfig $daemonConfig, array $params = []): string {
		if (!isset($params['image_params'])) {
			return 'Missing image_params.';
		}
		$imageParams = $params['image_params'];

		if (!isset($params['container_params'])) {
			return 'Missing container_params.';
		}
		$containerParams = $params['container_params'];

		$dockerUrl = $this->buildDockerUrl($daemonConfig);
		$this->initGuzzleClient($daemonConfig);

		$this->exAppService->setAppDeployProgress($exApp, 0);
		$result = $this->pullImage($dockerUrl, $imageParams, $exApp, 0, 94);
		if ($result) {
			return $result;
		}

		$this->exAppService->setAppDeployProgress($exApp, 95);
		$containerInfo = $this->inspectContainer($dockerUrl, $this->buildExAppContainerName($params['container_params']['name']));
		if (isset($containerInfo['Id'])) {
			$result = $this->removeContainer($dockerUrl, $this->buildExAppContainerName($params['container_params']['name']));
			if ($result) {
				return $result;
			}
		}
		$this->exAppService->setAppDeployProgress($exApp, 96);
		$result = $this->createContainer($dockerUrl, $imageParams, $containerParams);
		if (isset($result['error'])) {
			return $result['error'];
		}
		$this->exAppService->setAppDeployProgress($exApp, 97);
		$result = $this->startContainer($dockerUrl, $this->buildExAppContainerName($params['container_params']['name']));
		if (isset($result['error'])) {
			return $result['error'];
		}
		$this->exAppService->setAppDeployProgress($exApp, 100);
		return '';
	}

	public function buildApiUrl(string $dockerUrl, string $route): string {
		return sprintf('%s/%s/%s', $dockerUrl, self::DOCKER_API_VERSION, $route);
	}

	public function buildImageName(array $imageParams): string {
		return $imageParams['image_src'] . '/' . $imageParams['image_name'] . ':' . $imageParams['image_tag'];
	}

	public function createContainer(string $dockerUrl, array $imageParams, array $params = []): array {
		$createVolumeResult = $this->createVolume($dockerUrl, $this->buildExAppVolumeName($params['name']));
		if (isset($createVolumeResult['error'])) {
			return $createVolumeResult;
		}

		$containerParams = [
			'Image' => $this->buildImageName($imageParams),
			'Hostname' => $params['hostname'],
			'HostConfig' => [
				'NetworkMode' => $params['net'],
				'Mounts' => $this->buildDefaultExAppVolume($params['hostname']),
				'RestartPolicy' => [
					'Name' => $this->config->getAppValue(Application::APP_ID, 'container_restart_policy', 'unless-stopped'),
				],
			],
			'Env' => $params['env'],
		];

		if (!in_array($params['net'], ['host', 'bridge'])) {
			$networkingConfig = [
				'EndpointsConfig' => [
					$params['net'] => [
						'Aliases' => [
							$params['hostname']
						],
					],
				],
			];
			$containerParams['NetworkingConfig'] = $networkingConfig;
		}

		if (isset($params['computeDevice'])) {
			if ($params['computeDevice']['id'] === 'cuda') {
				if (isset($params['deviceRequests'])) {
					$containerParams['HostConfig']['DeviceRequests'] = $params['deviceRequests'];
				} else {
					$containerParams['HostConfig']['DeviceRequests'] = $this->buildDefaultGPUDeviceRequests();
				}
			}
			if ($params['computeDevice']['id'] === 'rocm') {
				$containerParams['HostConfig']['Devices'] = $this->buildDevicesParams(['/dev/kfd', '/dev/dri']);
			}
		}

		$url = $this->buildApiUrl($dockerUrl, sprintf('containers/create?name=%s', urlencode($this->buildExAppContainerName($params['name']))));
		try {
			$options['json'] = $containerParams;
			$response = $this->guzzleClient->post($url, $options);
			return json_decode((string) $response->getBody(), true);
		} catch (GuzzleException $e) {
			$this->logger->error('Failed to create container', ['exception' => $e]);
			error_log($e->getMessage());
			return ['error' => 'Failed to create container'];
		}
	}

	public function startContainer(string $dockerUrl, string $containerId): array {
		$url = $this->buildApiUrl($dockerUrl, sprintf('containers/%s/start', $containerId));
		try {
			$response = $this->guzzleClient->post($url);
			return ['success' => $response->getStatusCode() === 204];
		} catch (GuzzleException $e) {
			$this->logger->error('Failed to start container', ['exception' => $e]);
			error_log($e->getMessage());
			return ['error' => 'Failed to start container'];
		}
	}

	public function stopContainer(string $dockerUrl, string $containerId): array {
		$url = $this->buildApiUrl($dockerUrl, sprintf('containers/%s/stop', $containerId));
		try {
			$response = $this->guzzleClient->post($url);
			return ['success' => $response->getStatusCode() === 204];
		} catch (GuzzleException $e) {
			$this->logger->error('Failed to stop container', ['exception' => $e]);
			error_log($e->getMessage());
			return ['error' => 'Failed to stop container'];
		}
	}

	public function removeContainer(string $dockerUrl, string $containerId): string {
		$url = $this->buildApiUrl($dockerUrl, sprintf('containers/%s?force=true', $containerId));
		try {
			$response = $this->guzzleClient->delete($url);
			$this->logger->debug(sprintf('StatusCode of container removal: %d', $response->getStatusCode()));
			if ($response->getStatusCode() === 200 || $response->getStatusCode() === 204) {
				return '';
			}
		} catch (GuzzleException $e) {
			if ($e->getCode() === 409) {  // "removal of container ... is already in progress"
				return '';
			}
			$this->logger->error('Failed to remove container', ['exception' => $e]);
			error_log($e->getMessage());
		}
		return sprintf('Failed to remove container: %s', $containerId);
	}

	public function pullImage(string $dockerUrl, array $params, ExApp $exApp, int $startPercent, int $maxPercent): string {
		# docs: https://github.com/docker/compose/blob/main/pkg/compose/pull.go
		$layerInProgress = ['preparing', 'waiting', 'pulling fs layer', 'download', 'extracting', 'verifying checksum'];
		$layerFinished = ['already exists', 'pull complete'];
		$disableProgressTracking = false;
		$imageId = $this->buildImageName($params);
		$url = $this->buildApiUrl($dockerUrl, sprintf('images/create?fromImage=%s', urlencode($imageId)));
		$this->logger->info(sprintf('Pulling ExApp Image: %s', $imageId));
		try {
			if ($this->useSocket) {
				$response = $this->guzzleClient->post($url);
			} else {
				$response = $this->guzzleClient->post($url, ['stream' => true]);
			}
			if ($response->getStatusCode() !== 200) {
				return sprintf('Pulling ExApp Image: %s return status code: %d', $imageId, $response->getStatusCode());
			}
			if ($this->useSocket) {
				return '';
			}
			$lastPercent = $startPercent;
			$layers = [];
			$buffer = '';
			$responseBody = $response->getBody();
			while (!$responseBody->eof()) {
				$buffer .= $responseBody->read(1024);
				try {
					while (($newlinePos = strpos($buffer, "\n")) !== false) {
						$line = substr($buffer, 0, $newlinePos);
						$buffer = substr($buffer, $newlinePos + 1);
						$jsonLine = json_decode(trim($line));
						if ($jsonLine) {
							if (isset($jsonLine->id) && isset($jsonLine->status)) {
								$layerId = $jsonLine->id;
								$status = strtolower($jsonLine->status);
								foreach ($layerInProgress as $substring) {
									if (str_contains($status, $substring)) {
										$layers[$layerId] = false;
										break;
									}
								}
								foreach ($layerFinished as $substring) {
									if (str_contains($status, $substring)) {
										$layers[$layerId] = true;
										break;
									}
								}
							}
						} else {
							$this->logger->warning(
								sprintf("Progress tracking of image pulling(%s) disabled, error: %d, data: %s", $exApp->getAppid(), json_last_error(), $line)
							);
							$disableProgressTracking = true;
						}
					}
				} catch (Exception $e) {
					$this->logger->warning(
						sprintf("Progress tracking of image pulling(%s) disabled, exception: %s", $exApp->getAppid(), $e->getMessage()), ['exception' => $e]
					);
					$disableProgressTracking = true;
				}
				if (!$disableProgressTracking) {
					$completedLayers = count(array_filter($layers));
					$totalLayers = count($layers);
					$newLastPercent = intval($totalLayers > 0 ? ($completedLayers / $totalLayers) * ($maxPercent - $startPercent) : 0);
					if ($lastPercent != $newLastPercent) {
						$this->exAppService->setAppDeployProgress($exApp, $newLastPercent);
						$lastPercent = $newLastPercent;
					}
				}
			}
			return '';
		} catch (GuzzleException $e) {
			$this->logger->error('Failed to pull image', ['exception' => $e]);
			error_log($e->getMessage());
			return 'Failed to pull image, GuzzleException occur.';
		}
	}

	public function inspectContainer(string $dockerUrl, string $containerId): array {
		$url = $this->buildApiUrl($dockerUrl, sprintf('containers/%s/json', $containerId));
		try {
			$response = $this->guzzleClient->get($url);
			return json_decode((string) $response->getBody(), true);
		} catch (GuzzleException $e) {
			return ['error' => $e->getMessage(), 'exception' => $e];
		}
	}

	public function createVolume(string $dockerUrl, string $volume): array {
		$url = $this->buildApiUrl($dockerUrl, 'volumes/create');
		try {
			$options['json'] = [
				'name' => $volume,
			];
			$response = $this->guzzleClient->post($url, $options);
			$result = json_decode((string) $response->getBody(), true);
			if ($response->getStatusCode() === 201) {
				return $result;
			}
			if ($response->getStatusCode() === 500) {
				error_log($result['message']);
				return ['error' => $result['message']];
			}
		} catch (GuzzleException $e) {
			$this->logger->error('Failed to create volume', ['exception' => $e]);
			error_log($e->getMessage());
		}
		return ['error' => 'Failed to create volume'];
	}

	public function removeVolume(string $dockerUrl, string $volume): array {
		$url = $this->buildApiUrl($dockerUrl, sprintf('volumes/%s', $volume));
		try {
			$options['json'] = [
				'name' => $volume,
			];
			$response = $this->guzzleClient->delete($url, $options);
			if ($response->getStatusCode() === 204) {
				return ['success' => true];
			}
			if ($response->getStatusCode() === 404) {
				error_log('Volume not found.');
				return ['error' => 'Volume not found.'];
			}
			if ($response->getStatusCode() === 409) {
				error_log('Volume is in use.');
				return ['error' => 'Volume is in use.'];
			}
			if ($response->getStatusCode() === 500) {
				error_log('Something went wrong.');
				return ['error' => 'Something went wrong.'];
			}
		} catch (GuzzleException $e) {
			$this->logger->error('Failed to create volume', ['exception' => $e]);
			error_log($e->getMessage());
		}
		return ['error' => 'Failed to remove volume'];
	}

	public function ping(string $dockerUrl): bool {
		$url = $this->buildApiUrl($dockerUrl, '_ping');
		try {
			$response = $this->guzzleClient->get($url);
			if ($response->getStatusCode() === 200) {
				return true;
			}
		} catch (Exception $e) {
			$this->logger->error('Could not connect to Docker daemon', ['exception' => $e]);
			error_log($e->getMessage());
		}
		return false;
	}

	public function buildDeployParams(DaemonConfig $daemonConfig, array $appInfo): array {
		$appId = (string) $appInfo['id'];
		$externalApp = $appInfo['external-app'];
		$deployConfig = $daemonConfig->getDeployConfig();

		if (isset($deployConfig['gpu']) && filter_var($deployConfig['gpu'], FILTER_VALIDATE_BOOLEAN)) {
			$deviceRequests = $this->buildDefaultGPUDeviceRequests();
		} else {
			$deviceRequests = [];
		}
		$storage = $this->buildDefaultExAppVolume($appId)[0]['Target'];

		$imageParams = [
			'image_src' => (string) ($externalApp['docker-install']['registry'] ?? 'docker.io'),
			'image_name' => (string) ($externalApp['docker-install']['image'] ?? $appId),
			'image_tag' => (string) ($externalApp['docker-install']['image-tag'] ?? 'latest'),
		];

		$envs = $this->buildDeployEnvs([
			'appid' => $appId,
			'name' => (string) $appInfo['name'],
			'version' => (string) $appInfo['version'],
			'host' => $this->service->buildExAppHost($deployConfig),
			'port' => $appInfo['port'],
			'storage' => $storage,
			'secret' => $appInfo['secret'],
		], $deployConfig);

		$containerParams = [
			'name' => $appId,
			'hostname' => $appId,
			'port' => $appInfo['port'],
			'net' => $deployConfig['net'] ?? 'host',
			'env' => $envs,
			'deviceRequests' => $deviceRequests,
			'gpu' => count($deviceRequests) > 0,
		];

		return [
			'image_params' => $imageParams,
			'container_params' => $containerParams,
		];
	}

	public function buildDeployEnvs(array $params, array $deployConfig): array {
		$autoEnvs = [
			sprintf('AA_VERSION=%s', $this->appManager->getAppVersion(Application::APP_ID, false)),
			sprintf('APP_SECRET=%s', $params['secret']),
			sprintf('APP_ID=%s', $params['appid']),
			sprintf('APP_DISPLAY_NAME=%s', $params['name']),
			sprintf('APP_VERSION=%s', $params['version']),
			sprintf('APP_HOST=%s', $params['host']),
			sprintf('APP_PORT=%s', $params['port']),
			sprintf('APP_PERSISTENT_STORAGE=%s', $params['storage']),
			sprintf('NEXTCLOUD_URL=%s', $deployConfig['nextcloud_url'] ?? str_replace('https', 'http', $this->urlGenerator->getAbsoluteURL(''))),
		];

		// Add required GPU runtime envs if daemon configured to use GPU
		if (isset($deployConfig['gpu']) && filter_var($deployConfig['gpu'], FILTER_VALIDATE_BOOLEAN)) {
			$autoEnvs[] = sprintf('NVIDIA_VISIBLE_DEVICES=%s', 'all');
			$autoEnvs[] = sprintf('NVIDIA_DRIVER_CAPABILITIES=%s', 'compute,utility');
		}
		return $autoEnvs;
	}

	public function resolveExAppUrl(
		string $appId, string $protocol, string $host, array $deployConfig, int $port, array &$auth
	): string {
		$host = explode(':', $host)[0];
		if ($protocol == 'https') {
			$exAppHost = $host;
		} elseif (isset($deployConfig['net']) && $deployConfig['net'] === 'host') {
			$exAppHost = 'localhost';
		} else {
			$exAppHost = $appId;
		}
		if (!isset($deployConfig['haproxy_password']) || $deployConfig['haproxy_password'] === '') {
			$auth = [];
		} else {
			$auth = [self::APP_API_HAPROXY_USER, $deployConfig['haproxy_password']];
		}
		return sprintf('%s://%s:%s', $protocol, $exAppHost, $port);
	}

	public function containerStateHealthy(array $containerInfo): bool {
		return $containerInfo['State']['Status'] === 'running';
	}

	public function healthcheckContainer(string $containerId, DaemonConfig $daemonConfig): bool {
		$attempts = 0;
		$totalAttempts = 90; // ~90 seconds for container to initialize
		while ($attempts < $totalAttempts) {
			$containerInfo = $this->inspectContainer($this->buildDockerUrl($daemonConfig), $containerId);
			if ($this->containerStateHealthy($containerInfo)) {
				return true;
			}
			$attempts++;
			sleep(1);
		}
		return false;
	}

	public function buildDockerUrl(DaemonConfig $daemonConfig): string {
		if (file_exists($daemonConfig->getHost())) {
			return 'http://localhost';
		}
		return $daemonConfig->getProtocol() . '://' . $daemonConfig->getHost();
	}

	public function initGuzzleClient(DaemonConfig $daemonConfig): void {
		$guzzleParams = [];
		if (file_exists($daemonConfig->getHost())) {
			$guzzleParams = [
				'curl' => [
					CURLOPT_UNIX_SOCKET_PATH => $daemonConfig->getHost(),
				],
			];
			$this->useSocket = true;
		} elseif ($daemonConfig->getProtocol() === 'https') {
			$guzzleParams = $this->setupCerts($guzzleParams);
		}
		if (isset($daemonConfig->getDeployConfig()['haproxy_password']) && $daemonConfig->getDeployConfig()['haproxy_password'] !== '') {
			$guzzleParams['auth'] = [self::APP_API_HAPROXY_USER, $daemonConfig->getDeployConfig()['haproxy_password']];
		}
		$this->guzzleClient = new Client($guzzleParams);
	}

	private function setupCerts(array $guzzleParams): array {
		if (!$this->config->getSystemValueBool('installed', false)) {
			$certs = \OC::$SERVERROOT . '/resources/config/ca-bundle.crt';
		} else {
			$certs = $this->certificateManager->getAbsoluteBundlePath();
		}

		$guzzleParams['verify'] = $certs;
		return $guzzleParams;
	}

	private function buildDevicesParams(array $devices): array {
		return array_map(function (string $device) {
			return ["PathOnHost" => $device, "PathInContainer" => $device, "CgroupPermissions" => "rwm"];
		}, $devices);
	}

	/**
	 * Build default volume for ExApp.
	 * For now only one volume created per ExApp.
	 */
	private function buildDefaultExAppVolume(string $appId): array {
		return [
			[
				'Type' => 'volume',
				'Source' => $this->buildExAppVolumeName($appId),
				'Target' => '/' . $this->buildExAppVolumeName($appId),
				'ReadOnly' => false
			],
		];
	}

	public function buildExAppContainerName(string $appId): string {
		return self::EX_APP_CONTAINER_PREFIX . $appId;
	}

	public function buildExAppVolumeName(string $appId): string {
		return self::EX_APP_CONTAINER_PREFIX . $appId . '_data';
	}

	private function isGPUAvailable(): bool {
		$gpusDir = '/dev/dri';
		if (is_dir($gpusDir) && is_readable($gpusDir)) {
			return true;
		}
		return false;
	}

	/**
	 * Return default GPU device requests for container.
	 */
	private function buildDefaultGPUDeviceRequests(): array {
		return [
			[
				'Driver' => 'nvidia', // Currently only NVIDIA GPU vendor
				'Count' => -1, // All available GPUs
				'Capabilities' => [['compute', 'utility']], // Compute and utility capabilities
			],
		];
	}
}
