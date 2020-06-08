'use strict'

import Vue from 'vue'

import GridPanel from './GridPanel.vue'
import GridButton from './GridButton.vue'
import Grid from './Grid.vue'

Vue.component('grid-panel', GridPanel);
Vue.component('grid-button', GridButton);
Vue.component('grid', Grid);

export default {
    GridPanel,
    GridButton,
    Grid
}