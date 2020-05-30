'use strict'

import Vue from 'vue'

import Keyboard from './keyboard/simple-keyboard'
import Lists from './lists'
import Dialogs from './dialogs'
import Buttons from './buttons'
import TouchCodeInput from './input/TouchCodeInput.vue'
import TouchGridPanel from './TouchGridPanel.vue'

Vue.component('touch-keyboard', Keyboard);
Vue.component('touch-code-input', TouchCodeInput);
Vue.component('grid-panel', TouchGridPanel);

export default {
    Keyboard,
    Lists,
    Dialogs,
    Buttons,
    TouchCodeInput,
    TouchGridPanel
}