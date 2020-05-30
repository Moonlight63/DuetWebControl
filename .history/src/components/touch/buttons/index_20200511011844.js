'use strict'

import Vue from 'vue'

import TouchNavButton from './TouchNavButton.vue'
import TouchCodeButton from './TouchCodeButton.vue'

Vue.component('touch-nav-btn', TouchNavButton)
Vue.component('touch-code-btn', TouchCodeButton)

export default {
    TouchNavButton,
    TouchCodeButton
}