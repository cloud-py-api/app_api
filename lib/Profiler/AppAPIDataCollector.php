<?php

declare(strict_types=1);

namespace OCA\AppAPI\Profiler;

use OC\AppFramework\Http\Request;

use OCA\AppAPI\AppInfo\Application;

use OCP\AppFramework\Http\Response;
use OCP\DataCollector\AbstractDataCollector;
use Throwable;

/**
 * @psalm-suppress UndefinedClass
 */
class AppAPIDataCollector extends AbstractDataCollector {
	public function getName(): string {
		return Application::APP_ID;
	}

	public function collect(Request $request, Response $response, ?Throwable $exception = null): void {
		$headers = [];
		$aeHeadersList = [
			'AA-VERSION',
			'EX-APP-ID',
			'EX-APP-VERSION',
			'AUTHORIZATION-APP-API',
			'AA-REQUEST-ID',
		];
		foreach ($aeHeadersList as $header) {
			if ($request->getHeader($header) !== '') {
				if ($header === 'AUTHORIZATION-APP-API') {
					$authorization = $request->getHeader($header);
					$headers[$header] = $authorization;
					$headers['NC-USER-ID'] = explode(':', base64_decode($authorization), 2)[0];
					$headers['EX-APP-SECRET'] = explode(':', base64_decode($authorization), 2)[1];
					continue;
				}
				$headers[$header] = $request->getHeader($header);
			}
		}
		if (!empty($headers)) {
			$this->data = [
				'headers' => $headers,
			];
		}
	}
}
