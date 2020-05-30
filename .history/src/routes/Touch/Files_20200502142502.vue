<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="space-around" align="stretch">
						<v-card class="ma-3 pa-8 justify-self" justify-self="start">
							Content
						</v-card>
						<v-spacer></v-spacer>
						<v-card class="ma-3 pa-8">
							Content
						</v-card>
					</v-row>
					<v-row justify="center" align="stretch">
						<v-card class="ma-3 pa-8">
							<v-icon>mdi-polymer</v-icon>
						</v-card>
						<v-card class="ma-3 pa-8">
							Content
						</v-card>
						<v-card class="ma-3 pa-8">
							Content
						</v-card>
						<v-card class="ma-3 pa-8">
							Content
						</v-card>
						
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