<?php

declare(strict_types=1);

namespace OCA\AppAPI\Service;

use OCA\AppAPI\AppInfo\Application;

class ExAppApiScopeService {
	public const BASIC_API_SCOPE = 1;
	public const ALL_API_SCOPE = 9999;

	protected array $apiScopes;

	public function __construct(
	) {
		$aeApiV1Prefix = '/apps/' . Application::APP_ID . '/api/v1';
		$aeApiV2Prefix = '/apps/' . Application::APP_ID . '/api/v2';
		$this->apiScopes = [
			// AppAPI scopes
			['api_route' => $aeApiV1Prefix . '/ui/files-actions-menu', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV2Prefix . '/ui/files-actions-menu', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ui/top-menu', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ui/initial-state', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ui/script', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ui/style', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ui/settings', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/log', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ex-app/config', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ex-app/preference', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/users', 'scope_group' => 2, 'name' => 'SYSTEM', 'user_check' => 1],
			['api_route' => $aeApiV1Prefix . '/ex-app/all', 'scope_group' => 2, 'name' => 'SYSTEM', 'user_check' => 1],
			['api_route' => $aeApiV1Prefix . '/ex-app/enabled', 'scope_group' => 2, 'name' => 'SYSTEM', 'user_check' => 1],
			['api_route' => $aeApiV1Prefix . '/notification', 'scope_group' => 32, 'name' => 'NOTIFICATIONS', 'user_check' => 1],
			['api_route' => $aeApiV1Prefix . '/talk_bot', 'scope_group' => 60, 'name' => 'TALK_BOT', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/ai_provider/', 'scope_group' => 61, 'name' => 'AI_PROVIDERS', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/events_listener', 'scope_group' => 62, 'name' => 'EVENTS_LISTENER', 'user_check' => 0],
			['api_route' => $aeApiV1Prefix . '/occ_command', 'scope_group' => 63, 'name' => 'OCC_COMMAND', 'user_check' => 0],

			// AppAPI internal scopes
			['api_route' => '/apps/app_api/apps/status', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],

			// Cloud scopes
			['api_route' => '/cloud/capabilities', 'scope_group' => 1, 'name' => 'BASIC', 'user_check' => 0],
			['api_route' => '/cloud/apps', 'scope_group' => 2, 'name' => 'SYSTEM', 'user_check' => 1],
			['api_route' => '/apps/provisioning_api/api/', 'scope_group' => 2, 'name' => 'SYSTEM', 'user_check' => 1],
			['api_route' => '/settings/admin/log/', 'scope_group' => 2, 'name' => 'SYSTEM', 'user_check' => 0],
			['api_route' => '/dav/', 'scope_group' => 10, 'name' => 'FILES', 'user_check' => 1],
			['api_route' => '/apps/files/ajax/', 'scope_group' => 10, 'name' => 'FILES', 'user_check' => 1],
			['api_route' => '/apps/files_sharing/api/', 'scope_group' => 11, 'name' => 'FILES_SHARING', 'user_check' => 1],
			['api_route' => '/cloud/user', 'scope_group' => 30, 'name' => 'USER_INFO', 'user_check' => 1],
			['api_route' => '/cloud/groups', 'scope_group' => 30, 'name' => 'USER_INFO', 'user_check' => 1],
			['api_route' => '/apps/user_status/api/', 'scope_group' => 31, 'name' => 'USER_STATUS', 'user_check' => 1],
			['api_route' => '/apps/notifications/api/', 'scope_group' => 32, 'name' => 'NOTIFICATIONS', 'user_check' => 1],
			['api_route' => '/apps/weather_status/api/', 'scope_group' => 33, 'name' => 'WEATHER_STATUS', 'user_check' => 1],
			['api_route' => '/apps/spreed/api/', 'scope_group' => 50, 'name' => 'TALK', 'user_check' => 1],
			['api_route' => '/taskprocessing/', 'scope_group' => 61, 'name' => 'AI_PROVIDERS', 'user_check' => 0],
			['api_route' => '/apps/activity/api/', 'scope_group' => 110, 'name' => 'ACTIVITIES', 'user_check' => 1],
			['api_route' => '/apps/notes/api/', 'scope_group' => 120, 'name' => 'NOTES', 'user_check' => 1],
			['api_route' => '/textprocessing/', 'scope_group' => 200, 'name' => 'TEXT_PROCESSING', 'user_check' => 1],
			['api_route' => '/translation/', 'scope_group' => 210, 'name' => 'MACHINE_TRANSLATION', 'user_check' => 1],

			//ALL Scope
			['api_route' => 'non-exist-all-api-route', 'scope_group' => self::ALL_API_SCOPE, 'name' => 'ALL', 'user_check' => 1],
		];
	}

	public function getApiScopeByRoute(string $apiRoute): ?array {
		foreach ($this->apiScopes as $apiScope) {
			if (str_starts_with($this->sanitizeOcsRoute($apiRoute), $apiScope['api_route'])) {
				return $apiScope;
			}
		}
		return null;
	}

	/**
	 * Check if the given route has ocs prefix and cut it off
	 */
	private function sanitizeOcsRoute(string $route): string {
		if (preg_match("/\/ocs\/v([12])\.php/", $route, $matches)) {
			return str_replace($matches[0], '', $route);
		}
		return $route;
	}

	/**
	 * @param int[] $scopeGroups
	 *
	 * @return string[]
	 */
	public function mapScopeGroupsToNames(array $scopeGroups): array {
		$apiScopes = array_values(array_filter($this->apiScopes, function (array $apiScope) use ($scopeGroups) {
			return in_array($apiScope['scope_group'], $scopeGroups);
		}));
		return array_unique(array_map(function (array $apiScope) {
			return $apiScope['name'];
		}, $apiScopes));
	}

	public function mapScopeGroupsToNumbers(array $scopeGroups): array {
		$apiScopes = array_values(array_filter($this->apiScopes, function (array $apiScope) use ($scopeGroups) {
			return in_array($apiScope['name'], $scopeGroups);
		}));
		return array_unique(array_map(function (array $apiScope) {
			return $apiScope['scope_group'];
		}, $apiScopes));
	}
}
