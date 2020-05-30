<template> 
    <v-card :style="cardStyle" :color="color">
        <slot></slot>
    </v-card>
</template>

<script>
export default {
    computed: {
        cardStyle: function() {
            return 'grid-column: span ' + this.columns || 1 +
            '; grid-row: span ' + this.rows || 1 + ';';
        }
    },
    props: {
        columns: Number,
        rows: Number,
        color: String
    }
}
</script>

<style>

</style>