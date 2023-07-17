<?php

declare(strict_types=1);

/**
 *
 * Nextcloud - App Ecosystem V2
 *
 * @copyright Copyright (c) 2023 Andrey Borysenko <andrey18106x@gmail.com>
 *
 * @copyright Copyright (c) 2023 Alexander Piskun <bigcat88@icloud.com>
 *
 * @author 2023 Andrey Borysenko <andrey18106x@gmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\AppEcosystemV2\AppInfo;

use OCA\AppEcosystemV2\Profiler\AEDataCollector;
use OCA\AppEcosystemV2\PublicCapabilities;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\Profiler\IProfiler;
use OCP\SabrePluginEvent;

use OCA\Files\Event\LoadAdditionalScriptsEvent;

use OCA\AppEcosystemV2\Capabilities;
use OCA\AppEcosystemV2\DavPlugin;
use OCA\AppEcosystemV2\Listener\LoadFilesPluginListener;
use OCA\AppEcosystemV2\Listener\SabrePluginAuthInitListener;
use OCA\AppEcosystemV2\Middleware\AppEcosystemAuthMiddleware;
use OCA\DAV\Events\SabrePluginAuthInitEvent;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class Application extends App implements IBootstrap {
	public const APP_ID = 'app_ecosystem_v2';

	public const CACHE_TTL = 60 * 60;
	public const ICON_CACHE_TTL = 60 * 60 *24;

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);

		$this->registerDavAuth();
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadFilesPluginListener::class);
		$context->registerCapability(Capabilities::class);
		$context->registerCapability(PublicCapabilities::class);
		$context->registerMiddleware(AppEcosystemAuthMiddleware::class);
		$context->registerEventListener(SabrePluginAuthInitEvent::class, SabrePluginAuthInitListener::class);
	}

	public function boot(IBootContext $context): void {
		$server = $context->getServerContainer();
		try {
			$profiler = $server->get(IProfiler::class);
			if ($profiler->isEnabled()) {
				$profiler->add(new AEDataCollector());
			}
		} catch (NotFoundExceptionInterface|ContainerExceptionInterface) {
		}
	}

	public function registerDavAuth(): void {
		$container = $this->getContainer();

		$dispatcher = $container->getServer()->getEventDispatcher();
		$dispatcher->addListener('OCA\DAV\Connector\Sabre::addPlugin', function (SabrePluginEvent $event) use ($container) {
			$event->getServer()->addPlugin($container->query(DavPlugin::class));
		});
	}
}

