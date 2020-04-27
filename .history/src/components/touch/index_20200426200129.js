'use strict'

import Vue from 'vue'

import Keyboard from './keyboard/simple-keyboard'
import Lists from './lists'

Vue.component('touch-keyboard', Keyboard);

export default {
    Keyboard,
    Lists
}