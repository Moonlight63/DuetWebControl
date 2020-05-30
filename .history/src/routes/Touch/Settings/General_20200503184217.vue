<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0; overflow: auto">
				<v-container>
					<v-btn class="ma-2" color="primary" :to="{ path: '/touch/settings' }" >
						<v-icon class="mr-1">mdi-arrow-left</v-icon> Go Back
					</v-btn>
					<settings-about-panel class="ma-2"></settings-about-panel>
					<settings-apperance-panel class="ma-2"></settings-apperance-panel>
					<settings-notifications-panel class="ma-2"></settings-notifications-panel>
					<settings-general-panel class="ma-2"></settings-general-panel>
					<settings-webcam-panel class="ma-2"></settings-webcam-panel>
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