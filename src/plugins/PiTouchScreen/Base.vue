<template>
	<div style="display: contents">
		<grid>
			<router-view></router-view>
		</grid>
		<gcode-view></gcode-view>
	</div>
</template>

<script>
'use strict'

import { registerRoute } from '../../routes'



import './components'
import Routes from './routes'

export default {
	install() {
		// Register a route via Job -> Visualizer
		registerRoute(this, {
			Control: {
				Touchscreen: {
					icon: 'mdi-phone',
					caption: 'Pi Touch',
					path: '/touch',
					//condition: false,
					children: [
						{
							path: '',
							component: Routes.Dashboard
						},
						{
							path: 'gcode',
							component: Routes.GcodeViewer,
							condition: true,
						}
					]
				}
			}
		});

	},
	beforeRouteEnter (to, from, next) {
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		// console.log(to);

		document.querySelectorAll(`
		#global-container, #global-container + hr.v-divider, header.v-app-bar,
		nav.v-navigation-drawer
		`).forEach(elem => {
			elem.classList.add('d-none');
		});

		document.getElementById('content').classList.add('notransition', 'pa-0');

		document.querySelector('#global-container + hr.v-divider + div.container').classList.add('touch-container');

		next();
	},
	beforeRouteLeave (to, from, next) {
		// called when the route that renders this component is about to
		// be navigated away from.
		// has access to `this` component instance.
		// console.log(to);

		document.querySelectorAll(`
		#global-container, #global-container + hr.v-divider, header.v-app-bar,
		nav.v-navigation-drawer
		`).forEach(elem => {
			elem.classList.remove('d-none');
		});

		document.getElementById('content').classList.remove('notransition', 'pa-0');

		document.querySelector('#global-container + hr.v-divider + div.container').classList.remove('touch-container');

		next();
	},
	created() {
		// this.$router.beforeEach((to, from, next) => {
		// 	console.log(to);
		// 	next();
		// });
	},
	mounted() {
		// console.log('Base Mounted!');
		// this.$nextTick(() => {
		// 	console.log("Base Next!");
			
		// });

		this.$watch(function() {return this.$vuetify.theme.dark;}, function() {
			console.log("Darktheme changed");
			
			document.querySelectorAll(`
			#global-container, #global-container + hr.v-divider, header.v-app-bar,
			nav.v-navigation-drawer
			`).forEach(elem => {
				elem.classList.add('d-none');
			});

			document.getElementById('content').classList.add('notransition', 'pa-0');

			document.querySelector('#global-container + hr.v-divider + div.container').classList.add('touch-container');
		});
	},
	methods: {
		goTo(path) {
			this.$router.push({path: path});
		}
	},

	watch: {
        // 'this.$vuetify.theme.dark'() {
		// 	console.log("Darktheme changed");
			
		// 	document.querySelectorAll(`
		// 	#global-container, #global-container + hr.v-divider, header.v-app-bar,
		// 	nav.v-navigation-drawer
		// 	`).forEach(elem => {
		// 		elem.classList.add('d-none');
		// 	});

		// 	document.getElementById('content').classList.add('notransition', 'pa-0');

		// 	document.querySelector('#global-container + hr.v-divider + div.container').classList.add('touch-container');
		// }
    }
}
</script>

<style>
/* Clean Starting point! */
.touch-container {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 0 !important;
	overflow: hidden;
	display: flex;
}

/* main#content{
	padding: 0 !important;
	-webkit-transition: none !important;
	-moz-transition: none !important;
	-o-transition: none !important;
	transition: none !important;
} */

/* ::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
  -webkit-appearance: none;
} */
.notransition {
	-webkit-transition: none !important;
	-moz-transition: none !important;
	-o-transition: none !important;
	transition: none !important;
}
</style>