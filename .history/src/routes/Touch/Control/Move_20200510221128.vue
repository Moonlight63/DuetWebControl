<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Y+" icon="mdi-chevron-up-circle-outline" color="green" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Distance" icon="mdi-map-marker-distance"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home X" icon="mdi-home-circle-outline"></touch-nav-btn>
                        <touch-nav-btn @click="setDistanceIndex('X')" :label="this.moveSteps('X')[this.axisStepIndex['X']]+'mm'" icon="mdi-map-marker-distance"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="X-" icon="mdi-chevron-left-circle-outline" color="red" ></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Home All" icon="mdi-home-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="X+" icon="mdi-chevron-right-circle-outline" color="red" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home Y" icon="mdi-home-circle-outline"></touch-nav-btn>
                        <touch-nav-btn @click="setDistanceIndex('Y')" :label="this.moveSteps('Y')[this.axisStepIndex['Y']]+'mm'" icon="mdi-map-marker-distance"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="Z-" icon="mdi-chevron-down-circle-outline" color="blue" ></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Y-" icon="mdi-chevron-down-circle-outline" color="green" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Z+" icon="mdi-chevron-up-circle-outline" color="blue" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home Z" icon="mdi-home-circle-outline"></touch-nav-btn>
                        <touch-nav-btn @click="setDistanceIndex('Z')" :label="this.moveSteps('Z')[this.axisStepIndex['Z']]+'mm'" icon="mdi-map-marker-distance"></touch-nav-btn>
					</v-row>
				</v-container>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import { KinematicsName } from '../../../store/machine/modelEnums.js'

export default {
	computed: {
		...mapGetters(['isConnected', 'uiFrozen']),
		...mapState('machine/model', ['move']),
		...mapState('machine/settings', ['moveFeedrate']),
		...mapGetters('machine/settings', ['moveSteps', 'numMoveSteps']),
		displayedAxes() { return this.move.axes.filter(axis => axis.visible); },
		isDelta() {
			return ((this.move.kinematics.name === KinematicsName.delta) ||
					(this.move.kinematics.name === KinematicsName.rotaryDelta));
		},
        unhomedAxes() { return this.move.axes.filter(axis => axis.visible && !axis.homed); },
        
	},
	data() {
		return {
			showMeshEditDialog: false,
			moveStepDialog: {
				shown: false,
				axis: 'X',
				index: 0,
				preset: 0
            },
            axisStepIndex: {}
		}
    },
    created() {
        this.displayedAxes.forEach(axis => {
            this.axisStepIndex[axis.letter] = this.numMoveSteps-1;
            this.axisStepIndex[axis.letter + 'label'] = this.moveSteps(axis.letter)[this.numMoveSteps-1]+'mm';
        });
        //console.log(this.numMoveSteps);
        //console.log(this.displayedAxes);
        console.log(this.axisStepIndex);
        //console.log(this.moveSteps('Y'));
        
    },
	methods: {
		...mapActions('machine', ['sendCode']),
		...mapMutations('machine/settings', ['setMoveStep']),
		getMoveCellClass(index) {
			let classes = '';
			if (index === 0 || index === 5) {
				classes += 'hidden-lg-and-down';
			}
			if (index > 1 && index < 4 && index % 2 === 1) {
				classes += 'hidden-md-and-down';
			}
			return classes;
		},
		showSign: (value) => (value > 0) ? `+${value}` : value,
		showMoveStepDialog(axis, index) {
			this.moveStepDialog.axis = axis;
			this.moveStepDialog.index = index;
			this.moveStepDialog.preset = this.moveSteps(this.moveStepDialog.axis)[this.moveStepDialog.index];
			this.moveStepDialog.shown = true;
		},
		moveStepDialogConfirmed(value) {
			this.setMoveStep({ axis: this.moveStepDialog.axis, index: this.moveStepDialog.index, value });
        },
        setDistanceIndex(axisLetter) {
            if (this.axisStepIndex[axisLetter] - 1 < 0)
                this.axisStepIndex[axisLetter] = this.numMoveSteps-1;
            else
                this.axisStepIndex[axisLetter]--
                
            this.axisStepIndex[axisLetter + 'label'] = this.moveSteps(axisLetter)[this.axisStepIndex[axisLetter]]+'mm'
            console.log(this.axisStepIndex);
        }
	},
	watch: {
		isConnected() {
			// Hide dialogs when the connection is interrupted
			this.showMeshEditDialog = false;
			this.moveStepDialog.shown = false;
		}
	}

}
</script>

<style>

</style>