<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Y+" icon="mdi-chevron-up-circle-outline" color="green" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Distance" icon="mdi-map-marker-distance"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home X" icon="mdi-home-circle-outline" :color="getAxisByLetter('X').homed ? 'primary' : 'warning'"></touch-nav-btn>
                        <touch-nav-btn @click="setDistanceIndex('X')" :label="axisStepIndex['Xlabel']" icon="mdi-map-marker-distance"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="X-" icon="mdi-chevron-left-circle-outline" color="red" ></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Home All" icon="mdi-home-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="X+" icon="mdi-chevron-right-circle-outline" color="red" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home Y" icon="mdi-home-circle-outline" :color="getAxisByLetter('Y').homed ? 'primary' : 'warning'"></touch-nav-btn>
                        <touch-nav-btn @click="setDistanceIndex('Y')" :label="axisStepIndex['Ylabel']" icon="mdi-map-marker-distance"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="Z-" icon="mdi-chevron-down-circle-outline" color="blue" ></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Y-" icon="mdi-chevron-down-circle-outline" color="green" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Z+" icon="mdi-chevron-up-circle-outline" color="blue" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home Z" icon="mdi-home-alert-circle-outline" :color="getAxisByLetter('Z').homed ? 'primary' : 'warning'"></touch-nav-btn>
                        <touch-nav-btn @click="setDistanceIndex('Z')" :label="axisStepIndex['Zlabel']" icon="mdi-map-marker-distance"></touch-nav-btn>
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
            axisStepIndex: {},
		}
    },
    created() {
        this.displayedAxes.forEach(axis => {
            this.$set(this.axisStepIndex, axis.letter, this.numMoveSteps-1);
            this.$set(this.axisStepIndex, axis.letter + 'label', this.moveSteps(axis.letter)[this.numMoveSteps-1]+'mm');
            //this.$set(this.axisStepIndex, axis.letter + 'homed')
        });
        console.log(this.displayedAxes);
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
        },
        getAxisByLetter(axisLetter) {
            return this.displayedAxes.filter(axis => axis.letter == axisLetter)[0];
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