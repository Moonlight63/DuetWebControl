<template>
	<v-dialog v-model="shown" fullscreen persistent transition="dialog-bottom-transition">
		<v-card class="d-flex flex-column">
			<v-form ref="form" @submit.prevent="submit" class="flex-grow">
				<v-card-title>
					<span class="headline">{{ title }}</span>
				</v-card-title>

				<v-card-text>
					{{ prompt }}

					<v-text-field v-model="input" :rules="[v => !!v || $t('dialog.inputRequired'), v => !isNumericValue || isNumber(parseFloat(v)) || $t('dialog.numberRequired')]" required autofocus></v-text-field>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="hide">{{ $t('generic.cancel') }}</v-btn>
					<v-btn color="blue darken-1" text type="submit">{{ $t('generic.ok') }}</v-btn>
				</v-card-actions>
			</v-form>

			<v-container class="py-0">
				<v-spacer></v-spacer>
				<touch-keyboard justify="center" align="center" @onChange="onKeyboardChange" @onKeyPress="onKeyPress" :input="innerValue" :theme="keyboardTheme" />			
				<v-spacer></v-spacer>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
'use strict'

export default {
	props: {
		shown: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		prompt: {
			type: String,
			required: true
		},
		isNumericValue: Boolean,
		preset: [String, Number]
	},
	data() {
		return {
			input: ''
		}
	},
	methods: {
		async submit() {
			if (this.$refs.form.validate()) {
				this.$emit('update:shown', false);
				this.$emit('confirmed', this.isNumericValue ? parseFloat(this.input) : this.input);
			}
		},
		hide() {
			this.$emit('update:shown', false);
			this.$emit('cancelled');
		}
	},
	watch: {
		shown(to) {
			if (to) {
				// Apply preset
				this.input = this.preset;
			}
		}
	}
}
</script>
