'use strict'

import Vue from 'vue'

import Keyboard from './keyboard/simple-keyboard'
import Lists from './lists'
import Dialogs from './dialogs'
import Buttons from './buttons'
import TouchCodeInput from './input/TouchCodeInput.vue'
import Grid from './grid'

Vue.component('touch-keyboard', Keyboard);
Vue.component('touch-code-input', TouchCodeInput);

export default {
    Keyboard,
    Lists,
    Dialogs,
    Buttons,
    Grid,
    TouchCodeInput,
}