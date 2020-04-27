<style>
#title:not(:hover) {
	color: inherit;
}
#title {
	margin-right: 20px;
}

.empty-table-fix td {
	padding-left: 0px !important;
	padding-right: 0px !important;
}

.global-control.theme--light {
	background-color: #F5F5F5 !important;
}
#global-container .v-card.theme--light {
	background-color: #F5F5F5 !important;
}
.global-control.theme--dark {
	background-color: #515151 !important;
}
#global-container .v-card.theme--dark {
	background-color: #515151 !important;
}

input[type='number'] {
    -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

a:not(:hover) {
	text-decoration: none;
}

textarea {
	line-height: 1.25rem !important;
}

.theme--dark textarea {
	caret-color: #FFF;
}

.v-item-group.theme--dark .v-btn__content {
	color: #FFF !important;
}

.v-card__title {
	font-size: 1rem;
}
</style>

<template>
	<v-app style="zoom: 2; height: 50vh; overflow: hidden">
		<v-app-bar ref="appToolbar" app clipped-left>
			<connect-btn v-if="isLocal"></connect-btn>

			<v-spacer></v-spacer>

			<v-toolbar-title>
				<!-- TODO: Optional OEM branding -->
				<a href="javascript:void(0)" id="title">{{ name }}</a>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<emergency-btn></emergency-btn>
		</v-app-bar>

		<v-content id="content">
			<v-container fluid fill-height class="pt-0">
				<keep-alive>
					<slot />
				</keep-alive>
			</v-container>
		</v-content>

		<connect-dialog></connect-dialog>
		<connection-dialog></connection-dialog>
		<messagebox-dialog></messagebox-dialog>
	</v-app>
</template>

<script>
'use strict'

import Piecon from 'piecon'
import { mapState, mapGetters } from 'vuex'

import { Routing } from './../routes'
import { isPrinting } from './../store/machine/modelEnums.js'

export default {
	computed: {
		...mapState({
			isLocal: state => state.isLocal,
			globalShowConnectDialog: state => state.showConnectDialog,

			boards: state => state.machine.model.boards,
			menuDirectory: state => state.machine.model.directories.menu,
			name: state => state.machine.model.network.name,
			status: state => state.machine.model.state.status,

			darkTheme: state => state.settings.darkTheme,
			webcam: state => state.settings.webcam
		}),
		...mapGetters('machine', ['hasTemperaturesToDisplay']),
		...mapGetters('machine/model', ['jobProgress']),
		toggleGlobalContainerColor() {
			if (this.hideGlobalContainer) {
				return this.darkTheme ? 'red darken-5' : 'red lighten-4';
			}
			return this.darkTheme ? 'green darken-5' : 'green lighten-4';
		}
	},
	data() {
		return {
			drawer: this.$vuetify.breakpoint.lgAndUp,
			hideGlobalContainer: false,
			routing: Routing,
			wasXs: this.$vuetify.breakpoint.xsOnly
		}
	},
	methods: {
		checkMenuCondition(condition) {
			if (condition === 'webcam') {
				return (this.webcam.url !== '');
			}
			if (condition === 'display') {
				return (this.boards.length > 0) && this.boards[0].supports12864;
			}
			return true;
		},
		isExpanded(category) {
			if (this.$vuetify.breakpoint.xsOnly) {
				const route = this.$route;
				return category.pages.some(page => page.path === route.path);
			}
			return true;
		},
		updateTitle() {
			const jobProgress = this.jobProgress;
			const title = ((jobProgress > 0 && isPrinting(this.status)) ? `(${(jobProgress * 100).toFixed(1)}%) ` : '') + this.name;
			if (document.title !== title) {
				document.title = title;
			}
		}
	},
	mounted() {
		// Set up Piecon
		Piecon.setOptions({
			color: '#00f',			// Pie chart color
			background: '#bbb',		// Empty pie chart color
			shadow: '#fff',			// Outer ring color
			fallback: false			// Toggles displaying percentage in the title bar (possible values - true, false, 'force')
		});
	},
	watch: {
		darkTheme(to) {
			this.$vuetify.theme.dark = to;
		},
		status(to, from) {
			const printing = isPrinting(to);
			if (printing !== isPrinting(from)) {
				if (printing) {
					// Go to Job Status when a print starts
					if (this.$router.currentRoute.path !== '/Job/Status') {
						this.$router.push('/Job/Status');
					}
				} else {
					// Remove the Piecon again when the print has finished
					Piecon.reset();
				}
			}
		},
		name() { this.updateTitle(); },
		jobProgress(to) {
			if (isPrinting(this.status)) {
				Piecon.setProgress(to * 100);
			}
			this.updateTitle();
		}
	}
}
</script>