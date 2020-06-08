<template>
    <grid-panel ref="elm" :columns='columns || 2' :rows='rows || 2' elevation="0">
        <v-btn 
        class="ma-0" :class="rows == 1 ? 'align-stretch flex-column' : ' py-4 align-stretch flex-column'" 
        width="100%" max-width="100%" height="100%" @click="click" :loading="loading" 
        :color="color || 'rgba(0,0,0,0)'" :disabled="disabled || uiFrozen"
        @contextmenu="$emit('contextmenu', $event)"
        >

            <div v-if="rows == 1" class="d-flex fill-height py-2" style="width:100%;">
                <autosize-text ref="autoIcon" :autoFit="false" innerClass="" :icon="icon" :fitWidth="false" :color="iconColor" />
                <autosize-text ref="autoText" :autoFit="false" class="flex-grow-1">
                    {{ label }}
                </autosize-text>
            </div>
            <div v-else class="d-flex flex-column text-center justify-center fill-height" style="width: 100%;">
                <autosize-text ref="autoIcon" :autoFit="false" innerClass="" :icon="icon" :fitHeight="false" :color="iconColor" />
                <autosize-text ref="autoText" :autoFit="false" class="flex-grow-1" :max="36">
                    {{ label }}
                </autosize-text>
            </div>
            
        </v-btn>
    </grid-panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters(['uiFrozen'])
    },
    props: {
        columns: [Number, String],
        rows: [Number, String],
        label: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        loading: Boolean,
        color: String,
        iconColor: String,
        disabled: Boolean,
        to: [String, Object],
        code: String,
		log: {
			type: Boolean,
			default: true
		},
		noWait: {
			type: Boolean,
			default: false
		}
    },
    data() {
        return {
            isMounted: false,
            iconSize: '1px'
        }
    },
    mounted() {
        this.isMounted = true;
        this.updateSizes();
    },
    updated() {

    },
    methods: {
        ...mapActions('machine', ['sendCode']),
        updateSizes() {

            this.$refs.autoIcon.fit().then(() => {
                this.$refs.autoText.fit();
            });

        },

        click() {
            this.$emit('click');
            if (this.code && !this.to)
                this.runCode();
            else if(this.to && !this.code)
                this.$router.push(this.to);
        },
        async runCode() {
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
    },
    watch: {
        '$route': function () {
            this.$nextTick(this.updateSizes());
        }
    }
}
</script>

<style scoped>
.v-btn {
    white-space: normal;
}
.v-btn >>> .v-btn__content {
    flex: auto;
}
.v-btn:hover:before {
    background-color: transparent !important
}
</style>