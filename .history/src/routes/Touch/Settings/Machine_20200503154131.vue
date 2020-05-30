<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-btn class="ma-2" color="primary" :to="{ path: '/touch/settings' }" >
						<v-icon class="mr-1">mdi-arrow-left</v-icon> Go Back
					</v-btn>
					<settings-electronics-panel class="ma-2"></settings-electronics-panel>
					<settings-machine-panel class="ma-2"></settings-machine-panel>
					<settings-communication-panel class="ma-2"></settings-communication-panel>
					<settings-list-items-panel class="ma-2"></settings-list-items-panel>
					<settings-endstops-panel class="ma-2"></settings-endstops-panel>
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