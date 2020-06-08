<template>
  <grid-panel v-bind="$attrs" class="d-flex flex-column pa-2">
      <v-btn @click="prev" class="align-stretch flex-column">
          <autosize-text icon="mdi-chevron-up" class="fill-height flex-grow-1" />
      </v-btn>
      <div class="flex-grow-1">

      </div>
      <v-btn @click="next" class="align-stretch flex-column">
          <autosize-text icon="mdi-chevron-down" class="fill-height flex-grow-1" />
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