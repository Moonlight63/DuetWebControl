<style scoped>
.grow {
	flex-grow: 1;
}
</style>

<template>

	<v-dialog v-model="shown" fullscreen persistent transition="dialog-bottom-transition">
		<v-card class="d-flex flex-column">
			<v-app-bar flat dark color="primary" class="flex-grow-0 flex-shrink-1">
				<v-row class="d-flex">
					<v-col class="d-flex flex-grow-1 justify-center">
						<v-btn text dark @click="hide" class="mr-auto">
							<v-icon>mdi-close</v-icon> {{ $t('generic.cancel') }}
						</v-btn>
					</v-col>
					
					<v-col class="d-flex flex-grow-1 justify-center">
						<v-toolbar-title>{{ $t('input.code.placeholder') }}</v-toolbar-title>
					</v-col>
					
					<v-col class="d-flex flex-grow-1 justify-center">
						<v-btn dark text class="ml-auto" :disabled="uiFrozen" :loading="doingCode" @click="doSend">
							<v-icon class="mr-1">mdi-send</v-icon> {{ $t('input.code.send') }}
						</v-btn>
					</v-col>
				</v-row>
			</v-app-bar>

			<div class="flex-grow-1">
				<v-card flat class="mx-auto mt-10" style="width: 50%">
					<!-- <v-card-text> -->
						<v-combobox ref="input" :solo=true hide-details :disabled="uiFrozen" :placeholder="$t('input.code.placeholder')"
									:search-input.sync="code" @click="click" :loading="doingCode" @keyup.enter="send" @change="change" @blur="wasFocused = showItems = false"
									:items="displayedCodes" @update:list-index="updateSelection" @keyup.down="showItems = true" @keyup.tab.exact="selectItem" hide-selected>
							<template #item="{ item }">
								<code>{{ item.text }}</code>
								<v-spacer></v-spacer>
								<v-btn icon @click.prevent.stop="removeCode(item.value)">
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</template>
						</v-combobox>
					<!-- </v-card-text> -->
				</v-card>
			</div>

			<v-container class="d-flex py-0 justify-center">
				<touch-keyboard @onChange="onKeyboardChange" @onKeyPress="onKeyPress" :input="code" :theme="keyboardTheme" />			
			</v-container>
		</v-card>
	</v-dialog>
	
</template>

<script>
'use strict'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

const conditionalKeywords = ['abort', 'echo', 'if', 'elif', 'else', 'while', 'break', 'var', 'set'];

