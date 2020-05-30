<template>
	<v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
						<touch-nav-btn to="/touch/files/jobs" :label="$t('menu.files.jobs')" icon="mdi-play" color="success"></touch-nav-btn>
						<touch-nav-btn to="/touch/files/macros" :label="$t('menu.files.macros')" icon="mdi-polymer" color="primary"></touch-nav-btn>
						<touch-nav-btn to="/touch/files/filaments" :label="$t('menu.files.filaments')" icon="mdi-radiobox-marked" color="error"></touch-nav-btn>
						<touch-nav-btn to="/touch/files/system" :label="$t('menu.files.system') " icon="mdi-format-list-numbered" color="warning"></touch-nav-btn>
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