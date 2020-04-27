'use strict'

import Vue from 'vue'

import BaseFileList from './BaseFileList.vue'
import DisplayFileList from './DisplayFileList.vue'
import EventList from './EventList.vue'
import FilamentFileList from './FilamentFileList.vue'
import JobFileList from './JobFileList.vue'
import MacroFileList from './MacroFileList.vue'
import MacroList from './MacroList.vue'
import SystemFileList from './SystemFileList.vue'

Vue.component('touch-base-file-list', BaseFileList)
Vue.component('touch-display-file-list', DisplayFileList)
Vue.component('touch-event-list', EventList)
Vue.component('touch-filament-file-list', FilamentFileList)
Vue.component('touch-job-file-list', JobFileList)
Vue.component('touch-macro-file-list', MacroFileList)
Vue.component('touch-macro-list', MacroList)
Vue.component('touch-system-file-list', SystemFileList)

export default {
	DisplayFileList,
	EventList,
	FilamentFileList,
	JobFileList,
	MacroFileList,
	MacroList,
	SystemFileList
}
