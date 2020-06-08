'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Page404 from './Page404.vue'

import Control from './Control'
import Job from './Job'
import Files from './Files'
import Settings from './Settings'
import Touch from './Touch'

Vue.use(VueRouter)

export const Routing = [
	// Control
	{
		icon: 'mdi-tune',
		caption: 'menu.control.caption',
		pages: [
			// Dashboard
			{
				icon: 'mdi-view-dashboard',
				caption: 'menu.control.dashboard',
				path: '/',
				component: Control.Dashboard
			},
			// Console
			{
				icon: 'mdi-code-tags',
				caption: 'menu.control.console',
				path: '/Console',
				component: Control.Console
			},
			// Height Map
			{
				icon: 'mdi-grid',
				caption: 'menu.control.heightmap',
				path: '/Heightmap',
				component: Control.Heightmap
			}
		]
	},
	// Job
	{
		icon: 'mdi-printer',
		caption: 'menu.job.caption',
		pages: [
			// Status
			{
				icon: 'mdi-information',
				caption: 'menu.job.status',
				path: '/Job/Status',
				component: Job.Status
			},
			// Webcam
			{
				icon: 'mdi-webcam',
				caption: 'menu.job.webcam',
				path: '/Job/Webcam',
				component: Job.Webcam,
				condition: 'webcam'
			}
			// Visualiser (coming soon)
			/* {
				icon: 'mdi-3d-rotation',
				caption: 'menu.job.visualiser',
				path: '/Job/Visualiser',
				component: Job.Visualiser
			} */
		]
	},
	// Files
	{
		icon: 'mdi-sd',
		caption: 'menu.files.caption',
		pages: [
			// Jobs
			{
				icon: 'mdi-play',
				caption: 'menu.files.jobs',
				path: '/Files/Jobs',
				component: Files.Jobs
			},
			// Macros
			{
				icon: 'mdi-polymer',
				caption: 'menu.files.macros',
				path: '/Files/Macros',
				component: Files.Macros
			},
			// Filaments
			{
				icon: 'mdi-radiobox-marked',
				caption: 'menu.files.filaments',
				path: '/Files/Filaments',
				component: Files.Filaments
			},
			// Display
			{
				icon: 'mdi-format-list-numbered',
				caption: 'menu.files.menu',
				path: '/Files/Display',
				component: Files.Display,
				condition: 'display'
			},
			// System
			{
				icon: 'mdi-cog',
				caption: 'menu.files.system',
				path: '/Files/System',
				component: Files.System
			}
		]
	},
	// Settings
	{
		icon: 'mdi-wrench',
		caption: 'menu.settings.caption',
		pages: [
			// General
			{
				icon: 'mdi-tune',
				caption: 'menu.settings.general',
				path: '/Settings/General',
				component: Settings.General
			},
			// Machine
			{
				icon: 'mdi-cogs',
				caption: 'menu.settings.machine',
				path: '/Settings/Machine',
				component: Settings.Machine
			}
			// Update (coming soon)
			/* {
				icon: 'mdi-update',
				caption: 'menu.settings.update',
				path: '/Settings/Update',
				component: Settings.Update
			} */
		]
	},
	// Touch
	{
		icon: 'mdi-cellphone',
		caption: 'Pi Controls',
		pages: [
			// Main Dash
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Dash',
				path: '/touch',
				meta: {layout: 'touch'},
				component: Touch.Dashboard
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Control',
				path: '/touch/control',
				meta: {layout: 'touch'},
				component: Touch.Control
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Move',
				path: '/touch/control/move',
				meta: {layout: 'touch'},
				component: Touch.Move
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Tools',
				path: '/touch/control/tools',
				meta: {layout: 'touch'},
				component: Touch.Tools
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Macros',
				path: '/touch/control/macros',
				meta: {layout: 'touch'},
				component: Touch.Macros
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Temp',
				path: '/touch/control/temp',
				meta: {layout: 'touch'},
				component: Touch.Temp
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Console',
				path: '/touch/console',
				meta: {layout: 'touch'},
				component: Touch.Console
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Status',
				path: '/touch/status',
				meta: {layout: 'touch'},
				component: Touch.Status
			},
			// Edit Files Selection
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Files',
				path: '/touch/files',
				meta: {layout: 'touch'},
				component: Touch.Files
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Filament Files',
				path: '/touch/files/filaments',
				meta: {layout: 'touch'},
				component: Touch.Filaments
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Job Files',
				path: '/touch/files/jobs',
				meta: {layout: 'touch'},
				component: Touch.Jobs
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Macro Files',
				path: '/touch/files/macros',
				meta: {layout: 'touch'},
				component: Touch.MacroFiles
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch System Files',
				path: '/touch/files/system',
				meta: {layout: 'touch'},
				component: Touch.SystemFiles
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Settings',
				path: '/touch/settings',
				meta: {layout: 'touch'},
				component: Touch.Settings
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch General Settings',
				path: '/touch/settings/general',
				meta: {layout: 'touch'},
				component: Touch.General
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Machine Settings',
				path: '/touch/settings/machine',
				meta: {layout: 'touch'},
				component: Touch.Machine
			},
			{
				icon: 'mdi-cellphone',
				caption: 'Touch Test',
				path: '/touch/test',
				meta: {layout: 'touch'},
				component: Touch.Test
			},
		]
	}
]

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		...Routing.map(category => category.pages).reduce((a, b) => a.concat(b)),
		{
			path: '*',
			component: Page404
		}
	]
})
