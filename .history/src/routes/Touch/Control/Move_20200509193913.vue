<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-chevron-up-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-chevron-left-circle-outline"></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-chevron-right-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-chevron-up-circle-outline"></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Back" icon="mdi-chevron-down-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-chevron-up-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
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