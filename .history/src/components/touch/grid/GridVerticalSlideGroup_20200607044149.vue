<template>
  <grid-panel v-bind="$attrs" class="d-flex flex-column">
      <v-btn @click="prev">
          <autosize-text icon="mdi-arrow-up" />
      </v-btn>
      <div class="flex-grow-1">

      </div>
      <v-btn @click="next">
          <autosize-text icon="mdi-arrow-down" />
      </v-btn>
  </grid-panel>
</template>

<script>
export default {
    methods: {
        prev() {

        },
        next() {

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
.v-btn:hover:before {
    background-color: transparent !important
}
</style>