<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<grid>
				<grid-button disabled label="Back" icon="mdi-arrow-left" rows='1'></grid-button>

				<grid-panel class="text-center justify-center align-center d-flex" columns="4">
					Dashboard
				</grid-panel>

				<grid-spacer columns="3"/>

				<grid-button :code="'M112\nM999'" :log="false" color="error" :title="$t('button.emergencyStop.title')"
				icon="mdi-flash" :label="$t('button.emergencyStop.caption')" rows='1' columns="3"></grid-button>

				<grid-button :code="'M112\nM999'" :log="false" color="error" :title="$t('button.emergencyStop.title')"
				icon="mdi-flash" label="Super long label that would normally clip.txt Date created: 06/04/2020 Date Last Printed: jfajfdaoijfajfajoifdjaosjfodas This is so long at this point if it doesn't break I will be really impressed!" rows='1' columns="3"></grid-button>


			</grid>
			<!-- <div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch/control" label="Control" icon="mdi-printer-3d-nozzle-outline" color="success"></touch-nav-btn>
						<touch-nav-btn to="/touch/console" :label="$t('menu.control.console')" icon="mdi-code-tags" color="purple"></touch-nav-btn>
						<touch-nav-btn to="/touch/status" :label="$t('menu.job.status')" icon="mdi-information" color="warning"></touch-nav-btn>
						<touch-nav-btn to="/touch/files" :label="$t('menu.files.caption')" icon="mdi-micro-sd" color="primary"></touch-nav-btn>
						<touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
					</v-row>
				</v-container>
			</div> -->
		</v-col>
	</v-row>	
</template>

<script>

import { mapState } from 'vuex'

import { MachineMode } from '../../store/machine/modelEnums.js'

export default {
	computed: {
		...mapState('machine/model', {
			atxPower: state => state.state.atxPower,
			machineMode: state => state.state.machineMode
		}),
		isFFForUnset() {
			return !this.machineMode || (this.machineMode === MachineMode.fff);
		}
	}
}
</script>
