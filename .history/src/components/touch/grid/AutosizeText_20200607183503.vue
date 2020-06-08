<template>

    <div v-if="icon != null" ref="text" class="d-flex align-center text-center justify-center">
        <v-icon ref="icon" class="notransition" :class="innerClass" :color="color">{{ icon }}</v-icon>
    </div>
    <div v-else ref="text" class="d-flex align-center text-center justify-center">
        <span ref="innerSpan" style="font-size: 1px;" class="text-center d-inline-block notransition" :class="innerClass + ' ' + color + '--text'">
            <slot/>
        </span>
    </div>

</template>

<script>
export default {

    props: {
        autoFit: {
            type: Boolean,
            default: true
        },
        fitWidth: {
            type: Boolean,
            default: true
        },
        fitHeight: {
            type: Boolean,
            default: true
        },
        icon: {
            type: String,
            default: null
        },
        color: String,
        innerClass: String,
        min: {
            type: [Number, String],
            default: 4,
        },
        max: {
            type: [Number, String],
            default: 80,
        }

    },

    mounted() {
        if (this.autoFit) {
            this.fit();
        }
    },

    methods: {

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

        updateFontSize() {

            if (this.$refs.text == undefined) 
                return;

            if (this.$refs.innerSpan == undefined && this.$refs.icon == undefined) 
                return;

            // Everything below here is taken from the textFit JS library
            // https://github.com/STRML/textFit/blob/master/textFit.js
            // By default - the library does not work well with Vue, and I had to modify it some

            let el = this.$refs.text;
            let innerSpan;

            if(this.icon != null)
                innerSpan = this.$refs.icon.$el;
            else
                innerSpan = this.$refs.innerSpan;

            innerSpan.style.fontSize = '1px';

            let originalWidth = this.innerWidth(el);
            let originalHeight = this.innerHeight(el);

            // Don't process if we can't find box dimensions
            if (!originalWidth || !originalHeight) {
                throw new Error('Set a static width on the target element ' + el.outerHTML +
                    ' before using textFit!');
            }

            let low = this.min;
            let high = this.max;
            let mid;
            let size;
            // Binary search for highest best fit
            while (low <= high) {
                mid = (high + low) >> 1;
                innerSpan.style.fontSize = mid + 'px';
                if(((!this.fitWidth) || innerSpan.scrollWidth <= originalWidth) && ((!this.fitHeight) || innerSpan.scrollHeight <= originalHeight)){
                    size = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            // found, updating font if differs:
            this.$nextTick(() => {
                innerSpan.style.fontSize = size-10 + 'px';
            });

        },

        fit() {
            return new Promise((resolve) => {
                document.fonts.ready.then(() => {
                    console.log('All fonts loaded!');
                    this.updateFontSize();
                }).then(() => {
                    resolve();
                })
            });
        },
    }

}
</script>

<style>

</style>