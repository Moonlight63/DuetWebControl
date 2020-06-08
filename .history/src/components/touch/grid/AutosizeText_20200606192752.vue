<template>
  <div ref="text" class="flex-grow-1 d-flex align-center text-center justify-center">
        <span ref="innerSpan" style="font-size: 1px;" class="textFitted text-center d-inline-block notransition">
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
    },

    mounted() {
        if (this.autoFit) {
            this.fit();
        }
    },

    methods: {
        updateFontSize() {

            if (this.$refs.text == undefined) 
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
            let size;
            // Binary search for highest best fit
            while (low <= high) {
                mid = (high + low) >> 1;
                innerSpan.style.fontSize = mid + 'px';
                if(((!this.fitHeight) || innerSpan.clientWidth <= originalWidth) && ((!this.fitWidth) || innerSpan.clientHeight <= originalHeight)){
                    size = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            // found, updating font if differs:
            this.$nextTick(() => {
                innerSpan.style.fontSize = size + 'px';
            });

        },

        fit() {
            document.fonts.ready.then(() => {
                console.log('All fonts loaded!');
                this.updateFontSize();
            })
        },
    }

}
</script>

<style>

</style>