'use strict'

import Vue from 'vue'

import Keyboard from './keyboard/simple-keyboard'
import Lists from './lists'
import Dialogs from './dialogs'
import Buttons from './buttons'

Vue.component('touch-keyboard', Keyboard);

export default {
    Keyboard,
    Lists,
    Dialogs,
    Buttons
}