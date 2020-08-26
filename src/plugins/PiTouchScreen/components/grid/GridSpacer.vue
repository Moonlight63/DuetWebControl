<template> 
    <div :style="cardStyle">
        <slot></slot>
    </div>
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
        rows: [Number, String]
    }
}
</script>

<style>
</style>