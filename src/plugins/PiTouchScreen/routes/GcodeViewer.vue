<template>
	<div style="display: contents">
        <grid-button to="/touch" label="Back" icon="mdi-arrow-left" columns="2" rows='1'></grid-button>
        <!-- <grid-button label="Back" icon="mdi-arrow-left" columns="2" rows='2' iconColor="primary"></grid-button> -->

        <grid-spacer columns="1"/>

        <grid-spacer class="align-center justify-center d-flex" columns="6">
            <autosize-text class="flex-grow-1 fill-height py-4">
                Dashboard
            </autosize-text>
        </grid-spacer>


        <grid-button :disabled="uiFrozen" :code="'M112\nM999'" :log="false" color="error" :title="$t('button.emergencyStop.title')"
        icon="mdi-flash" :label="$t('button.emergencyStop.caption')" rows='1' columns="3"></grid-button>

        <vertical-slide-group columns="4" rows="5" @click="updateGcode(gcode)">

        </vertical-slide-group>

        <grid-panel :columns="6" :rows="6" >
            <gcode-viewer
                ref="viewerComp"
                class="emulate-root"
                style="width: 512px; height: 512px;"
                :bed="viewer.bed"
                :gcode="viewer.gcode"
                :position="viewer.position"
                :rotation="viewer.rotation"
                :scale="viewer.scale"
                :theme="viewer.theme"
            />
        </grid-panel>

    </div>
</template>

<script>
'use strict'

import { mapGetters } from 'vuex'
import gcode from '!raw-loader!./Benchy.gcode';

export default {

    computed: {
        ...mapGetters(['uiFrozen'])
    },

    methods: {
      updateGcode(raw) {
        console.log("updating gcode");
        console.log(raw);
        this.$refs.viewerComp.forceUpdate(raw);
        // this.viewer.gcode = raw;
      }
    },

    data: () => ({
      gcode,
      drawer: false,
      viewer: {
        bed: {
          X: 10,
          Y: 10
        },
        gcode: undefined,
        position: {
          X: 5,
          Y: 0,
          Z: -5
        },
        rotation: {
          X: -90,
          Y: 0,
          Z: 180
        },
        scale: {
          X: 0.1,
          Y: 0.1,
          Z: 0.1
        },
        theme: {
          extrusionColor: '#4287f5',
          pathColor: '#0a2f6b',
          bedColor: '#586375',
          backgroundColor: '#dfe4ed'
        }
      }
    }),

    mounted() {

	// let file = new File([], )

    // const reader = new FileReader();
    // reader.readAsText(file);


    // const fs = require('fs')

    // fs.readFile('./Benchy.gcode', (err, data) => {
    //     if (err) throw err;

    //     console.log(data.toString());
    // })
  }
}
</script>

<style>

</style>