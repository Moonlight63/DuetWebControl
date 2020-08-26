'use strict'

import Vue from 'vue'

import Grid from './Grid.vue'
import GridPanel from './GridPanel.vue'
import GridButton from './GridButton.vue'
import GridSpacer from './GridSpacer.vue'
// import GridFileList from './GridFileList.vue'
import GridVerticalSlideGroup from './GridVerticalSlideGroup.vue'

import AutosizeText from './AutosizeText.vue'

Vue.component('grid', Grid);
Vue.component('grid-panel', GridPanel);
Vue.component('grid-button', GridButton);
Vue.component('grid-spacer', GridSpacer);
// Vue.component('grid-filelist', GridFileList);
Vue.component('vertical-slide-group', GridVerticalSlideGroup);

Vue.component('autosize-text', AutosizeText);

// export default {
//     Grid,
//     GridPanel,
//     GridButton,
//     GridSpacer,
//     GridFileList,
//     GridVerticalSlideGroup,

//     AutosizeText,
// }