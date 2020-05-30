'use strict'

import Vue from 'vue'

import GridPanel from './GridPanel.vue'
import GridButton from './GridButton.vue'

Vue.component('grid-panel', GridPanel);
Vue.component('grid-button', GridButton);

export default {
    GridPanel,
    GridButton
}