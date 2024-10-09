import { showError } from '@nextcloud/dialogs'
import rebuildNavigation from '../service/rebuild-navigation.js'

export default {
	computed: {
		installing() {
			return this.$store.getters.loading('install')
		},
		isLoading() {
			return this.app && this.$store.getters.loading(this.app.id)
		},
		isInitializing() {
			return this.app && Object.hasOwn(this.app?.status, 'action') && (this.app.status.action === 'init' || this.app.status.action === 'healthcheck')
		},
		isDeploying() {
			return this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'deploy'
		},
		isManualInstall() {
			return this.app?.daemon?.accepts_deploy_id === 'manual-install'
		},
		updateButtonText() {
			if (this.app?.daemon?.accepts_deploy_id === 'manual-install') {
				return t('app_api', 'manual-install apps cannot be updated')
			}
			return ''
		},
		enableButtonText() {
			if (this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'deploy') {
				return t('app_api', '{progress}% Deploying', { progress: this.app.status?.deploy })
			}
			if (this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'init') {
				return t('app_api', '{progress}% Initializing', { progress: this.app.status?.init })
			}
			if (this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'healthcheck') {
				return t('app_api', 'Healthchecking')
			}
			if (this.app.needsDownload) {
				return t('app_api', 'Deploy and Enable')
			}
			return t('app_api', 'Enable')
		},
		disableButtonText() {
			if (this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'deploy') {
				return t('app_api', '{progress}% Deploying', { progress: this.app.status?.deploy })
			}
			if (this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'init') {
				return t('app_api', '{progress}% Initializing', { progress: this.app.status?.init })
			}
			if (this.app && Object.hasOwn(this.app?.status, 'action') && this.app.status.action === 'healthcheck') {
				return t('app_api', 'Healthchecking')
			}
			return t('app_api', 'Disable')
		},
		forceEnableButtonText() {
			if (this.app.needsDownload) {
				return t('app_api', 'Allow untested app')
			}
			return t('app_api', 'Allow untested app')
		},
		enableButtonTooltip() {
			if (!this.$store.getters.getDaemonAccessible) {
				return t('app_api', 'Default Deploy daemon is not accessible. Please verify configuration')
			}
			if (this.app.needsDownload) {
				return t('app_api', 'The app will be downloaded from the App Store and deployed on default Deploy Daemon')
			}
			return ''
		},
		forceEnableButtonTooltip() {
			const base = t('app_api', 'This app is not marked as compatible with your Nextcloud version. If you continue you will still be able to install the app. Note that the app might not work as expected.')
			if (this.app.needsDownload) {
				return base + ' ' + t('app_api', 'The app will be downloaded from the App Store and deployed on default Deploy Daemon')
			}
			return base
		},
		defaultDeployDaemonAccessible() {
			if (this.app?.daemon && this.app?.daemon?.accepts_deploy_id === 'manual-install') {
				return true
			}
			if (this.app?.daemon?.accepts_deploy_id === 'docker-install') {
				return this.$store.getters.getDaemonAccessible === true
			}
			return this.$store.getters.getDaemonAccessible
		},
	},

	methods: {
		forceEnable(appId) {
			this.$store.dispatch('forceEnableApp', { appId })
				.then((response) => { rebuildNavigation() })
				.catch((error) => { showError(error) })
		},
		enable(appId, daemon) {
			this.$store.dispatch('enableApp', { appId, daemon })
				.then((response) => { rebuildNavigation() })
				.catch((error) => { showError(error) })
		},
		disable(appId) {
			this.$store.dispatch('disableApp', { appId })
				.then((response) => { rebuildNavigation() })
				.catch((error) => { showError(error) })
		},
		remove(appId, removeData) {
			this.$store.dispatch('uninstallApp', { appId, removeData })
				.then((response) => { rebuildNavigation() })
				.catch((error) => { showError(error) })
		},
		install(appId) {
			this.$store.dispatch('enableApp', { appId })
				.then((response) => { rebuildNavigation() })
				.catch((error) => { showError(error) })
		},
		update(appId) {
			this.$store.dispatch('updateApp', { appId })
				.then((response) => { rebuildNavigation() })
				.catch((error) => { showError(error) })
		},
	},
}
