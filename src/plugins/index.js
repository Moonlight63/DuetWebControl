// 'use strict'

// import Vue from 'vue'

// export default Vue.observable([
// 	{
// 		name: 'Auto Update',
// 		author: 'Duet3D Ltd',
// 		loaded: false,
// 		module: () => import(
// 			/* webpackChunkName: "AutoUpdate" */
// 			'./AutoUpdate/AutoUpdate.vue'
// 		)
// 	},
// 	{
// 		name: 'Height Map',
// 		author: 'Duet3D Ltd',
// 		loaded: false,
// 		module: () => import(
// 			/* webpackChunkName: "HeightMap" */
// 			'./HeightMap/HeightMap.vue'
// 		)
// 	},
// 	{
// 		name: 'G-Code Visualizer',
// 		author: 'Duet3D Ltd',
// 		loaded: false,
// 		module: () => import(
// 			/* webpackChunkName: "Visualizer" */
// 			'./Visualizer/Visualizer.vue'
// 		)
// 	},
// 	// Add your own plugins here while developing
// ])


'use strict'

import Vue from 'vue'

let plugins = Vue.observable([
	{
		name: 'Auto Update',
		author: 'Duet3D Ltd',
		loaded: false,
		module: () => import(
			/* webpackChunkName: "AutoUpdate" */
			'./AutoUpdate/AutoUpdate.vue'
		)
	},
	{
		name: 'Height Map',
		author: 'Duet3D Ltd',
		loaded: false,
		module: () => import(
			/* webpackChunkName: "HeightMap" */
			'./HeightMap/HeightMap.vue'
		)
	},
	{
		name: 'G-Code Visualizer',
		author: 'Duet3D Ltd',
		loaded: false,
		module: () => import(
			/* webpackChunkName: "Visualizer" */
			'./Visualizer/Visualizer.vue'
		)
	},
	// Add your own plugins here while developing
	{
		name: 'Pi Touchscreen',
		author: 'Dalen Catt',
		loaded: true,
		module: () => import(
			/* webpackChunkName: "PiTouchScreen" */
			'./PiTouchScreen/Base.vue'
		)
	},
])

plugins.forEach(plugin => {
	// TODO Load external plugins via import(/* webpackIgnore: true */ 'ignored-module.js');
	if (plugin.loaded) {
		plugin.module().then(function(module) {
			try {
				Vue.use(module.default);
				//plugin.loaded = true;
			} catch (e) {
				alert(`Failed to load plugin:\n${e}`);
			}
		});
	}
});

export default plugins
