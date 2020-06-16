<template>
    <div style="display: contents">
        <grid-button disabled label="Back" icon="mdi-arrow-left" columns="2" rows='1'></grid-button>

        <!-- <grid-button label="Back" icon="mdi-arrow-left" columns="2" rows='2' iconColor="primary"></grid-button> -->

        <grid-spacer columns="1"/>

        <grid-spacer class="align-center justify-center d-flex" columns="6">
            <autosize-text class="flex-grow-1 fill-height py-4">
                Dashboard
            </autosize-text>
        </grid-spacer>


        <grid-button :disabled="uiFrozen" :code="'M112\nM999'" :log="false" color="error" :title="$t('button.emergencyStop.title')"
        icon="mdi-flash" :label="$t('button.emergencyStop.caption')" rows='1' columns="3"></grid-button>

        <!-- <grid-button color="error" :title="$t('button.emergencyStop.title')"
        icon="mdi-flash" label="Super long label that would normally clip.txt Date created: 06/04/2020 Date Last Printed: jfajfdaoijfajfajoifdjaosjfodas This is so long at this point if it doesn't break I will be really impressed!" rows='1' columns="3"></grid-button> -->

        <!-- <grid-filelist columns="3" rows="4">

        </grid-filelist> -->

        <vertical-slide-group columns="4" rows="5">

        </vertical-slide-group>
        
        <grid-button :disabled="false" label="Gcode Viewer" icon="mdi-code-tags" to="/touch/gcode"></grid-button>


    </div>
</template>

<script>
'use strict'

import { mapGetters } from 'vuex'

export default {

    computed: {
        ...mapGetters(['uiFrozen'])
    },

    mounted() {
        // console.log("Dashboard Mounted!");
        // this.$nextTick(() => {
		// 	console.log("Dashboard Next!");
			
		// });
    }
	
}
</script>

<style>

</style>