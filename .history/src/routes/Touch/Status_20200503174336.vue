<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<job-progress></job-progress>
					<job-control-panel></job-control-panel>
					<z-babystep-panel></z-babystep-panel>
					<job-info-panel></job-info-panel>
					<speed-factor-panel></speed-factor-panel>
					<extrusion-factors-panel></extrusion-factors-panel>
					<job-estimations-panel></job-estimations-panel>
					<fans-panel></fans-panel>
					<speed-factor-panel></speed-factor-panel>
				</v-container>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {

}
</script>

<style>

</style>