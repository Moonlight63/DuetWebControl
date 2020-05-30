<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<settings-about-panel></settings-about-panel>
					<settings-apperance-panel></settings-apperance-panel>
					<settings-notifications-panel></settings-notifications-panel>
					<settings-general-panel></settings-general-panel>
					<settings-webcam-panel></settings-webcam-panel>
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