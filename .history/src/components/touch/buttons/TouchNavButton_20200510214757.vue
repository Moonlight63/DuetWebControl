<template>
    <v-col cols="3" sm="2" md="2" xl="1">
        <v-responsive v-resize="updateFontSize" ref="elm" aspect-ratio="1">
            <v-btn class="ma-0" width="100%" max-width="100%" height="100%" :to="to" @click="$emit('click')" >
                <div class="d-flex flex-column text-center justify-center fill-height">
                    <v-icon :size="iconSize" class="mb-3" :color="color">{{ icon }}</v-icon>
                    <div ref="text" :style="fontStyle">{{ label }}</div>
                </div>
            </v-btn>
        </v-responsive>
    </v-col>
</template>

<script>
export default {
    computed: {

    },
    props: {
        label: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        color: String,
        to: [String, Object]
    },
    data() {
        return {
            isMounted: false,
            fontStyle: 'font-size: 0.875rem',
            iconSize: '56px'
        }
    },
    // mounted() {
    //     this.isMounted = true;
    //     //this.updateFontSize();
    // },
    // updated() {
    //     //this.$nextTick(this.updateFontSize());
    // },
    methods: {
        updateFontSize() {

            // while (this.$refs.elm.$el.clientWidth == 0) {
            //     // Do Nothing
            // }


            let factor = this.$refs.elm.$el.clientWidth / 140;
            let fontSize = 0.875 * factor;
            let iconSize = 56 * factor;

            this.fontStyle = 'font-size: ' + fontSize + 'rem';
            this.iconSize = iconSize + 'px';

        },
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
</style>