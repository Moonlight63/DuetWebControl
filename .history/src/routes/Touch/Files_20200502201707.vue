<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn label="back" icon="mdi-arrow-left"></touch-nav-btn>
						<v-col cols="6" sm="3" md="2" xl="1">
							<v-responsive aspect-ratio="1">
								<v-btn class="ma-0" width="100%" height="100%">
									<div class="d-flex flex-column text-center justify-center fill-height">
										<v-icon size="56px" class="mb-3">mdi-arrow-left</v-icon>
										Back
									</div>
								</v-btn>
							</v-responsive>
						</v-col>
						<v-col cols="6" sm="3" md="2" xl="1">
							<v-responsive aspect-ratio="1">
								<v-btn class="ma-0" width="100%" height="100%">
									<div class="d-flex flex-column text-center justify-center fill-height">
										<v-icon size="56px" class="mb-3" color="success">mdi-play</v-icon>
										{{ $t('menu.files.jobs') }}
									</div>
								</v-btn>
							</v-responsive>
						</v-col>
						<v-col cols="6" sm="3" md="2" xl="1">
							<v-responsive aspect-ratio="1">
								<v-btn class="ma-0" width="100%" height="100%">
									<div class="d-flex flex-column text-center justify-center fill-height">
										<v-icon size="56px" class="mb-3" color="primary">mdi-polymer</v-icon>
										{{ $t('menu.files.macros') }}
									</div>
								</v-btn>
							</v-responsive>
						</v-col>
						<v-col cols="6" sm="3" md="2" xl="1">
							<v-responsive aspect-ratio="1">
								<v-btn class="ma-0" width="100%" height="100%">
									<div class="d-flex flex-column text-center justify-center fill-height">
										<v-icon size="56px" class="mb-3" color="error">mdi-radiobox-marked</v-icon>
										{{ $t('menu.files.filaments') }}
									</div>
								</v-btn>
							</v-responsive>
						</v-col>
						<v-col cols="6" sm="3" md="2" xl="1">
							<v-responsive aspect-ratio="1">
								<v-btn class="ma-0" width="100%" height="100%">
									<div class="d-flex flex-column text-center justify-center fill-height">
										<v-icon size="56px" class="mb-3" color="warning">mdi-format-list-numbered</v-icon>
										{{ $t('menu.files.system') }}
									</div>
								</v-btn>
							</v-responsive>
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