<template>
	<div class="app-details">
		<div class="app-details__actions">
			<div class="app-details__actions-manage">
				<input v-if="app.update"
					class="update primary"
					type="button"
					:value="t('settings', 'Update to {version}', { version: app.update })"
					:disabled="installing || isLoading || isManualInstall"
					:title="updateButtonText"
					@click="update(app.id)">
				<input v-if="app.canUnInstall"
					class="uninstall"
					type="button"
					:value="t('settings', 'Remove')"
					:disabled="installing || isLoading"
					@click="remove(app.id, removeData)">
				<input v-if="app.active"
					class="enable"
					type="button"
					:value="disableButtonText"
					:disabled="installing || isLoading || isInitializing || isDeploying"
					@click="disable(app.id)">
				<input v-if="!app.active && (app.canInstall || app.isCompatible)"
					:title="enableButtonTooltip"
					:aria-label="enableButtonTooltip"
					class="enable primary"
					type="button"
					:value="enableButtonText"
					:disabled="!app.canInstall || installing || isLoading || !defaultDeployDaemonAccessible || isInitializing || isDeploying"
					@click="enableButtonAction">
				<input v-else-if="!app.active && !app.canInstall"
					:title="forceEnableButtonTooltip"
					:aria-label="forceEnableButtonTooltip"
					class="enable force"
					type="button"
					:value="forceEnableButtonText"
					:disabled="installing || isLoading || !defaultDeployDaemonAccessible"
					@click="forceEnable(app.id)">
				<DaemonSelectionModal
					v-if="selectDaemonModal"
					:show.sync="selectDaemonModal"
					:daemons="dockerDaemons"
					:default-daemon="defaultDaemon"
					:app="app" />
				<NcCheckboxRadioSwitch v-if="app.canUnInstall"
					:checked="removeData"
					:disabled="installing || isLoading || !defaultDeployDaemonAccessible"
					@update:checked="toggleRemoveData">
					{{ t('settings', 'Delete data on remove') }}
				</NcCheckboxRadioSwitch>
			</div>
		</div>

		<template v-if="app.fromAppStore">
			<ul class="app-details__dependencies">
				<li v-if="app.missingMinOwnCloudVersion">
					{{ t('settings', 'This app has no minimum Nextcloud version assigned. This will be an error in the future.') }}
				</li>
				<li v-if="app.missingMaxOwnCloudVersion">
					{{ t('settings', 'This app has no maximum Nextcloud version assigned. This will be an error in the future.') }}
				</li>
				<li v-if="!app.canInstall">
					{{ t('settings', 'This app cannot be installed because the following dependencies are not fulfilled:') }}
					<ul class="missing-dependencies">
						<li v-for="(dep, index) in app.missingDependencies" :key="index">
							{{ dep }}
						</li>
					</ul>
				</li>
			</ul>
			<p class="app-details__documentation">
				<a v-if="!app.internal"
					class="appslink"
					:href="appstoreUrl"
					target="_blank"
					rel="noreferrer noopener">{{ t('settings', 'View in store') }} ↗</a>

				<a v-if="app.website"
					class="appslink"
					:href="app.website"
					target="_blank"
					rel="noreferrer noopener">{{ t('settings', 'Visit website') }} ↗</a>
				<a v-if="app.bugs"
					class="appslink"
					:href="app.bugs"
					target="_blank"
					rel="noreferrer noopener">{{ t('settings', 'Report a bug') }} ↗</a>

				<a v-if="app.documentation && app.documentation.user"
					class="appslink"
					:href="app.documentation.user"
					target="_blank"
					rel="noreferrer noopener">{{ t('settings', 'User documentation') }} ↗</a>
				<a v-if="app.documentation && app.documentation.admin"
					class="appslink"
					:href="app.documentation.admin"
					target="_blank"
					rel="noreferrer noopener">{{ t('settings', 'Admin documentation') }} ↗</a>
				<a v-if="app.documentation && app.documentation.developer"
					class="appslink"
					:href="app.documentation.developer"
					target="_blank"
					rel="noreferrer noopener">{{ t('settings', 'Developer documentation') }} ↗</a>
			</p>
			<Markdown class="app-details__description" :text="app.description" />
		</template>
		<template v-else>
			<p>{{ t('app_api', 'This app is not registered in AppStore. No extra information available. Only enable/disable and remove actions are allowed.') }}</p>
		</template>
	</div>
</template>

<script>
import { NcCheckboxRadioSwitch } from '@nextcloud/vue'
import AppManagement from '../../mixins/AppManagement.js'
import PrefixMixin from './PrefixMixin.vue'
import Markdown from './Markdown.vue'
import DaemonSelectionModal from './DaemonSelectionModal.vue'

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'AppDetails',

	components: {
		Markdown,
		NcCheckboxRadioSwitch,
		DaemonSelectionModal,
	},
	mixins: [AppManagement, PrefixMixin],

	props: {
		app: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			removeData: false,
			selectDaemonModal: false,
			dockerDaemons: [],
			defaultDaemon: '',
		}
	},

	computed: {
		appstoreUrl() {
			return `https://apps.nextcloud.com/apps/${this.app.id}`
		},
		licence() {
			if (this.app.licence) {
				return t('settings', '{license}-licensed', { license: ('' + this.app.licence).toUpperCase() })
			}
			return null
		},
		author() {
			if (typeof this.app.author === 'string') {
				return [
					{
						'@value': this.app.author,
					},
				]
			}
			if (this.app.author['@value']) {
				return [this.app.author]
			}
			return this.app.author
		},
	},

	watch: {
		'app.id'() {
			this.removeData = false
		},
	},

	methods: {
		toggleRemoveData() {
			this.removeData = !this.removeData
		},
		showSelectionModal() {
			this.selectDaemonModal = true
		},
		getAllDockerDaemons() {
			return axios.get(generateUrl('/apps/app_api/daemons'))
				.then(res => {
					this.dockerDaemons = res.data.daemons.filter(function(daemon) {
						return daemon.accepts_deploy_id === 'docker-install'
					})
					this.defaultDaemon = res.data.default_daemon_config
				})
		},
		async enableButtonAction() {
			await this.getAllDockerDaemons()
			if (this.dockerDaemons.length === 1 && this.app.needsDownload) {
				this.enable(this.app.id, this.dockerDaemons[0])
			} else if (this.app.needsDownload) {
				this.showSelectionModal()
			} else {
				this.enable(this.app.id, this.app.daemon)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.app-details {
	padding: 20px;

	&__actions {
		// app management
		&-manage {
			// if too many, shrink them and ellipsis
			display: flex;
			flex-wrap: wrap;
			input {
				flex: 0 1 auto;
				min-width: 0;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
	&__dependencies {
		opacity: .7;
	}
	&__documentation {
		padding-top: 20px;
		a.appslink {
			display: block;
		}
	}
	&__description {
		padding-top: 20px;
	}
}

.force {
	color: var(--color-error);
	border-color: var(--color-error);
	background: var(--color-main-background);
}

.force:hover,
.force:active {
	color: var(--color-main-background);
	border-color: var(--color-error) !important;
	background: var(--color-error);
}
</style>
