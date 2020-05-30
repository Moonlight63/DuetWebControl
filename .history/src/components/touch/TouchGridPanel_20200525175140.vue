<template> 
    <v-card :style="cardStyle">

    </v-card>
</template>

<script>
export default {
    computed: {
        cardStyle: function() {
            return 'grid-column: span ' + this.columns +
            '; grid-row: span ' + this.rows + ';';
        }
    },
    props: {
        columns: Number,
        rows: Number
    }
}
</script>

<style>

</style>