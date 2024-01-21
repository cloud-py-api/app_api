export const DAEMON_TEMPLATES = [
	{
		id: 'aio',
		name: 'docker_aio',
		displayName: 'All-in-One',
		acceptsDeployId: 'docker-install',
		protocol: 'http',
		host: 'nextcloud-aio-docker-socket-proxy:2375',
		nextcloud_url: null,
		deployConfig: {
			net: 'nextcloud-aio',
			host: null,
			haproxy_password: null,
			gpu: false,
		},
		deployConfigSettingsOpened: false,
		defaultDaemon: true,
	},
	{
		id: 'docker-socket-proxy',
		name: 'docker_socket_proxy',
		displayName: 'Docker Socket Proxy',
		acceptsDeployId: 'docker-install',
		protocol: 'http',
		host: 'aa-docker-socket-proxy:2375',
		nextcloud_url: null,
		deployConfig: {
			net: 'host',
			host: 'localhost',
			haproxy_password: 'enter_haproxy_password',
			gpu: false,
		},
		deployConfigSettingsOpened: false,
		defaultDaemon: true,
	},
]