<template>
    <touch-nav-btn v-bind="$props" :loading="waitingForCode" :disabled="$props.disabled || uiFrozen" @contextmenu="$emit('contextmenu', $event)" @click="click"></touch-nav-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TouchNavButtonVue from './TouchNavButton.vue';

export default {
	computed: {
		...mapGetters(['uiFrozen'])
	},
	data() {
		return {
			waitingForCode: false
		}
	},
	extends: TouchNavButtonVue,
	props: {
		code: {
			type: String,
			required: true
		},
		log: {
			type: Boolean,
			default: true
		},
		noWait: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		async click() {
			if (!this.waitingForCode) {
				this.waitingForCode = !this.noWait;
				try {
                    console.log(this.code);
                    
					await this.sendCode({ code: this.code, log: this.log, showSuccess: !this.noWait });
				} catch (e) {
                    console.log(e);
                    
					// handled before we get here
				}
				this.waitingForCode = false;
			}
		}
	}
}
</script>

<style>

</style>