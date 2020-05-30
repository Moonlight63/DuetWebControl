<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<!-- <v-row class="align-stretch">
						<v-col cols="12" sm="6" md="4" lg="4" xl="4">
							<status-panel></status-panel>
						</v-col>

						<v-col cols="12" sm="6" md="5" lg="5" xl="4">
							<tools-panel></tools-panel>
						</v-col>

						<v-col v-if="$vuetify.breakpoint.mdAndUp" :class="{ 'd-flex': hasTemperaturesToDisplay }" md="3" lg="3" xl="4">
							<temperature-chart></temperature-chart>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs="12" sm="8" md="8" lg="9" xl="9">
							<movement-panel class="mb-2"></movement-panel>

							<v-row v-if="isFFForUnset">
								<v-col sm="12" :md="(atxPower !== null) ? 9 : 12" :lg="(atxPower !== null) ? 9 : 12" :xl="(atxPower !== null) ? 10 : 12">
									<extrude-panel></extrude-panel>
								</v-col>

								<v-col v-if="atxPower !== null" md="3" lg="3" xl="2" align-self="stretch">
									<atx-panel></atx-panel>
								</v-col>
							</v-row>

							<v-row>
								<v-col sm="12" :md="(!isFFForUnset && atxPower !== null) ? 9 : 12" :lg="(!isFFForUnset && atxPower !== null) ? 9 : 12" :xl="(!isFFForUnset && atxPower !== null) ? 10 : 12">
									<fan-panel></fan-panel>
								</v-col>

								<v-col v-if="!isFFForUnset && atxPower !== null" md="3" lg="3" xl="2" align-self="stretch">
									<atx-panel></atx-panel>
								</v-col>
							</v-row>
						</v-col>

						<v-col sm="4" md="4" lg="3" xl="3">
							<macro-list></macro-list>
						</v-col>
					</v-row> -->
					<v-row justify="center">
						<touch-nav-btn to="/touch/control" label="Control" icon="mdi-printer-3d-nozzle-outline" color="success"></touch-nav-btn>
						<touch-nav-btn to="/touch/console" :label="$t('menu.control.console')" icon="mdi-code-tags" color="purple"></touch-nav-btn>
						<touch-nav-btn to="/touch/status" :label="$t('menu.job.status')" icon="mdi-information" color="warning"></touch-nav-btn>
						<touch-nav-btn to="/touch/files" :label="$t('menu.files.caption')" icon="mdi-sd" color="primary"></touch-nav-btn>
					</v-row>
				</v-container>
			</div>
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
