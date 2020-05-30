<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
						<touch-nav-btn to="/touch/control/move" label="Move" icon="mdi-arrow-all" color="success"></touch-nav-btn>
						<touch-nav-btn to="/touch/control/tools" label="Tools" icon="mdi-printer-3d-nozzle-alert-outline" color="purple"></touch-nav-btn>
						<touch-nav-btn to="/touch/control/macros" label="Macros" icon="mdi-polymer" color="warning"></touch-nav-btn>
						<touch-nav-btn to="/touch/control/temp" label="Temperature" icon="mdi-thermometer-lines" color="primary"></touch-nav-btn>
					</v-row>
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