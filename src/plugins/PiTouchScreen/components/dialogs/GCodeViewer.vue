<template>
	<v-dialog :value="shown" fullscreen hide-overlay transition="dialog-bottom-transition">
		<promise-based-confirm-dialog ref="confirm" />

		<v-card class="touch-container">
            <grid>

				<grid-panel columns="12" rows="1">
					<v-card-title>
						<div class="display-2 text-truncate">
							{{ file.name }}
						</div>
					</v-card-title>
				</grid-panel>
				
				<grid-panel columns="5" rows="5" :loading="viewerLoading">
					<gcode-viewer
						ref="viewerComp"
						class="emulate-root"
					/>
				</grid-panel>
			
				<grid-panel columns="7" rows="5">
					<v-card-subtitle class="display-1">
						{{ i18n.t('list.jobs.printTime') }}: {{ displayTimeValue(file) }}
					</v-card-subtitle>
					<v-card-subtitle class="headline">
						{{ i18n.t('list.jobs.filament') }}: {{ file.filament }} mm
					</v-card-subtitle>
					<v-card-subtitle class="headline">
						{{ i18n.t('list.jobs.generatedBy') }}: {{ file.generatedBy }}
					</v-card-subtitle>
					<v-card-subtitle class="headline">
						{{ i18n.t('list.jobs.layerHeight') }}: {{ file.layerHeight }} mm
					</v-card-subtitle>
					<v-card-subtitle class="headline">
						{{ i18n.t('list.jobs.height') }}: {{ file.height }} mm
					</v-card-subtitle>
					<v-card-subtitle class="headline">
						{{ i18n.t('list.baseFileList.lastModified') }}: {{ file.lastModified.toLocaleString() }}
					</v-card-subtitle>
				</grid-panel>

                <grid-button ref="button" :disabled="false" label="Close" icon="mdi-close" @click="close()" rows="2" columns="4"></grid-button>
				<grid-button ref="button" :disabled="false" label="Close" icon="mdi-close" @click="close()" rows="2" columns="4"></grid-button>
				<grid-button ref="button" :disabled="false" label="Close" icon="mdi-close" @click="close()" rows="2" columns="4"></grid-button>
				
			</grid>
		</v-card>
	</v-dialog>
</template>


<script>
/* eslint-disable no-unused-vars */

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import i18n from '../../../../i18n'
import Path from '../../../../utils/path.js'
import { DisconnectedError, InvalidPasswordError } from '../../../../utils/errors.js'

import { EventBus } from '../../scripts/PiScreenEvents'

export default {

	props: {

	},
	mounted() {
        EventBus.$on('gcodeview:show', (item, filename) => {
			this.shown = true;
			this.filename = filename;
			this.file = item;
			console.log(item);

			this.viewerLoading = true;
			
			this.requestFileInfo().then(() => {

				console.log("THIS ONE VVVVVVVVV");
				
				console.log(this.file);

				console.log(this.displayTimeValue(this.file));
				
				this.$refs.viewerComp.redraw();

				return this.downloadGcode();

			}).then((r) => {
				this.$refs.viewerComp.forceUpdate(r);
				this.viewerLoading = false;
			});

			

            // this.$refs.button.updateSizes();
            // console.log(this.$refs);
        });
	},
	computed: {
		...mapState('machine/cache', ['fileInfos']),
	},
	data() {
		return {
			innerValue: '',
            valueChanged: false,
            shown: false,
			filename: '',
			file: null,
			i18n: i18n,
			viewerLoading: false,
		}
	},
	methods: {
		close() {
            this.shown = false;
		},
		
		...mapActions('machine', ['sendCode', 'getFileInfo', 'download']),
		...mapMutations('machine/cache', ['clearFileInfo', 'setFileInfo']),
		async requestFileInfo() {
			// Try to get file info for the next file
			const file = this.file;
			if (!file.isDirectory) {
				let gotFileInfo = false;
				try {
					// Check if it is possible to parse this file
					const filename = this.filename;
					if (Path.isGCodePath(file.name, this.gCodesDirectory)) {
						// Get the fileinfo either from our cache or from the Duet
						let fileInfo = this.fileInfos[filename];
						if (!fileInfo) {
							fileInfo = await this.getFileInfo(filename);
							this.setFileInfo({ filename, fileInfo });
						}

						console.log(fileInfo);
						

						// Set file info
						gotFileInfo = true
						file.height = fileInfo.height;
						file.layerHeight = fileInfo.layerHeight;
						file.filament = fileInfo.filament;
						file.generatedBy = fileInfo.generatedBy;
						file.printTime = fileInfo.printTime ? fileInfo.printTime : null;
						file.simulatedTime = fileInfo.simulatedTime ? fileInfo.simulatedTime : null;
					}
				} catch (e) {
					// Deal with the error. If the connection has been terminated, the next call will invalidate everything
					if (!(e instanceof DisconnectedError) && !(e instanceof InvalidPasswordError)) {
						console.warn(e);
						this.$log('error', this.$t('error.fileinfoRequestFailed', [file.name]), e.message);
					}
				}

				// Remove loading state from the items if no info could be found
				if (!gotFileInfo) {
					file.height = null;
					file.layerHeight = null;
					file.filament = [];
					file.generatedBy = null;
					file.printTime = null;
					file.simulatedTime = null;
				}
			}
		},

		displayTimeValue(item) {
			return (item.printTime !== null) ? this.$displayTime(item.printTime) : this.$t('generic.noValue');
		},

		async downloadGcode() {
			try {
				const filename = this.filename;
				return await this.download({ filename, type: 'text', showSuccess: false });
			} catch (e) {
				if (!(e instanceof DisconnectedError)) {
					// should be handled before we get here
					console.warn(e);
				}
			}
		},
        
		// onBeforeLeave(e) {
		// 	if (this.valueChanged) {
		// 		// Cancel the event. Chrome also requires returnValue to be set
		// 		e.preventDefault();
		// 		e.returnValue = '';
		// 	}
		// }
	},
	watch: {
		// shown(to) {
		// 	// Set textarea content
		// 	this.valueChanged = false;
		// 	this.innerValue = this.value || '';

		// 	if (to) {
		// 		// Add notification for users in case changes have not been saved yet
		// 		window.addEventListener('beforeunload', this.onBeforeLeave);
		// 	} else {
		// 		// ... and turn it off again when the dialog is hidden
		// 		window.removeEventListener('beforeunload', this.onBeforeLeave);
		// 	}
		// }
	}



}
</script>

<style>

</style>