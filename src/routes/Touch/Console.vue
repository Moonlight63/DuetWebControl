<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0; overflow: auto">
				<v-container>
					<v-row class="ma-0 mb-3 align-center">
						<v-btn class="" color="primary" :to="{ path: '/touch/' }" >
							<v-icon class="mr-1">mdi-arrow-left</v-icon> Go Back
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn class="" color="primary" @click="codeDialog.shown = true" >
							<v-icon class="mr-1">mdi-send</v-icon> Send G-Code...
						</v-btn>
					</v-row>
					<event-list></event-list>
				</v-container>
			</div>
		</v-col>
		<touch-code-input :shown.sync="codeDialog.shown" ></touch-code-input>
	</v-row>
</template>

<script>
export default {

	data() {
		return {
			codeDialog: {
				shown: false
			}
		}
	}

}
</script>

<style>

</style>