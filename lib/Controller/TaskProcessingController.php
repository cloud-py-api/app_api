<?php

declare(strict_types=1);

namespace OCA\AppAPI\Controller;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Attribute\AppAPIAuth;
use OCA\AppAPI\Service\ProvidersAI\TaskProcessingService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\OCSController;
use OCP\IConfig;
use OCP\IRequest;

class TaskProcessingController extends OCSController {
	protected $request;

	public function __construct(
		IRequest                                           $request,
		private readonly IConfig                           $config,
		private readonly TaskProcessingService             $taskProcessingService,
	) {
		parent::__construct(Application::APP_ID, $request);

		$this->request = $request;
	}

	#[NoCSRFRequired]
	#[PublicPage]
	#[AppAPIAuth]
	public function registerProvider(
		array $provider,
		?array $customTaskType,
	): DataResponse {
		if (!$this->isSupported()) {
			return new DataResponse([], Http::STATUS_NOT_IMPLEMENTED);
		}

		$providerObj = $this->taskProcessingService->registerTaskProcessingProvider(
			$this->request->getHeader('EX-APP-ID'),
			$provider,
			$customTaskType,
		);

		if ($providerObj === null) {
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		}

		return new DataResponse();
	}

	#[NoCSRFRequired]
	#[PublicPage]
	#[AppAPIAuth]
	public function unregisterProvider(string $name): Response {
		if (!$this->isSupported()) {
			return new DataResponse([], Http::STATUS_NOT_IMPLEMENTED);
		}

		$unregistered = $this->taskProcessingService->unregisterTaskProcessingProvider(
			$this->request->getHeader('EX-APP-ID'), $name
		);

		if ($unregistered === null) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		return new DataResponse();
	}

	#[NoCSRFRequired]
	#[PublicPage]
	#[AppAPIAuth]
	public function getProvider(string $name): DataResponse {
		if (!$this->isSupported()) {
			return new DataResponse([], Http::STATUS_NOT_IMPLEMENTED);
		}
		$result = $this->taskProcessingService->getExAppTaskProcessingProvider(
			$this->request->getHeader('EX-APP-ID'), $name
		);
		if (!$result) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		return new DataResponse($result, Http::STATUS_OK);
	}

	private function isSupported() {
		$ncVersion = $this->config->getSystemValueString('version', '0.0.0');
		return version_compare($ncVersion, '30.0', '>=');
	}
}
