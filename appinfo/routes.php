<?php

declare(strict_types=1);

return [
	'routes' => [
		// AppAPI admin settings
		['name' => 'Config#setAdminConfig', 'url' => '/admin-config', 'verb' => 'PUT'],

		// Menu Entries
		['name' => 'TopMenu#viewExAppPage',
			'url' => '/embedded/{appId}/{name}/{other}', 'verb' => 'GET' , 'root' => '/embedded',
			'requirements' => ['other' => '.*'], 'defaults' => ['other' => '']],

		// Proxy
		['name' => 'ExAppProxy#ExAppGet',
			'url' => '/proxy/{appId}/{other}', 'verb' => 'GET' , 'root' => '/proxy',
			'requirements' => ['other' => '.*'], 'defaults' => ['other' => '']],
		['name' => 'ExAppProxy#ExAppPost',
			'url' => '/proxy/{appId}/{other}', 'verb' => 'POST' , 'root' => '/proxy',
			'requirements' => ['other' => '.+'], 'defaults' => ['other' => '']],
		['name' => 'ExAppProxy#ExAppPut',
			'url' => '/proxy/{appId}/{other}', 'verb' => 'PUT' , 'root' => '/proxy',
			'requirements' => ['other' => '.+'], 'defaults' => ['other' => '']],
		['name' => 'ExAppProxy#ExAppDelete',
			'url' => '/proxy/{appId}/{other}', 'verb' => 'DELETE' , 'root' => '/proxy',
			'requirements' => ['other' => '.+'], 'defaults' => ['other' => '']],

		// ExApps actions
		['name' => 'ExAppsPage#viewApps', 'url' => '/apps', 'verb' => 'GET' , 'root' => '/apps'],
		['name' => 'ExAppsPage#listCategories', 'url' => '/apps/categories', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#listApps', 'url' => '/apps/list', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#enableApp', 'url' => '/apps/enable/{appId}', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#enableApp', 'url' => '/apps/enable/{appId}', 'verb' => 'POST' , 'root' => ''],
		['name' => 'ExAppsPage#getAppStatus', 'url' => '/apps/status/{appId}', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#getAppLogs', 'url' => '/apps/logs/{appId}', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#disableApp', 'url' => '/apps/disable/{appId}', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#updateApp', 'url' => '/apps/update/{appId}', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#uninstallApp', 'url' => '/apps/uninstall/{appId}', 'verb' => 'GET' , 'root' => ''],
		['name' => 'ExAppsPage#viewApps', 'url' => '/apps/{category}', 'verb' => 'GET', 'defaults' => ['category' => ''] , 'root' => ''],
		['name' => 'ExAppsPage#viewApps', 'url' => '/apps/{category}/{id}', 'verb' => 'GET', 'defaults' => ['category' => '', 'id' => ''] , 'root' => ''],
		['name' => 'ExAppsPage#force', 'url' => '/apps/force', 'verb' => 'POST' , 'root' => ''],

		// DaemonConfig actions
		['name' => 'DaemonConfig#getAllDaemonConfigs', 'url' => '/daemons', 'verb' => 'GET'],
		['name' => 'DaemonConfig#registerDaemonConfig', 'url' => '/daemons', 'verb' => 'POST'],
		['name' => 'DaemonConfig#unregisterDaemonConfig', 'url' => '/daemons/{name}', 'verb' => 'DELETE'],
		['name' => 'DaemonConfig#verifyDaemonConnection', 'url' => '/daemons/{name}/check', 'verb' => 'POST'],
		['name' => 'DaemonConfig#checkDaemonConnection', 'url' => '/daemons/verify_connection', 'verb' => 'POST'],

		// Test Deploy actions
		['name' => 'DaemonConfig#startTestDeploy', 'url' => '/daemons/{name}/test_deploy', 'verb' => 'POST'],
		['name' => 'DaemonConfig#stopTestDeploy', 'url' => '/daemons/{name}/test_deploy', 'verb' => 'DELETE'],
		['name' => 'DaemonConfig#getTestDeployStatus', 'url' => '/daemons/{name}/test_deploy/status', 'verb' => 'GET'],
	],
	'ocs' => [
		// Logging
		['name' => 'OCSApi#log', 'url' => '/api/v1/log', 'verb' => 'POST'],

		['name' => 'OCSApi#getNCUsersList', 'url' => '/api/v1/users', 'verb' => 'GET'],
		['name' => 'OCSApi#setAppInitProgress', 'url' => '/apps/status/{appId}', 'verb' => 'PUT'],

		// ExApps
		['name' => 'OCSExApp#getExAppsList', 'url' => '/api/v1/ex-app/{list}', 'verb' => 'GET'],
		['name' => 'OCSExApp#getExApp', 'url' => '/api/v1/ex-app/info/{appId}', 'verb' => 'GET'],

		// Requests to ExApps
		['name' => 'OCSExApp#requestToExApp', 'url' => '/api/v1/ex-app/request/{appId}/', 'verb' => 'POST'],
		['name' => 'OCSExApp#aeRequestToExApp', 'url' => '/api/v1/ex-app/request/{appId}/{$userId}', 'verb' => 'POST'],

		// ExApps actions
		['name' => 'OCSExApp#setExAppEnabled', 'url' => '/api/v1/ex-app/{appId}/enabled', 'verb' => 'PUT'],

		// appconfig_ex (app configuration)
		['name' => 'AppConfig#setAppConfigValue', 'url' => '/api/v1/ex-app/config', 'verb' => 'POST'],
		['name' => 'AppConfig#getAppConfigValues', 'url' => '/api/v1/ex-app/config/get-values', 'verb' => 'POST'],
		['name' => 'AppConfig#deleteAppConfigValues', 'url' => '/api/v1/ex-app/config', 'verb' => 'DELETE'],

		// preferences_ex (user-specific configuration)
		['name' => 'Preferences#setUserConfigValue', 'url' => '/api/v1/ex-app/preference', 'verb' => 'POST'],
		['name' => 'Preferences#getUserConfigValues', 'url' => '/api/v1/ex-app/preference/get-values', 'verb' => 'POST'],
		['name' => 'Preferences#deleteUserConfigValues', 'url' => '/api/v1/ex-app/preference', 'verb' => 'DELETE'],

		// Notifications
		['name' => 'Notifications#sendNotification', 'url' => '/api/v1/notification', 'verb' => 'POST'],

		// Events
		['name' => 'EventsListener#registerListener', 'url' => '/api/v1/events_listener', 'verb' => 'POST'],
		['name' => 'EventsListener#unregisterListener', 'url' => '/api/v1/events_listener', 'verb' => 'DELETE'],
		['name' => 'EventsListener#getListener', 'url' => '/api/v1/events_listener', 'verb' => 'GET'],

		// Commands
		['name' => 'OccCommand#registerCommand', 'url' => '/api/v1/occ_command', 'verb' => 'POST'],
		['name' => 'OccCommand#unregisterCommand', 'url' => '/api/v1/occ_command', 'verb' => 'DELETE'],
		['name' => 'OccCommand#getCommand', 'url' => '/api/v1/occ_command', 'verb' => 'GET'],

		// Talk bots
		['name' => 'TalkBot#registerExAppTalkBot', 'url' => '/api/v1/talk_bot', 'verb' => 'POST'],
		['name' => 'TalkBot#unregisterExAppTalkBot', 'url' => '/api/v1/talk_bot', 'verb' => 'DELETE'],
		['name' => 'TalkBot#proxyTalkMessage',
			'url' => '/api/v1/talk_proxy/{appId}/{route}', 'verb' => 'POST' , 'requirements' => ['route' => '.+']],

		// --- UI ---
		// File Actions Menu
		['name' => 'OCSUi#registerFileActionMenu', 'url' => '/api/v1/ui/files-actions-menu', 'verb' => 'POST'],
		['name' => 'OCSUi#registerFileActionMenuV2', 'url' => '/api/v2/ui/files-actions-menu', 'verb' => 'POST'],
		['name' => 'OCSUi#unregisterFileActionMenu', 'url' => '/api/v1/ui/files-actions-menu', 'verb' => 'DELETE'],
		['name' => 'OCSUi#getFileActionMenu', 'url' => '/api/v1/ui/files-actions-menu', 'verb' => 'GET'],

		// Top Menu
		['name' => 'OCSUi#registerExAppMenuEntry', 'url' => '/api/v1/ui/top-menu', 'verb' => 'POST'],
		['name' => 'OCSUi#unregisterExAppMenuEntry', 'url' => '/api/v1/ui/top-menu', 'verb' => 'DELETE'],
		['name' => 'OCSUi#getExAppMenuEntry', 'url' => '/api/v1/ui/top-menu', 'verb' => 'GET'],

		//Common UI
		['name' => 'OCSUi#setExAppInitialState', 'url' => '/api/v1/ui/initial-state', 'verb' => 'POST'],
		['name' => 'OCSUi#deleteExAppInitialState', 'url' => '/api/v1/ui/initial-state', 'verb' => 'DELETE'],
		['name' => 'OCSUi#getExAppInitialState', 'url' => '/api/v1/ui/initial-state', 'verb' => 'GET'],
		['name' => 'OCSUi#setExAppScript', 'url' => '/api/v1/ui/script', 'verb' => 'POST'],
		['name' => 'OCSUi#deleteExAppScript', 'url' => '/api/v1/ui/script', 'verb' => 'DELETE'],
		['name' => 'OCSUi#getExAppScript', 'url' => '/api/v1/ui/script', 'verb' => 'GET'],
		['name' => 'OCSUi#setExAppStyle', 'url' => '/api/v1/ui/style', 'verb' => 'POST'],
		['name' => 'OCSUi#deleteExAppStyle', 'url' => '/api/v1/ui/style', 'verb' => 'DELETE'],
		['name' => 'OCSUi#getExAppStyle', 'url' => '/api/v1/ui/style', 'verb' => 'GET'],

		// Declarative settings
		['name' => 'OCSSettings#registerForm', 'url' => '/api/v1/ui/settings', 'verb' => 'POST'],
		['name' => 'OCSSettings#unregisterForm', 'url' => '/api/v1/ui/settings', 'verb' => 'DELETE'],
		['name' => 'OCSSettings#getForm', 'url' => '/api/v1/ui/settings', 'verb' => 'GET'],

		// Speech-To-Text
		['name' => 'speechToText#registerProvider', 'url' => '/api/v1/ai_provider/speech_to_text', 'verb' => 'POST'],
		['name' => 'speechToText#unregisterProvider', 'url' => '/api/v1/ai_provider/speech_to_text', 'verb' => 'DELETE'],
		['name' => 'speechToText#getProvider', 'url' => '/api/v1/ai_provider/speech_to_text', 'verb' => 'GET'],
		['name' => 'speechToText#reportResult', 'url' => '/api/v1/ai_provider/speech_to_text', 'verb' => 'PUT'],

		// Text-Processing
		['name' => 'textProcessing#registerProvider', 'url' => '/api/v1/ai_provider/text_processing', 'verb' => 'POST'],
		['name' => 'textProcessing#unregisterProvider', 'url' => '/api/v1/ai_provider/text_processing', 'verb' => 'DELETE'],
		['name' => 'textProcessing#getProvider', 'url' => '/api/v1/ai_provider/text_processing', 'verb' => 'GET'],
		['name' => 'textProcessing#reportResult', 'url' => '/api/v1/ai_provider/text_processing', 'verb' => 'PUT'],

		// Machine-Translation
		['name' => 'Translation#registerProvider', 'url' => '/api/v1/ai_provider/translation', 'verb' => 'POST'],
		['name' => 'Translation#unregisterProvider', 'url' => '/api/v1/ai_provider/translation', 'verb' => 'DELETE'],
		['name' => 'Translation#getProvider', 'url' => '/api/v1/ai_provider/translation', 'verb' => 'GET'],
		['name' => 'Translation#reportResult', 'url' => '/api/v1/ai_provider/translation', 'verb' => 'PUT'],

		// Task-Processing
		['name' => 'taskProcessing#registerProvider', 'url' => '/api/v1/ai_provider/task_processing', 'verb' => 'POST'],
		['name' => 'taskProcessing#unregisterProvider', 'url' => '/api/v1/ai_provider/task_processing', 'verb' => 'DELETE'],
		['name' => 'taskProcessing#getProvider', 'url' => '/api/v1/ai_provider/task_processing', 'verb' => 'GET'],
	],
];
