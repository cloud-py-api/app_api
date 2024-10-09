<template>
	<div class="daemon-selection-modal">
		<NcModal :show="show" @close="closeModal">
			<div class="select-modal-body">
				<h3>{{ t('app_api', 'Choose Deploy Daemon for {appName}', {appName: app.name }) }}</h3>
				<DaemonSelectionList
					:daemons="daemons"
					:default-daemon="defaultDaemon"
					:app-id="app.id"
					@close="closeModal" />
			</div>
		</NcModal>
	</div>
</template>

<script>
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'

import DaemonSelectionList from './DaemonSelectionList.vue'

export default {
	name: 'DaemonSelectionModal',
	components: {
		NcModal,
		DaemonSelectionList,
	},
	props: {
		show: {
			type: Boolean,
			required: true,
			default: false,
		},
		app: {
			type: Object,
			required: true,
		},
		daemons: {
			type: Array,
			required: true,
		},
		defaultDaemon: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			selectDaemonModal: false,
		}
	},

	mounted() {

	},
	methods: {
		closeModal() {
			this.$emit('update:show', false)
		},
	},
}
</script>
<style scoped>

.select-modal-body h3 {
	text-align: center;
}

</style>
