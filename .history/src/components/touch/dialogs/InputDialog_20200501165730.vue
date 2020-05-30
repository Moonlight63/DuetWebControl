<template>
	<v-dialog v-model="shown" fullscreen persistent transition="dialog-bottom-transition">
		<v-card class="d-flex flex-column">
			<v-form ref="form" @submit.prevent="submit" class="flex-grow-1">
				<v-app-bar flat dark color="primary" class="flex-grow-0 flex-shrink-1">
					<v-row class="d-flex">
						<v-col class="d-flex flex-grow-1 justify-center">
							<v-btn text dark @click="hide" class="mr-auto">
								<v-icon>mdi-close</v-icon> {{ $t('generic.cancel') }}
							</v-btn>
						</v-col>
						
						<v-col class="d-flex flex-grow-1 justify-center">
							<v-toolbar-title>{{ title }}</v-toolbar-title>
						</v-col>
						
						<v-col class="d-flex flex-grow-1 justify-center">
							<v-btn dark text type="submit" class="ml-auto">
								<v-icon class="mr-1">mdi-check</v-icon> {{ $t('generic.ok') }}
							</v-btn>
						</v-col>
					</v-row>
				</v-app-bar>

				<v-card-text>
					{{ prompt }}

					<v-text-field v-model="input" :rules="[v => !!v || $t('dialog.inputRequired'), v => !isNumericValue || isNumber(parseFloat(v)) || $t('dialog.numberRequired')]" required autofocus></v-text-field>
				</v-card-text>
			</v-form>

			<v-container class="py-0">
				<v-spacer></v-spacer>
				<touch-keyboard @onChange="onKeyboardChange" @onKeyPress="onKeyPress" :input="input" :theme="keyboardTheme" :numericOnly="isNumericValue" />			
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
			input: '',
			keyboardTheme: "hg-theme-default"
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
		},
		onKeyboardChange(input) {
			this.input = input;
		},
		onKeyPress(button) {
			console.log("button", button);
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