export default {
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine/settings', ['codes']),
		...mapState('settings', ['disableAutoComplete']),
		displayedCodes() {
			if (this.showItems && !this.disableAutoComplete) {
				const currentCode = this.code ? this.code.toLowerCase() : '';
				return this.codes
					.filter(code => (currentCode === '') || (code.toLowerCase().indexOf(currentCode) !== -1))
					.map(code => ({ text: code, value: code }));
			}
			return [];
		}
	},
	data() {
		return {
			code: '',
			wasFocused: false,
			showItems: false,
			selectedItem: '',
			sendPending: false,
			doingCode: false,
			keyboardTheme: "hg-theme-default"
		}
	},
	props: {
		shown: {
			type: Boolean,
			required: true
		},
		grow: Boolean,
		solo: Boolean
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		...mapMutations('machine/settings', ['addCode', 'removeCode']),
		click() {
			if (this.wasFocused) {
				this.showItems = !this.showItems;
			} else {
				this.wasFocused = true;
			}
		},
		hide() {
			this.$emit('update:shown', false);
			this.$emit('cancelled');
		},
		onKeyboardChange(input) {
			this.code = input;
			//this.$refs.input.$refs.input.focus();
			this.$refs.input.onFocus();
			//this.$refs.input.clearableCallback();
			// this.$nextTick(() => {
			// 	this.$refs.input.$refs.input && this.$refs.input.$refs.input.focus();
			// });
			// if (caretPosition !== null)
			// 	this.$nextTick(() => {
			// 		//this.$refs.input.$refs.input && this.$refs.input.$refs.input.focus()
			// 		//this.$refs.input.$refs.input.setSelectionRange(caretPosition,caretPosition)
			// 	});
		},
		onKeyPress(button) {
			console.log("button", button);
		},
		updateSelection(selection) {
			if (selection instanceof Array) {
				selection = (selection.length > 0) ? selection[0] : -1;
			}

			const items = this.displayedCodes;
			if (selection >= 0 && selection < items.length) {
				this.selectedItem = items[selection].value;
			} else {
				this.selectedItem = '';
			}
		},
		selectItem(e) {
			if (this.selectedItem !== '') {
				this.code = this.selectedItem;
				this.showItems = false;
				e.preventDefault();
			}
		},
		change(value) {
			if (value && !(value instanceof String)) {
				this.code = value.value;
			}
		},
		doSend() {
			if (this.$refs.input.isMenuActive) {
				this.$refs.input.isMenuActive = false;		// FIXME There must be a better solution than this
				this.sendPending = true;
			} else {
				this.send();
				this.hide();
			}
		},
		hasUnprecedentedParameters: (code) => !code || /(M23|M28|M30|M32|M36|M117)[^0-9]/i.test(code),
		async send() {
			this.$refs.input.isMenuActive = false;			// FIXME There must be a better solution than this

			const code = (this.code.constructor === String) ? this.code : this.code.value;
			if (code && code.trim() !== '' && !this.doingCode) {
				let codeToSend = '', bareCode = '', inQuotes = false, inExpression = false, inWhiteSpace = false, inComment = false;
				if (!this.hasUnprecedentedParameters(codeToSend) &&
					!conditionalKeywords.some(keyword => code.trim().startsWith(keyword))) {
					// Convert code to upper-case and remove comments
					for (let i = 0; i < code.length; i++) {
						const char = code[i];
						if (inQuotes) {
							if (i < code.length - 1 && char === '\\' && code[i + 1] === '"') {
								codeToSend += '\\"';
								i++;
							} else {
								if (char === '"') {
									inQuotes = false;
								}
								codeToSend += char;
							}
						} else if (inExpression) {
							codeToSend += char;
							inExpression = (char !== '}');
						} else if (inComment) {
							codeToSend += char;
							inComment = (char !== ')');
						} else {
							if (char === '"') {
								// don't convert escaped strings
								inQuotes = true;
							} else if (char === ' ' || char === '\t') {
								// remove duplicate white spaces
								if (inWhiteSpace) {
									continue;
								}
								inWhiteSpace = true;
							} else if (char === ';') {
								// stop when final comments start
								break;
							} else if (char === '(') {
								// don't process chars from encapsulated comments
								inComment = true;
							} else if (char === '{') {
								// don't process chars from expressions
								inExpression = true;
							}
							inWhiteSpace = false;
							codeToSend += char.toUpperCase();
							bareCode += code.toUpperCase();
						}
					}
				} else {
					// Don't modify the user input
					codeToSend = code;
				}

				// Send the code and wait for completion
				this.doingCode = true;
				try {
					const reply = await this.sendCode({ code: codeToSend, fromInput: true });
					if (!inQuotes && !reply.startsWith('Error: ') && !reply.startsWith('Warning: ') &&
						bareCode.indexOf('M587') === -1 && bareCode.indexOf('M589') === -1 &&
						!this.disableAutoComplete && this.codes.indexOf(codeToSend.trim()) === -1) {
						// Automatically remember successful codes
						this.addCode(codeToSend.trim());
					}
				} catch {
					// handled before we get here
				}
				this.doingCode = false;
			}
		}
	},
	watch: {
		code(to) {
			if (to && to.length >= 2) {
				this.showItems = true;
			}
		},
		uiFrozen(to) {
			if (to) {
				// Clear input when the UI is frozen
				this.code = '';
			}
		}
	}
}
</script>
