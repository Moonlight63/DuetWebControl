<template>
	<v-row>
		<v-col cols="12" class="pt-1">
			<code-input solo></code-input>
		</v-col>
		<v-col cols="12">
			<v-row>
				<v-col sm="8" md="8" lg="9" xl="9">
					<event-list></event-list>
				</v-col>
				<v-col sm="4" md="4" lg="3" xl="3">
					<macro-list></macro-list>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>
