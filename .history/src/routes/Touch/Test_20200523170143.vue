<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
                    <v-responsive ref="elm" aspect-ratio="1" height="100%">
                <v-container fluid style="overflow: auto">
                        <!-- <v-row justify="center">
                            <touch-nav-btn to="/touch/control" label="Control" icon="mdi-printer-3d-nozzle-outline" color="success"></touch-nav-btn>
                            <touch-nav-btn to="/touch/console" :label="$t('menu.control.console')" icon="mdi-code-tags" color="purple"></touch-nav-btn>
                            <touch-nav-btn to="/touch/status" :label="$t('menu.job.status')" icon="mdi-information" color="warning"></touch-nav-btn>
                            <touch-nav-btn to="/touch/files" :label="$t('menu.files.caption')" icon="mdi-micro-sd" color="primary"></touch-nav-btn>
                            <touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
                            <touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
                        </v-row>
                        <v-row justify="center">
                            <touch-nav-btn to="/touch/control" label="Control" icon="mdi-printer-3d-nozzle-outline" color="success"></touch-nav-btn>
                            <touch-nav-btn to="/touch/console" :label="$t('menu.control.console')" icon="mdi-code-tags" color="purple"></touch-nav-btn>
                            <touch-nav-btn to="/touch/status" :label="$t('menu.job.status')" icon="mdi-information" color="warning"></touch-nav-btn>
                            <touch-nav-btn to="/touch/files" :label="$t('menu.files.caption')" icon="mdi-micro-sd" color="primary"></touch-nav-btn>
                            <touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
                            <touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
                        </v-row>
                        <v-row justify="center">
                            <touch-nav-btn to="/touch/control" label="Control" icon="mdi-printer-3d-nozzle-outline" color="success"></touch-nav-btn>
                            <touch-nav-btn to="/touch/console" :label="$t('menu.control.console')" icon="mdi-code-tags" color="purple"></touch-nav-btn>
                            <touch-nav-btn to="/touch/status" :label="$t('menu.job.status')" icon="mdi-information" color="warning"></touch-nav-btn>
                            <touch-nav-btn to="/touch/files" :label="$t('menu.files.caption')" icon="mdi-micro-sd" color="primary"></touch-nav-btn>
                            <touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
                            <touch-nav-btn to="/touch/settings" :label="$t('menu.settings.caption')" icon="mdi-wrench" color="error"></touch-nav-btn>
                        </v-row> -->
                </v-container>
                    </v-responsive>
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
