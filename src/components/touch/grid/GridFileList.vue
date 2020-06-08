<template>
  <grid-panel v-bind="$attrs">

      <v-sheet
            class=""
            width="100%"
            height="100%"
        >
            <v-slide-group
            class="pa-4 flex-column fill-height"
            active-class="success"
            show-arrows
            >
                <v-slide-item
                    v-for="n in 15"
                    :key="n"
                    v-slot:default="{ active, toggle }"
                >
                    <v-card
                    :color="active ? undefined : 'grey lighten-1'"
                    class="ma-4"
                    height="200"
                    width="100"
                    @click="toggle"
                    >
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                        >
                            <v-scale-transition>
                                <v-icon
                                    v-if="active"
                                    color="white"
                                    size="48"
                                    v-text="'mdi-close-circle-outline'"
                                ></v-icon>
                            </v-scale-transition>
                        </v-row>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>

      <!-- <v-list nav two-line>
          <v-list-item @click="doNothing">
              <v-list-item-content>
                  <v-list-item-title>Test Item</v-list-item-title>
                  <v-list-item-subtitle>A simple test item with no function.</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
      </v-list> -->
  </grid-panel>
</template>

<script>
export default {

    methods: {
        doNothing() {
            // do nothing
        }
    }

}
</script>

<style>

</style>