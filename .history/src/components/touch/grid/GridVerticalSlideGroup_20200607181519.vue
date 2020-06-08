<template>
  <grid-panel v-bind="$attrs" class="d-flex flex-column pa-2">
      <v-btn @click="prev" :disabled="!hasPrev" class="align-stretch flex-column">
          <autosize-text icon="mdi-chevron-up" class="fill-height flex-grow-1" />
      </v-btn>
      <v-window ref="window" vertical class="flex-grow-1" style="margin-top: 1rem; margin-bottom: 1rem; ">
          
          <v-window-item 
          v-for="n in itemsSplit.length" :key="n" 
          class="fill-height" 
          style="display: grid; grid-template-columns: minmax(0, 1fr); grid-gap: 1rem"
          :style="'grid-template-rows: repeat(' + displayCount + ', minmax(0, 1fr));'"
          >
            <!-- {{ JSON.stringify(itemsSplit[n-1]) }} -->
            <grid-button v-for="i in itemsSplit[n-1].length" :key="i" >
                
            </grid-button>
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
            hasNext: true,
            hasPrev: false,
            items: []
        }
    },

    props: {
        displayCount: {
            type: Number,
            default: 3
        },
        //items: Array,

    },

    mounted() {
        this.isMounted = true;
        this.hasNext = this.$refs.window.hasNext;
        this.hasPrev = this.$refs.window.hasPrev;
        
        this.$watch(function() {return this.$refs.window.hasNext;}, function(value) { this.hasNext = value;});
        this.$watch(function() {return this.$refs.window.hasPrev;}, function(value) { this.hasPrev = value;});
    
        this.items = [
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
            {icon: 'mdi-polymer', title: 'Placeholder Content'},
        ];
    
    },

    computed: {
        itemsSplit() {
            return this.groupByN(this.displayCount, this.items);
        }
    },

    methods: {
        prev() {
            this.$refs.window.prev();
        },
        next() {
            this.$refs.window.next();
        },

        groupByN(n, data) {
            let result = [];
            for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
            return result;
        }

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