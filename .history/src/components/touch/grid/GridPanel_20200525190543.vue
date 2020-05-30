<template> 
    <v-card :style="cardStyle" :color="color" :elevation="elevation">
        <slot></slot>
    </v-card>
</template>

<script>
export default {
    computed: {
        cardStyle: function() {
            return 'grid-column: span ' + (this.columns || 1) +
            '; grid-row: span ' + (this.rows || 1) + ';';
        }
    },
    props: {
        columns: [Number, String],
        rows: [Number, String],
        elevation: [Number, String],
        color: String
    }
}
</script>

<style>

</style>