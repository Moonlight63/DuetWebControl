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

<style>

</style>