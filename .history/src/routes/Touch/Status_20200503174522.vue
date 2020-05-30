<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<job-progress></job-progress>
					<v-row class="ma-0 align-stretch">
						<v-col cols="6">
							<job-info-panel></job-info-panel>
						</v-col>
						<v-col cols="6">	
							<job-control-panel></job-control-panel>
						</v-col>
					</v-row>
					<z-babystep-panel></z-babystep-panel>
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