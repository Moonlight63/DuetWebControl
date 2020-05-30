<template>
    <grid-panel columns=2 rows=2 color="red">
        <v-btn 
        class="ma-0" width="100%" max-width="100%" height="100%" 
        :to="to" @click="$emit('click')" :loading="loading" 
        color="rgba(0,0,0,0)"
        @contextmenu="$emit('contextmenu', $event)"
        >
            <div class="d-flex flex-column text-center justify-center fill-height">
                <v-icon :size="iconSize" class="mb-3" :color="color">{{ icon }}</v-icon>
                <div ref="text" :style="fontStyle">{{ label }}</div>
            </div>
        </v-btn>
    </grid-panel>
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
        loading: Boolean,
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
    mounted() {
        this.isMounted = true;
        this.updateFontSize();
    },
    updated() {
        // if(this.isMounted)
        //     this.$nextTick(this.updateFontSize());
    },
    methods: {
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
</style>