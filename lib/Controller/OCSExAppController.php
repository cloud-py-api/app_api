<?php

declare(strict_types=1);

namespace OCA\AppAPI\Controller;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Service\AppAPIService;

use OCA\AppAPI\Service\ExAppService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class OCSExAppController extends OCSController {

	public function __construct(
		IRequest                       $request,
		private readonly AppAPIService $service,
		private readonly ExAppService  $exAppService,
	) {
		parent::__construct(Application::APP_ID, $request);
	}

	/**
	 * @throws OCSBadRequestException
	 */
	#[NoCSRFRequired]
	public function getExAppsList(string $list = 'enabled'): DataResponse {
		if (!in_array($list, ['all', 'enabled'])) {
			throw new OCSBadRequestException();
		}
		return new DataResponse($this->exAppService->getExAppsList($list), Http::STATUS_OK);
	}

	/**
	 * @throws OCSNotFoundException
	 * @throws OCSBadRequestException
	 */
	#[NoCSRFRequired]
	public function setExAppEnabled(string $appId, int $enabled): DataResponse {
		$exApp = $this->exAppService->getExApp($appId);
		if ($exApp === null) {
			throw new OCSNotFoundException('ExApp not found');
		}

		if (filter_var($enabled, FILTER_VALIDATE_BOOL)) {
			if ($exApp->getEnabled()) {
				throw new OCSBadRequestException('ExApp already enabled');
			}
			if (!$this->service->enableExApp($exApp)) {
				throw new OCSBadRequestException('Failed to enable ExApp');
			}
		} else {
			if (!$exApp->getEnabled()) {
				throw new OCSBadRequestException('ExApp already disabled');
			}
			if (!$this->service->disableExApp($exApp)) {
				throw new OCSBadRequestException('Failed to disable ExApp');
			}
		}

		return new DataResponse();
	}
}
