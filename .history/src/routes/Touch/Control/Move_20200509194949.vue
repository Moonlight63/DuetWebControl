<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch/control" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Y +" icon="mdi-chevron-up-circle-outline" color="green" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Distance" icon="mdi-arrow-left"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home X" icon="mdi-home-circle-outline"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="X-" icon="mdi-chevron-left-circle-outline" color="red" ></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Home All" icon="mdi-home-circle-outline"></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="X+" icon="mdi-chevron-right-circle-outline" color="red" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home Y" icon="mdi-home-circle-outline"></touch-nav-btn>
					</v-row>
                    <v-row justify="center">
                        <touch-nav-btn to="/touch/control" label="Z -" icon="mdi-chevron-down-circle-outline" color="blue" ></touch-nav-btn>
						<touch-nav-btn to="/touch/control" label="Y -" icon="mdi-chevron-down-circle-outline" color="green" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Z +" icon="mdi-chevron-up-circle-outline" color="blue" ></touch-nav-btn>
                        <touch-nav-btn to="/touch/control" label="Home Z" icon="mdi-home-circle-outline"></touch-nav-btn>
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