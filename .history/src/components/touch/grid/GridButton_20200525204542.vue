<template>
    <grid-panel :columns='columns || 2' :rows='rows || 2' elevation="0">
        <v-btn 
        class="ma-0" width="100%" max-width="100%" height="100%" 
        :to="to" @click="click" :loading="loading" 
        :color="color || 'rgba(0,0,0,0)'" :disabled="disabled || uiFrozen"
        @contextmenu="$emit('contextmenu', $event)"
        >
            <div class="d-flex flex-row text-center justify-center fill-height">
                <v-icon :size="iconSize" class="mb-3" :color="iconColor">{{ icon }}</v-icon>
                <div ref="text" :style="fontStyle">{{ label }}</div>
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
            fontStyle: 'font-size: 0.875rem',
            iconSize: '56px'
        }
    },
    mounted() {
        this.isMounted = true;
        this.updateFontSize();
    },
    updated() {
        // if(this.isMounted)
        //     this.$nextTick(this.updateFontSize());
    },
    methods: {
        ...mapActions('machine', ['sendCode']),

        updateFontSize() {

            if (!this.isMounted || this.$refs.elm == undefined) 
                return;

            // if(this.$refs.elm == undefined)
            //     console.log(this.$refs);

            let factor = this.$refs.elm.$el.clientWidth / 140;
            let fontSize = 0.875 * factor;
            let iconSize = 56 * factor;

            this.fontStyle = 'font-size: ' + fontSize + 'rem';
            this.iconSize = iconSize + 'px';

        },

        click() {
            this.$emit('click');
            if (this.code && !this.to)
                this.runCode();
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
            this.$nextTick(this.updateFontSize());
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