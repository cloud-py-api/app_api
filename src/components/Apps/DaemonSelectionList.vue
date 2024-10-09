<template>
	<div class="daemon-selection-list">
		<ul
			v-if="daemons.length > 0"
			:aria-label="t('app_api', 'Registered Deploy daemons list')">
			<DaemonEnableSelection
				v-for="daemon in dockerDaemons"
				:key="daemon.id"
				:daemon="daemon"
				:is-default="defaultDaemon === daemon.name"
				:daemons="daemons"
				:app-id="appId"
				@close="closeModal" />
		</ul>
		<NcEmptyContent
			v-else
			:name="t('app_api', 'No Deploy daemons configured')"
			:description="t('app_api', 'Register a custom one or setup from available templates')">
			<template #icon>
				<FormatListBullet :size="20" />
			</template>
		</NcEmptyContent>
	</div>
</template>

<script>
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import FormatListBullet from 'vue-material-design-icons/FormatListBulleted.vue'
import DaemonEnableSelection from './DaemonEnableSelection.vue'

export default {
	name: 'DaemonSelectionList',
	components: {
		FormatListBullet,
		DaemonEnableSelection,
		NcEmptyContent,
	},
	props: {
		daemons: {
			type: Array,
			required: true,
			default: () => [],
		},
		defaultDaemon: {
			type: String,
			required: true,
		},
		appId: {
			type: String,
			required: true,
		},
	},
	computed: {
		dockerDaemons() {
			return this.daemons.filter(function(daemon) {
				return daemon.accepts_deploy_id === 'docker-install'
			})
		},
	},
	methods: {
		closeModal() {
			this.$emit('close')
		},
	},
}
</script>

<style scoped lang="scss">
.daemon-selection-list {
	max-height: 300px;
	overflow-y: scroll;
	padding: 2rem;

	.empty-content {
		margin-top: 0;
		text-align: center;
	}
}
</style>
