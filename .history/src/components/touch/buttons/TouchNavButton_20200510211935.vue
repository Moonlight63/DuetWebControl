<template>
    <v-col cols="2" sm="2" md="2" xl="1">
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
        // iconSize() {
        //     switch (this.$vuetify.breakpoint.name) {
        //         case 'xs': return '32px'
        //         case 'sm': return '40px'
        //         case 'md': return '56px'
        //         case 'lg': return '56px'
        //         case 'xl': return '56px'
        //         default: return '56px'
        //     }
        // },
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
            fontSize: 0.875,
            fontStyle: 'font-size: 0.875rem',
            iconSize: '56px'
        }
    },
    mounted() {
        this.isMounted = true;
        this.updateFontSize();
    },
    methods: {
        updateFontSize() {
            // if(!this.isMounted) {
            //     this.fontSize = 'font-size: 0.875rem'
            // }

            console.log(this.$refs);

            let factor = this.$refs.elm.$el.clientWidth / 140;
            let fontSize = 0.875 * factor;
            let iconSize = 56 * factor;

            // if (this.$refs.text.clientWidth > this.$refs.elm.$el.clientWidth) {
            //     this.fontSize = this.fontSize - 0.001;
            //     this.$nextTick(this.updateFontSize(), this);
            // }
            this.fontStyle = 'font-size: ' + fontSize + 'rem';
            this.iconSize = iconSize + 'px';

            // if(this.$refs.elm.$el.clientWidth < 120) {
            //     this.fontSize = 'font-size: 0.5rem'
            // } else {
            //     this.fontSize = 'font-size: 0.875rem'
            // }

            // switch (this.$vuetify.breakpoint.name) {
            //     //case 'xs': return 'font-size: 0.4rem'
            //     //case 'sm': return 'font-size: 0.5rem'
            //     //case 'md': return '56px'
            //     //case 'lg': return '56px'
            //     //case 'xl': return '56px'
            //     default: return 'font-size: 0.875rem'
            // }
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