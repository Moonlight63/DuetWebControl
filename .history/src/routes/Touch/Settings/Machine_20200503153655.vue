<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<settings-electronics-panel></settings-electronics-panel>
					<settings-machine-panel></settings-machine-panel>
					<settings-communication-panel></settings-communication-panel>
					<settings-list-items-panel></settings-list-items-panel>
					<settings-endstops-panel></settings-endstops-panel>
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