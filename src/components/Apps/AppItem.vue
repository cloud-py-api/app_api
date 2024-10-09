<template>
	<component :is="listView ? `tr` : `li`"
		class="section"
		:class="{ selected: isSelected }"
		@click="showAppDetails">
		<component :is="dataItemTag"
			class="app-image app-image-icon"
			:headers="getDataItemHeaders(`app-table-col-icon`)"
			@click="showAppDetails">
			<div v-if="(listView && !app.preview) || (!listView && !screenshotLoaded)" class="icon-settings-dark" />

			<svg v-else-if="listView && app.preview"
				width="32"
				height="32"
				viewBox="0 0 32 32">
				<image x="0"
					y="0"
					width="32"
					height="32"
					preserveAspectRatio="xMinYMin meet"
					:xlink:href="app.preview"
					class="app-icon" />
			</svg>

			<img v-if="!listView && app.screenshot && screenshotLoaded" :src="app.screenshot" width="100%">
		</component>
		<component :is="dataItemTag"
			class="app-name"
			:headers="getDataItemHeaders(`app-table-col-name`)"
			@click="showAppDetails">
			{{ app.name }}
		</component>
		<component :is="dataItemTag"
			v-if="!listView"
			class="app-summary"
			:headers="getDataItemHeaders(`app-version`)">
			{{ app.summary }}
		</component>
		<component :is="dataItemTag"
			v-if="listView"
			class="app-version"
			:headers="getDataItemHeaders(`app-table-col-version`)">
			<span v-if="app.version">{{ app.version }}</span>
			<span v-else-if="app.appstoreData.releases[0].version">{{ app.appstoreData.releases[0].version }}</span>
		</component>

		<component :is="dataItemTag" :headers="getDataItemHeaders(`app-table-col-level`)" class="app-level">
			<span v-if="app.level === 300"
				:title="t('settings', 'This app is supported via your current Nextcloud subscription.')"
				:aria-label="t('settings', 'This app is supported via your current Nextcloud subscription.')"
				class="supported icon-checkmark-color">
				{{ t('settings', 'Supported') }}</span>
			<span v-if="app.level === 200"
				:title="t('settings', 'Featured apps are developed by and within the community. They offer central functionality and are ready for production use.')"
				:aria-label="t('settings', 'Featured apps are developed by and within the community. They offer central functionality and are ready for production use.')"
				class="official icon-checkmark">
				{{ t('settings', 'Featured') }}</span>
			<AppScore v-if="hasRating && !listView" :score="app.score" />
		</component>
		<component :is="dataItemTag"
			v-if="app.daemon"
			:headers="getDataItemHeaders(`app-table-col-daemon`)"
			class="app-daemon">
			<span class="daemon-label">{{ `${app.daemon.name} (${app.daemon.accepts_deploy_id})` }}</span>
		</component>
		<component :is="dataItemTag" :headers="getDataItemHeaders(`app-table-col-actions`)" class="actions">
			<div v-if="app.error" class="warning">
				{{ app.error }}
			</div>
			<div v-if="isLoading || isInitializing" class="icon icon-loading-small" />
			<NcButton v-if="app.update"
				type="primary"
				:disabled="installing || isLoading || !defaultDeployDaemonAccessible || isManualInstall"
				:title="updateButtonText"
				@click.stop="update(app.id)">
				{{ t('settings', 'Update to {update}', {update:app.update}) }}
			</NcButton>
			<NcButton v-if="app.canUnInstall"
				class="uninstall"
				type="tertiary"
				:disabled="installing || isLoading"
				@click.stop="remove(app.id, removeData)">
				{{ t('settings', 'Remove') }}
			</NcButton>
			<NcButton v-if="app.active"
				:disabled="installing || isLoading || isInitializing || isDeploying"
				@click.stop="disable(app.id)">
				{{ disableButtonText }}
			</NcButton>
			<NcButton v-if="!app.active && (app.canInstall || app.isCompatible)"
				:title="enableButtonTooltip"
				:aria-label="enableButtonTooltip"
				type="primary"
				:disabled="!app.canInstall || installing || isLoading || !defaultDeployDaemonAccessible || isInitializing || isDeploying"
				@click="enableButtonAction">
				{{ enableButtonText }}
			</NcButton>
			<NcButton v-else-if="!app.active"
				:title="forceEnableButtonTooltip"
				:aria-label="forceEnableButtonTooltip"
				type="secondary"
				:disabled="installing || isLoading || !defaultDeployDaemonAccessible"
				@click.stop="forceEnable(app.id)">
				{{ forceEnableButtonText }}
			</NcButton>
			<DaemonSelectionModal
				v-if="selectDaemonModal"
				:show.sync="selectDaemonModal"
				:daemons="dockerDaemons"
				:default-daemon="defaultDaemon"
				:app="app" />
		</component>
	</component>
</template>

<script>
import AppScore from './AppScore.vue'
import AppManagement from '../../mixins/AppManagement.js'
import SvgFilterMixin from './SvgFilterMixin.vue'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import DaemonSelectionModal from './DaemonSelectionModal.vue'

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'AppItem',
	components: {
		AppScore,
		NcButton,
		DaemonSelectionModal,
	},
	mixins: [AppManagement, SvgFilterMixin],
	props: {
		app: {
			type: Object,
			required: true,
			default: () => {},
		},
		category: {
			type: String,
			required: true,
			default: () => '',
		},
		listView: {
			type: Boolean,
			default: true,
		},
		useBundleView: {
			type: Boolean,
			default: false,
		},
		headers: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			isSelected: false,
			removeData: false,
			scrolled: false,
			screenshotLoaded: false,
			selectDaemonModal: false,
			dockerDaemons: [],
			defaultDaemon: '',
		}
	},
	computed: {
		hasRating() {
			return this.app.appstoreData && this.app.appstoreData.ratingNumOverall > 5
		},
		dataItemTag() {
			return this.listView ? 'td' : 'div'
		},
	},
	watch: {
		'$route.params.id'(id) {
			this.isSelected = (this.app.id === id)
		},
	},
	mounted() {
		this.isSelected = (this.app.id === this.$route.params.id)
		if (this.app.releases && this.app.screenshot) {
			const image = new Image()
			image.onload = (e) => {
				this.screenshotLoaded = true
			}
			image.src = this.app.screenshot
		}
	},
	methods: {
		async showAppDetails(event) {
			if (event.currentTarget.tagName === 'INPUT' || event.currentTarget.tagName === 'A') {
				return
			}
			try {
				await this.$router.push({
					name: 'apps-details',
					params: { category: this.category, id: this.app.id },
				})
			} catch (e) {
				// we already view this app
			}
		},
		prefix(prefix, content) {
			return prefix + '_' + content
		},

		getDataItemHeaders(columnName) {
			return this.useBundleView ? [this.headers, columnName].join(' ') : null
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

<style scoped>
.app-icon {
	filter: var(--background-invert-if-bright);
}

.actions {
	display: flex !important;
	gap: 8px;
	flex-wrap: wrap;
	justify-content: end;
}

.app-daemon {
	margin: 15px 0;
}

.daemon-label {
	color: var(--color-text-maxcontrast);
	border: 1px solid var(--color-border-maxcontrast);
	border-radius: var(--border-radius);
	padding: 3px 6px;
}

</style>
