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
					<v-row justify="center">
						<v-col cols="2">
							<v-card class="ma-0" width="100%">
								<v-responsive class="pa-0" aspect-ratio="1">
									<div class="d-flex flex-column">
										<v-icon size="56px" >mdi-polymer</v-icon>
										Macros
									</div>
								</v-responsive>
							</v-card>
						</v-col>
						<v-col cols="2">
							<v-card class="ma-0" width="100%">
								<v-responsive class="pa-8" aspect-ratio="1">
									<v-icon x-large >mdi-polymer</v-icon>
									Macros
								</v-responsive>
							</v-card>
						</v-col>
						<v-col cols="2">
							<v-card class="ma-0" width="100%">
								<v-responsive class="pa-8" aspect-ratio="1">
									<v-icon x-large >mdi-polymer</v-icon>
									Macros
								</v-responsive>
							</v-card>
						</v-col>
						<v-col cols="2">
							<v-card class="ma-0" width="100%">
								<v-responsive class="pa-8" aspect-ratio="1">
									<v-icon x-large >mdi-polymer</v-icon>
									Macros
								</v-responsive>
							</v-card>
						</v-col>
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