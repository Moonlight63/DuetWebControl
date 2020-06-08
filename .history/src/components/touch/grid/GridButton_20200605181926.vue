<template>
    <grid-panel ref="elm" :columns='columns || 2' :rows='rows || 2' elevation="0">
        <v-btn 
        class="ma-0" :class="rows == 1 ? 'align-stretch flex-column' : ' py-4 align-stretch flex-column'" 
        width="100%" max-width="100%" height="100%" @click="click" :loading="loading" 
        :color="color || 'rgba(0,0,0,0)'" :disabled="disabled || uiFrozen"
        @contextmenu="$emit('contextmenu', $event)"
        >

            <div v-if="rows == 1" class="d-flex fill-height" style="width:100%;">
                <div ref="iconTest" class="fill-height">
                    <span ref="innerSpanIcon" class="iconFitted text-center d-inline-block">
                        <v-icon ref="icon" class="mb-0 flex-shrink-1 notransition" :color="iconColor" left style="width:auto; height:auto">{{ icon }}</v-icon>
                    </span>
                </div>
                <div ref="text" class="flex-grow-1 d-flex align-center text-center">
                    <span ref="innerSpan" class="textFitted text-center d-inline-block">
                        {{ label }}
                    </span>
                </div>
            </div>
            <div v-else class="d-flex flex-column text-center justify-center fill-height" style="width: 100%;">
                <v-icon :size="iconSize" class="mb-0" :color="iconColor">{{ icon }}</v-icon>
                <div ref="text" class="flex-grow-1 d-flex align-center text-center justify-center">
                    <span ref="innerSpan" class="textFitted text-center d-inline-block">
                        {{ label }}
                    </span>
                </div>
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
            iconSize: '10px'
        }
    },
    mounted() {
        this.isMounted = true;
        this.updateSizes();
    },
    updated() {
        // if(this.isMounted)
        //     this.$nextTick(this.updateSizes());
    },
    methods: {
        ...mapActions('machine', ['sendCode']),

        // Calculate height without padding.
        innerHeight(el){
            var style = window.getComputedStyle(el, null);
            return el.clientHeight -
            parseInt(style.getPropertyValue('padding-top'), 10) -
            parseInt(style.getPropertyValue('padding-bottom'), 10);
        },

        // Calculate width without padding.
        innerWidth(el){
            var style = window.getComputedStyle(el, null);
            return el.clientWidth -
            parseInt(style.getPropertyValue('padding-left'), 10) -
            parseInt(style.getPropertyValue('padding-right'), 10);
        },

        updateIconSize() {
            if (!this.isMounted || this.$refs.elm == undefined) 
                return;

            // let factor = this.$refs.elm.$el.clientWidth / 150;
            // let iconSize = 56 * factor;

            // let clheight = this.$refs.elm.$el.clientHeight / 36;
            // let iconMax = 24 * clheight;

            // if (iconSize > iconMax)
            //     iconSize = iconMax;

            // this.iconSize = iconSize + 'px';

            let el = this.$refs.iconTest;
            let innerSpan = this.$refs.innerSpanIcon;
            let iconTag = this.$refs.icon.$el;

            this.iconSize = '1px';

            // innerSpan.style.fontSize = '1px';

            //let originalWidth = this.innerWidth(el);
            let originalHeight = this.innerHeight(el);

            // Don't process if we can't find box dimensions
            if (!originalHeight) {
                throw new Error('Set a static width on the target element ' + el.outerHTML +
                    ' before using textFit!');
            }


            let low = 4;
            let high = 100;
            let mid;

            let count = 0;

            console.log('Original Height: ' + originalHeight);
            console.log('Span Scroll Height: ' + innerSpan.scrollHeight);

            // Binary search for highest best fit
            let size = low;
            while (low <= high && count < 21) {
                mid = (high + low) >> 1;
                //this.iconSize = mid + 'px';
                iconTag.style.fontSize = mid + 'px';
                if(innerSpan.scrollHeight <= originalHeight){
                    size = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }

                console.log('Span Scroll Height: ' + innerSpan.scrollHeight);
                console.log('Icon Size: ' + size);
                //console.log('Mid: ' + mid);
                //console.log(count);

                //count = count + 1;

                if (count > 20)
                    break;
            }
            // found, updating font if differs:
            innerSpan.style.fontSize = mid + 'px';
            
        },

        updateFontSize() {

            if (!this.isMounted || this.$refs.text == undefined) 
                return;

            // Everything below here is taken from the textFit JS library
            // https://github.com/STRML/textFit/blob/master/textFit.js
            // By default - the library does not work well with Vue, and I had to modify it some

            let el = this.$refs.text;
            let innerSpan = this.$refs.innerSpan;

            innerSpan.style.fontSize = '1px';

            let originalWidth = this.innerWidth(el);
            let originalHeight = this.innerHeight(el);

            // Don't process if we can't find box dimensions
            if (!originalWidth || !originalHeight) {
                throw new Error('Set a static width on the target element ' + el.outerHTML +
                    ' before using textFit!');
            }


            let low = 4;
            let high = 36;
            let mid;

            // Binary search for highest best fit
            let size = low;
            while (low <= high) {
                mid = (high + low) >> 1;
                innerSpan.style.fontSize = mid + 'px';
                if(innerSpan.scrollWidth <= originalWidth && innerSpan.scrollHeight <= originalHeight){
                    size = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            // found, updating font if differs:
            if( innerSpan.style.fontSize != size + 'px' ) innerSpan.style.fontSize = size + 'px';

        },

        updateSizes() {
            this.$nextTick(this.updateIconSize());
            //this.$nextTick(this.updateFontSize());
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

.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
</style>