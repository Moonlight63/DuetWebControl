<style scoped>
canvas {
	height: 100%;
	width: 100%;
	outline: none;
}
</style>

<template>
	<div class="mt-3" v-resize="resize">
		<canvas ref="preview"></canvas>
	</div>
</template>

<script>
'use strict'

import { mapState, mapActions } from 'vuex'

import { WebGLPreview } from 'gcode-preview'
import { Color } from 'three'

import { registerRoute } from '../../routes'

export default {
	install() {
		// Register a route via Job -> Visualizer
		registerRoute(this, {
			Job: {
				Visualizer: {
					icon: 'mdi-rotate-3d',
					caption: 'plugins.visualizer.menuCaption',
					path: '/Job/Visualizer'
				}
			}
		});
	},

	computed: {
		...mapState('machine/model', {
			jobFile: state => state.job.file.fileName,
			filePosition: state => state.job.filePosition,
			fileSize: state => state.job.file.size
		})
	},
	data() {
		return {
			active: true,
			fileContent: null,
			lastFilePosition: 0,
			preview: null
		}
	},
	methods: {
		...mapActions('machine', ['download']),
		async loadCurrentFile() {
			if (this.jobFile) {
				this.fileContent = await this.download({ filename: this.jobFile, type: 'text' });
				this.preview.clear();
				this.preview.processGCode(this.fileContent.substring(0, this.filePosition || this.fileSize));
				this.lastFilePosition = this.filePosition;
			}
		},
		resize() {
			if (this.preview) {
				this.preview.resize();
			}
		}
	},
	mounted() {
		this.preview = new WebGLPreview({
			canvas: this.$refs.preview,
			limit: Infinity,
			topLayerColor: new Color('lime').getHex(),
			lastSegmentColor: new Color('red').getHex(),
			lineWidth: 0.01
		});

		this.loadCurrentFile();
	},
	activated() {
		if (this.active && this.fileContent) {
			this.preview.processGCode(this.fileContent.substring(this.lastFilePosition, this.filePosition));
			this.lastFilePosition = this.filePosition;
		}
		this.active = true;
	},
	deactivated() {
		this.active = false;
	},
	watch: {
		filePosition(to) {
			if (this.active && to > 0) {
				if (this.fileContent) {
					this.preview.processGCode(this.fileContent.substring(this.lastFilePosition, to));
				}
				this.lastFilePosition = to;
			}
		},
		jobFile() {
			this.loadCurrentFile();
		}
	}
}
</script>
