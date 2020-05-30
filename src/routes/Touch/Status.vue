<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0; overflow: auto">
				<v-container>
					<job-progress></job-progress>
					<v-row class="ma-0 align-stretch">
						<touch-nav-btn to="/touch" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
						<v-col >	
							<job-estimations-panel class="fill-height"></job-estimations-panel>
						</v-col>
					</v-row>
					<v-row class="ma-0 align-stretch">
						<v-col cols="6">
							<job-info-panel class="fill-height"></job-info-panel>
						</v-col>
						<v-col cols="6">	
							<job-control-panel class="fill-height"></job-control-panel>
						</v-col>
					</v-row>
					<v-row class="ma-0 align-stretch">
						<v-col cols="6">
							<z-babystep-panel class="fill-height"></z-babystep-panel>
						</v-col>
						<v-col cols="6">	
							<speed-factor-panel class="fill-height"></speed-factor-panel>
						</v-col>
					</v-row>
					<v-row class="ma-0 align-stretch">
						<v-col cols="6">
							<fans-panel class="fill-height"></fans-panel>
						</v-col>
						<v-col cols="6">	
							<extrusion-factors-panel class="fill-height"></extrusion-factors-panel>
						</v-col>
					</v-row>
					<layer-chart class="ma-3 chart-height-limit"></layer-chart>
					<job-data-panel class="ma-3 mt-6"></job-data-panel>
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