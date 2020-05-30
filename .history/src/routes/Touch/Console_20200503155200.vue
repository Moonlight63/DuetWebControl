<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-btn class="ma-2" color="primary" :to="{ path: '/touch/settings' }" >
						<v-icon class="mr-1">mdi-arrow-left</v-icon> Go Back
					</v-btn>
					<event-list></event-list>
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