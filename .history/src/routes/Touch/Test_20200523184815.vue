<style lang="scss" scoped>
.touch-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(200px, 1fr));
  /* This is better for small screens, once min() is better supported */
  /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
}

.grid__item {
  position: relative;
  width: 100%;
  border: 1px solid #ccc;
  
  &:before {
    content: "";
    height: 0;
    display: inline-block;
    padding-top: 100%;
    width: 1px;
    position: relative;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: grid;
    justify-items: start;
    align-items: end;
  }
  .content-lr {
    place-items: end end;
    text-align: right;
  }
  .content-inside {
    padding: 2rem;
  }
}
</style>

<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
                <div class="touch-grid">
                    <div class="grid__item">
                        <div class="content">
                            <div class="content-inside">
                                <h2>2:1</h2>
                                <p>Centered</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <!-- <v-responsive ref="elm" aspect-ratio="1" height="100%"> -->
                <!-- <v-container fluid style="overflow: auto"> -->
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
                <!-- </v-container> -->
                    <!-- </v-responsive> -->
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
