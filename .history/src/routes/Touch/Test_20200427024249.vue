<template>
    <v-row>
        <v-col class="d-flex flex-column" style="position: absolute; top: 0; bottom: 0;">
            <div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
                <v-toolbar class="flex-grow-0">
                    <directory-breadcrumbs v-model="directory"></directory-breadcrumbs>

                    <v-spacer></v-spacer>

                    <v-btn class="hidden-sm-and-down mr-3" :disabled="uiFrozen" @click="showNewFile = true">
                        <v-icon class="mr-1">mdi-file-plus</v-icon> {{ $t('button.newFile.caption') }}
                    </v-btn>
                    <v-btn class="hidden-sm-and-down mr-3" :disabled="uiFrozen" @click="showNewDirectory = true">
                        <v-icon class="mr-1">mdi-folder-plus</v-icon> {{ $t('button.newDirectory.caption') }}
                    </v-btn>
                    <v-btn class="hidden-sm-and-down mr-3" color="info" :loading="loading" :disabled="uiFrozen" @click="refresh">
                        <v-icon class="mr-1">mdi-refresh</v-icon> {{ $t('button.refresh.caption') }}
                    </v-btn>
                    <upload-btn class="hidden-sm-and-down" :directory="directory" target="macros" color="primary"></upload-btn>
                </v-toolbar>
                
                <div class="flex-grow-1" style="overflow: auto;">
                    <div>
                        Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
Bacon ipsum dolor amet brisket ribeye pork shoulder doner beef cow bresaola ham hock capicola kevin pig. Pork loin rump capicola, fatback spare ribs prosciutto leberkas. Biltong drumstick sausage swine pig. Drumstick spare ribs meatball shoulder venison frankfurter, landjaeger kevin swine pork chicken. Ribeye cupim tongue, doner drumstick jowl meatloaf pork.

Shoulder beef t-bone landjaeger ground round biltong. Pork belly spare ribs fatback venison. Pork loin jerky rump tail corned beef shankle tri-tip fatback picanha flank bacon sausage porchetta sirloin. Kevin turkey pastrami beef ribs, ribeye burgdoggen boudin capicola jerky salami shank. Corned beef turkey turducken strip steak. Fatback drumstick ham, doner jerky landjaeger flank shank turducken strip steak sausage filet mignon ball tip ham hock.

Biltong frankfurter corned beef, jowl picanha chicken shank pork loin jerky. Turkey spare ribs biltong doner, short loin brisket boudin alcatra tri-tip pork ball tip. Salami pork chop cow ribeye, corned beef meatloaf spare ribs t-bone shoulder. Swine ham hock strip steak, drumstick rump shoulder pork chicken pork chop salami short loin beef ribs alcatra hamburger. Jowl doner tri-tip cow ham meatloaf prosciutto landjaeger ground round pork belly turkey venison. Tri-tip brisket filet mignon tongue.

Sausage flank sirloin drumstick. Porchetta picanha frankfurter chuck, short loin pork belly jerky pork loin beef ribs prosciutto ball tip rump tail pig. Ham hock bresaola shoulder leberkas. Drumstick pork belly shank burgdoggen.

Swine kielbasa beef ribs, brisket meatloaf shankle spare ribs. Alcatra shankle rump, ham hock tri-tip pancetta chuck andouille prosciutto pork loin short loin kevin. Jowl ham hock short ribs chicken. Tenderloin landjaeger strip steak, brisket doner pork belly ham hock. Sirloin rump pork loin pig, tail pork chop burgdoggen turkey ball tip short ribs prosciutto ham tri-tip pork porchetta. Jerky strip steak shoulder, fatback biltong pig bresaola tenderloin corned beef boudin ribeye beef.
                    </div>
                    <!-- <touch-base-file-list ref="filelist" v-model="selection" :directory.sync="directory" :loading.sync="loading" sort-table="macros" @fileClicked="fileClicked" no-files-text="list.macro.noMacros">
                        <template #context-menu>
                            <v-list-item v-show="isFile" @click="runFile(selection[0].name)">
                                <v-icon class="mr-1">mdi-play</v-icon> {{ $t('list.macro.run') }}
                            </v-list-item>
                        </template>
                    </touch-base-file-list>

                    <v-speed-dial v-model="fab" bottom right fixed direction="top" transition="scale-transition" class="hidden-md-and-up">
                        <template #activator>
                            <v-btn v-model="fab" dark color="primary" fab>
                                <v-icon v-if="fab">mdi-close</v-icon>
                                <v-icon v-else>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-btn fab :disabled="uiFrozen" @click="showNewFile = true">
                            <v-icon class="mr-1">mdi-file-plus</v-icon>
                        </v-btn>

                        <v-btn fab :disabled="uiFrozen" @click="showNewDirectory = true">
                            <v-icon>mdi-folder-plus</v-icon>
                        </v-btn>

                        <v-btn fab color="info" :loading="loading" :disabled="uiFrozen" @click="refresh">
                            <v-icon>mdi-refresh</v-icon>
                        </v-btn>

                        <upload-btn fab dark :directory="directory" target="macros" color="primary">
                            <v-icon>mdi-cloud-upload</v-icon>
                        </upload-btn>
                    </v-speed-dial> -->

                    <!-- <new-directory-dialog :shown.sync="showNewDirectory" :directory="directory"></new-directory-dialog>
                    <new-file-dialog :shown.sync="showNewFile" :directory="directory"></new-file-dialog>
                    <confirm-dialog :shown.sync="runMacroDialog.shown" :title="runMacroDialog.title" :prompt="runMacroDialog.prompt" @confirmed="runFile(runMacroDialog.filename)"></confirm-dialog> -->
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
'use strict'

import { mapGetters, mapState, mapActions } from 'vuex'

import Path from '../../utils/path.js'

export default {
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine/model', {
			macrosDirectory: state => state.directories.macros
		}),
		isFile() { return (this.selection.length === 1) && !this.selection[0].isDirectory; }
	},
	data() {
		return {
			directory: Path.macros,
			loading: false,
			selection: [],
			runMacroDialog: {
				title: '',
				prompt: '',
				filename: '',
				shown: false
			},
			showNewDirectory: false,
			showNewFile: false,
			fab: false
		}
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		refresh() {
			this.$refs.filelist.refresh();
		},
		fileClicked(item) {
			this.runMacroDialog.title = this.$t('dialog.runMacro.title', [item.name]);
			this.runMacroDialog.prompt = this.$t('dialog.runMacro.prompt', [item.name]);
			this.runMacroDialog.filename = item.name;
			this.runMacroDialog.shown = true;
		},
		runFile(filename) {
			this.sendCode(`M98 P"${Path.combine(this.directory, filename)}"`);
		}
	},
	mounted() {
		this.directory = this.macrosDirectory;
	},
	watch: {
		macrosDirectory(to, from) {
			if (Path.equals(this.directory, from) || !Path.startsWith(this.directory, to)) {
				this.directory = to;
			}
		}
	}
}
</script>

<style>

</style>