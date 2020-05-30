'use strict'

import Vue from 'vue'

import FileEditDialog from './FileEditDialog.vue'
import InputDialog from './InputDialog.vue'

Vue.component('touch-file-edit-dialog', FileEditDialog)
Vue.component('touch-input-dialog', InputDialog)

export default {
    FileEditDialog,
    InputDialog
}