<template>
	<span>
		G-Code Visualizer
		<v-btn @click="goTo('/touch/dash2')">Dashboard</v-btn>
		<router-link :to="{ path: '/dash2'}" >News list</router-link>
		<!-- <a v-link="{ path: '/touch/dash' }">Home</a> -->
		<router-view></router-view>
	</span>
</template>

<script>
'use strict'

import { registerRoute } from '../../routes'

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
							path: '/dash2',
							component: Routes.Dashboard2,
							condition: true,
						}
					]
				}
			}
		});

	},
	mounted() {

	},
	methods: {
		goTo(path) {
			this.$router.push({path: path});
		}
	}
}
</script>
