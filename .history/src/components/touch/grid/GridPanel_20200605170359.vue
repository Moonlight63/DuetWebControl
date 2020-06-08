<template> 
    <v-card :style="cardStyle" :color="color" :elevation="elevation">
        <slot></slot>
    </v-card>
</template>

<script>
export default {
    computed: {
        cardStyle: function() {
            return 'grid-column: span ' + (this.columns || 2) +
            '; grid-row: span ' + (this.rows || 2) + ';';
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