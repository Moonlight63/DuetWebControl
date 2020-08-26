<template>
  <div ref="canvas" style="width: 100%; height: 100%"/>
</template>

<script>
//import {setup, teardown} from '../scripts/scene';
//import utils from '../scripts/utils';

import GcodePreviewer from '../scripts/GcodePreviewer'

export default {

  methods: {
    forceUpdate: function (raw) {
      //utils.update.gcode(raw, this.theme);

      this.previewer.loadGcode(raw);
    },
    redraw: function() {
      this.previewer.redraw();
    }
  },

  data() {
    return {
      previewer: null,
    }
  },

  props: {
    bed: {
      default: () => ({
        X: 200,
        Y: 200
      }),
      type: Object
    },
    gcode: {
      required: false,
      type: String
    },
    theme: {
      default: () => ({
        extrusionColor: '#4287f5',
        pathColor: '#0a2f6b',
        bedColor: '#586375',
        backgroundColor: '#dfe4ed'
      }),
      type: Object
    }
  },
  watch: {
    //Update plane
    bed: {
      deep: true,
      handler: function ()
      {
        // utils.update.bed(this.bed);
      }
    },
    // Update model
    gcode: function (raw)    
    {
      console.log('got request for update');
      this.previewer.loadGcode(raw);
    },
    //Update theme
    // theme: {
    //   deep: true,
    //   handler: function (value)
    //   {
    //     //utils.update.theme(value);
        
    //   }
    // }
  },
  mounted: function ()  
  {
    //Setup scene
    //setup(this.$refs.canvas, this.bed, this.theme, this.gcode, this.position, this.rotation, this.scale);

    this.previewer = new GcodePreviewer(this.$refs.canvas, this.bed, this.theme, this.gcode);
  },
  destroyed: function ()  
  {
    //Teardown scene
    //teardown();

    this.previewer.teardown();

  }
};
</script>

<style scoped>
#canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>