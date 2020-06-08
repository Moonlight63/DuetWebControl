<template>
  <grid-panel v-bind="$attrs" class="d-flex flex-column pa-2">
      <v-btn @click="prev" :disabled="!hasPrev" class="align-stretch flex-column">
          <autosize-text icon="mdi-chevron-up" class="fill-height flex-grow-1" />
      </v-btn>
      <v-window ref="window" vertical class="flex-grow-1" style="margin-top: 1rem; margin-bottom: 1rem; ">
          
          <v-window-item v-for="n in 15" :key="n" class="fill-height py-4">
              <v-card color="grey fill-height">

              </v-card>
          </v-window-item>
          
          <!-- <grid-panel rows="1" columns="1" >
              Test Content
          </grid-panel>
          <grid-panel rows="1" columns="1" >
              Test Content
          </grid-panel>
          <grid-panel rows="1" columns="1" >
              Test Content
          </grid-panel> -->
      </v-window>
      <v-btn @click="next" :disabled="!hasNext" class="align-stretch flex-column">
          <autosize-text icon="mdi-chevron-down" class="fill-height flex-grow-1" />
      </v-btn>
  </grid-panel>
</template>

<script>
export default {

    //display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: repeat(3, minmax(0, 1fr)); grid-gap: 1rem;

    data() {
        return {
            isMounted: false,
            hasNext: false,
            hasPrev: false,
        }
    },

    mounted() {
        this.isMounted = true;
        hasNext = this.$refs.window.hasNext(),
        hasPrev = this.$refs.window.hasPrev(),
    },

    computed: {
    },

    methods: {
        prev() {
            this.$refs.window.prev();
        },
        next() {
            this.$refs.window.next();
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

.v-window >>>.v-window__container {
    height: 100%;
}
</style>