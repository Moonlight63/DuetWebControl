<template>
    <v-col cols="2" sm="2" md="2" xl="1">
        <v-responsive aspect-ratio="1">
            <v-btn class="ma-0" width="100%" max-width="100%" height="100%" :to="to" @click="$emit('click')" >
                <div class="d-flex flex-column text-center justify-center fill-height">
                    <v-icon :size="iconSize()" class="mb-3" :color="color">{{ icon }}</v-icon>
                    <div>{{ label }}</div>
                </div>
            </v-btn>
        </v-responsive>
    </v-col>
</template>

<script>
export default {
    computed: {
        iconSize() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '40px'
                case 'sm': return '48px'
                case 'md': return '56px'
                case 'lg': return '56px'
                case 'xl': return '56px'
                default: return '56px'
            }
        },
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