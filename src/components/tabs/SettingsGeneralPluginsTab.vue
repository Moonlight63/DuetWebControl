<style scoped>
.no-wrap {
	white-space: nowrap;
}

button {
	width: 100%;
}
</style>

<template>
	<div>
		<v-simple-table v-show="plugins.length > 0">
			<template #default>
				<thead>
					<tr>
						<th class="text-left">Name</th>
						<th class="text-left">Author</th>
						<th class="text-left">Version</th>
						<th class="text-left">License</th>
						<th class="text-left">Dependencies</th>
						<th class="text-left">Status</th>
						<th width="1%" class="no-wrap"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="plugin in plugins" :key="plugin.name">
						<td>{{ plugin.name }}</td>
						<td>{{ plugin.author }}</td>
						<td>{{ plugin.version }}</td>
						<td>{{ plugin.license }}</td>
						<td>{{ getPluginDependencies(plugin) }}</td>
						<td>{{ getPluginStatus(plugin) }}</td>
						<td class="no-wrap">
							<v-btn v-if="!isPluginStarted(plugin)" color="success" @click="startPlugin(plugin)">
								<v-icon class="mr-1">mdi-play</v-icon> {{ $t('tabs.plugins.start') }}
							</v-btn>
							<v-btn v-else color="warning" @click="stopPlugin(plugin)" :disabled="!canStopPlugin(plugin)">
								<v-icon class="mr-1">mdi-stop</v-icon> {{ $t('tabs.plugins.stop') }}
							</v-btn>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<v-alert :value="plugins.length === 0" type="info" class="text-left ma-0" @contextmenu.prevent="">
			No Plugins
		</v-alert>

		<v-alert :value="dwcPluginsUnloaded" type="info" class="text-left ma-0" @contextmenu.prevent="">
			Refresh the page to finish unloading some DWC plugins
		</v-alert>
	</div>
</template>

<script>
'use strict'

import { mapState, mapActions } from 'vuex'

import Plugins from '../../plugins'
import { registerSettingTab } from '../../routes'

export default {
	install() {
		// Register a settings tab on the General settings page
		registerSettingTab(true, 'settings-general-plugins-tab', this, 'tabs.plugins.caption');
	},

	computed: {
		...mapState(['loadedDwcPlugins']),
		...mapState('settings', ['enabledPlugins']),
		plugins: () => Plugins
	},
	data() {
		return {
			dwcPluginsUnloaded: false
		}
	},
	methods: {
		...mapActions(['loadDwcPlugin', 'unloadDwcPlugin']),
		...mapActions('machine', ['startSbcPlugin', 'stopSbcPlugin']),
		getPluginDependencies(plugin) {
			return `DWC ${plugin.dwcVersion}`;
		},
		getPluginStatus(plugin) {
			if (this.loadedDwcPlugins.indexOf(plugin.name) !== -1) {
				return (this.enabledPlugins.indexOf(plugin.name) !== -1) ? 'started' : 'to be stopped';
			}
			return 'stopped';
		},
		isPluginStarted(plugin) {
			return this.loadedDwcPlugins.indexOf(plugin.name) !== -1;
		},
		canStopPlugin(plugin) {
			return this.enabledPlugins.indexOf(plugin.name) !== -1;
		},
		async startPlugin(plugin) {
			await this.loadDwcPlugin({ name: plugin.name, saveSettings: true });
		},
		async stopPlugin(plugin) {
			await this.unloadDwcPlugin(plugin.name);
			this.dwcPluginsUnloaded = true;
		}
	}
}
</script>
