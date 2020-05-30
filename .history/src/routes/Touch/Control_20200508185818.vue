<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
						<touch-nav-btn to="/touch/move" label="Move" icon="mdi-arrow-all" color="success"></touch-nav-btn>
						<touch-nav-btn to="/touch/tools" label="Tools" icon="mdi-code-tags" color="purple"></touch-nav-btn>
						<touch-nav-btn to="/touch/macros" label="Macros" icon="mdi-information" color="warning"></touch-nav-btn>
						<touch-nav-btn to="/touch/temp" label="Temperature" icon="mdi-micro-sd" color="primary"></touch-nav-btn>
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