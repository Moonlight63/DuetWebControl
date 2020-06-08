'use strict'

import Vue from 'vue'

import Grid from './Grid.vue'
import GridPanel from './GridPanel.vue'
import GridButton from './GridButton.vue'
import GridSpacer from './GridSpacer.vue'

Vue.component('grid', Grid);
Vue.component('grid-panel', GridPanel);
Vue.component('grid-button', GridButton);
Vue.component('grid-spacer', GridSpacer);

export default {
    Grid,
    GridPanel,
    GridButton,
    GridSpacer
}