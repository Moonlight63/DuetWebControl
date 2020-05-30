'use strict'

import Vue from 'vue'

import FileEditDialog from './FileEditDialog.vue'
import InputDialog from './InputDialog.vue'
import NewFileDialog from './NewFileDialog'
import NewDirectoryDialog from './NewDirectoryDialog'

Vue.component('touch-file-edit-dialog', FileEditDialog)
Vue.component('touch-input-dialog', InputDialog)
Vue.component('touch-new-file-dialog', NewFileDialog)
Vue.component('touch-new-directory-dialog', NewDirectoryDialog)

export default {
    FileEditDialog,
    InputDialog,
    NewDirectoryDialog,
    NewFileDialog
}