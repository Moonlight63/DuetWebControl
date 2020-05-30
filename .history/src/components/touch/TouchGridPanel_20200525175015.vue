<template> 
    <v-card style="grid-column: span {{ columns }}; grid-rows: span {{ rows }};">

    </v-card>
</template>

<script>
export default {
    computed: {
        cardStyle: function() {
            return 'grid-column: span ' + this.columns +
            '; grid-rows: span ' + this.rows + ';';
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