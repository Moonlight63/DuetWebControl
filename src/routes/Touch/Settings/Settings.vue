<template>
    <v-row>
		<v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
			<div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
				<v-container style="overflow: auto">
					<v-row justify="center">
						<touch-nav-btn to="/touch" label="Back" icon="mdi-arrow-left"></touch-nav-btn>
						<touch-nav-btn to="/touch/settings/machine" :label="$t('menu.settings.machine')" icon="mdi-cogs" color="success"></touch-nav-btn>
						<touch-nav-btn to="/touch/settings/general" :label="$t('menu.settings.general')" icon="mdi-tune" color="primary"></touch-nav-btn>
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

<style>

</style>