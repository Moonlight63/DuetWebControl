<template>
    <grid-panel ref="elm" :columns='columns || 2' :rows='rows || 2' elevation="0">
        <v-btn 
        class="ma-0" width="100%" max-width="100%" height="100%" 
        @click="click" :loading="loading" 
        :color="color || 'rgba(0,0,0,0)'" :disabled="disabled || uiFrozen"
        @contextmenu="$emit('contextmenu', $event)"
        >

            <div v-if="rows == 1" class="d-flex" style="width:100%;">
                <!-- <div class="d-flex flex-row align-stretch" style="width:100%; height:100%"> -->
                    <!-- <div class="flex-shrink-1"> -->
                        <v-icon :size="iconSize" class="mb-0 flex-shrink-1" :color="iconColor" left style="width:auto; height:auto">{{ icon }}</v-icon>
                    <!-- </div> -->
                    <div ref="text" class="flex-grow-1">
                        <!-- <span ref="text" :style="fontStyle" class="flex-grow-1 fill-height"> -->
                            {{ label }}
                        <!-- </span> -->
                    </div>
                    <!-- <div ref="text" :style="fontStyle" class="flex-grow-1">
                        {{ label }}
                    </div> -->
                    <!-- <div class="d-flex flex-column fill-height justify-center flex-grow-1"> -->
                    <!-- </div> -->
                <!-- </div> -->
            </div>
            <div v-else class="d-flex flex-column text-center justify-center fill-height">
                <v-icon :size="iconSize" class="mb-3" :color="iconColor">{{ icon }}</v-icon>
                <div ref="text" :style="fontStyle" class="flex-grow-1 fill-height">{{ label }}</div>
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
        this.updateSizes();
    },
    updated() {
        // if(this.isMounted)
            // this.$nextTick(this.updateFontSize());
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

        hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        },

        // Better than a stylesheet dependency
        addStyleSheet() {
            if (document.getElementById("textFitStyleSheet")) return;
            var style = [
            ".textFitAlignVert{",
                "position: absolute;",
                "top: 0; right: 0; bottom: 0; left: 0;",
                "margin: auto;",
                "display: flex;",
                "justify-content: center;",
                "flex-direction: column;",
            "}",
            ".textFitAlignVertFlex{",
                "display: flex;",
            "}",
            ".textFitAlignVertFlex .textFitAlignVert{",
                "position: static;",
            "}",].join("");

            var css = document.createElement("style");
            css.type = "text/css";
            css.id = "textFitStyleSheet";
            css.innerHTML = style;
            document.body.appendChild(css);
        },

        updateIconSize() {
            if (!this.isMounted || this.$refs.elm == undefined) 
                return;

            let factor = this.$refs.elm.$el.clientWidth / 150;
            let iconSize = 56 * factor;

            let clheight = this.$refs.elm.$el.clientHeight / 36;
            let iconMax = 24 * clheight;

            if (iconSize > iconMax)
                iconSize = iconMax;

            this.iconSize = iconSize + 'px';
        },

        updateFontSize() {

            if (!this.isMounted || this.$refs.text == undefined) 
                return;

            // Everything below here is taken from the textFit JS library
            // https://github.com/STRML/textFit/blob/master/textFit.js
            // By default - the library does not work well with Vue, and I had to modify it some

            let el = this.$refs.text;
            let originalHTML = el.innerHTML;
            let originalWidth = this.innerWidth(el);
            let originalHeight = this.innerHeight(el);

            // Don't process if we can't find box dimensions
            if (!originalWidth || !originalHeight) {
                throw new Error('Set a static width on the target element ' + el.outerHTML +
                    ' before using textFit!');
            }

            var innerSpan;

            // Add textFitted span inside this container.
            if (originalHTML.indexOf('textFitted') === -1) {
                innerSpan = document.createElement('span');
                innerSpan.className = 'textFitted';
                // Inline block ensure it takes on the size of its contents, even if they are enclosed
                // in other tags like <p>
                innerSpan.style['display'] = 'inline-block';
                innerSpan.innerHTML = originalHTML;
                el.innerHTML = '';
                el.appendChild(innerSpan);
            } else {
                // Reprocessing.
                innerSpan = el.querySelector('span.textFitted');
                // Remove vertical align if we're reprocessing.
                if (this.hasClass(innerSpan, 'textFitAlignVert')){
                    innerSpan.className = innerSpan.className.replace('textFitAlignVert', '');
                    innerSpan.style['height'] = '';
                    el.className.replace('textFitAlignVertFlex', '');
                }
            }

            // Prepare & set alignment
            el.style['text-align'] = 'center';
            innerSpan.style['text-align'] = 'center';

            let low = 6;
            let high = 80;
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
            // await injection point
            }
            // found, updating font if differs:
            if( innerSpan.style.fontSize != size + 'px' ) innerSpan.style.fontSize = size + 'px';

            // Our height is finalized. If we are aligning vertically, set that up.
            // if (settings.alignVert) {
                this.addStyleSheet();
                let height = innerSpan.scrollHeight;
                if (window.getComputedStyle(el)['position'] === "static"){
                    el.style['position'] = 'relative';
                }
                if (!this.hasClass(innerSpan, "textFitAlignVert")){
                    innerSpan.className = innerSpan.className + " textFitAlignVert";
                }
                innerSpan.style['height'] = height + "px";
                if (!this.hasClass(el, "textFitAlignVertFlex")) {
                    el.className = el.className + " textFitAlignVertFlex";
                }
            // }

        },

        updateSizes() {
            this.updateIconSize();
            this.$nextTick(this.updateFontSize());
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