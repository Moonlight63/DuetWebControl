<template>
  <grid-panel v-bind="$attrs" class="d-flex flex-column pa-2">
      <v-btn @click="prev" :disabled="!hasPrev" class="align-stretch flex-column" style="height: 12.5%;">
          <autosize-text icon="mdi-chevron-up" class="fill-height flex-grow-1" />
      </v-btn>
      <v-window ref="window" vertical class="flex-grow-1" v-model="group">
          
          <v-window-item 
          v-for="n in itemsSplit.length" :key="n" 
          class="fill-height"
          style="padding-top: 1rem; padding-bottom: 1rem; "
          >
            <div class="fill-height" 
            style="display: grid; grid-template-columns: minmax(0, 1fr); grid-gap: 1rem"
            :style="'grid-template-rows: repeat(' + displayCount + ', minmax(0, 1fr));'"
            >
                <!-- {{ JSON.stringify(itemsSplit[n-1]) }} -->
                <!-- <grid-button :rows="1" :columns="1"
                class=""
                v-for="i in itemsSplit[n-1].length" :key="i" 
                :label="itemsSplit[n-1][i-1].title" :icon="itemsSplit[n-1][i-1].icon">
                    
                </grid-button> -->

                <v-list-item v-for="item in itemsSplit[n-1]" :key="item.name" two-line @click="itemClick(item)">
                    <autosize-text class="fill-height" innerClass="" :icon="item.isDirectory ? 'mdi-folder' : 'mdi-polymer'" :fitWidth="false" />
                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle v-if="item.lastModified != null">{{ item.lastModified.toLocaleString() }}</v-list-item-subtitle>
                        <!-- <v-list-item-subtitle>{{ item.lastModified }}</v-list-item-subtitle> -->
                    </v-list-item-content>
                </v-list-item>
            </div>
          </v-window-item>
          
          <!-- <grid-panel rows="1" columns="1" >
              Test Content
          </grid-panel>
          <grid-panel rows="1" columns="1" >
              Test Content
          </grid-panel>
          <grid-panel rows="1" columns="1" >
              Test Content
          </grid-panel> -->
      </v-window>
      <v-btn @click="next" :disabled="!hasNext" class="align-stretch flex-column" style="height: 12.5%;">
          <autosize-text icon="mdi-chevron-down" class="fill-height flex-grow-1" />
      </v-btn>
  </grid-panel>
</template>

<script>
/* eslint-disable no-unused-vars */

import { EventBus } from '../../scripts/PiScreenEvents'

import { DisconnectedError } from '../../../../utils/errors.js'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { isPrinting } from '../../../../store/machine/modelEnums.js'

import Path from '../../../../utils/path.js'
import Events from '../../../../utils/events.js'

export default {
    //display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: repeat(3, minmax(0, 1fr)); grid-gap: 1rem;
    
    computed: {
		...mapState('machine/cache', ['fileInfos']),
		...mapState('machine/model', {
			gCodesDirectory: state => state.directories.gCodes,
			lastJobFile: state => state.job.lastFileName,
			status: state => state.state.status,
			volumes: state => state.volumes
		}),
        ...mapState('settings', ['language']),
        ...mapState(['selectedMachine']),
		...mapGetters(['isConnected', 'uiFrozen']),
		
		isFile() {
			return (this.selection.length === 1) && !this.selection[0].isDirectory;
		},
		isPrinting() {
			return isPrinting(this.status);
		},
		loading: {
			get() { return this.loadingValue || this.fileinfoProgress !== -1; },
			set(value) { this.loadingValue = value; }
		},
		volume: {
			get() { return Path.getVolume(this.directory); },
			set(value) { this.directory = (value === Path.getVolume(this.gCodesDirectory)) ? this.gCodesDirectory : `${value}:`; }
        },
        
        itemsSplit() {
            return this.groupByN(this.displayCount, this.items);
        },

        isRootDirectory() { return Path.equals(this.directory, this.gCodesDirectory); }
	},
    
    data() {
        return {
            directory: Path.gCodes,
            // innerDirectory: this.directory,
            innerLoading: false,
            innerFilelist: [],

            group: 0,
            isMounted: false,
            hasNext: true,
            hasPrev: false,
            waitingForMachineModel: false,
            items: []
        }
    },
    props: {
        displayCount: {
            type: Number,
            default: 3
        },
        //items: Array,
    },
    mounted() {

        this.directory = this.gCodesDirectory;
        // this.innerDirectory = this.gCodesDirectory;

        console.log(this.gCodesDirectory);
        

        // Perform initial load
		if (this.isConnected) {
			const volume = Path.getVolume(this.directory);
			this.wasMounted = (volume >= 0) && (volume >= this.volumes.length) && this.volumes[volume].mounted;
			this.refresh();
		}

		// Keep track of file changes
        this.$root.$on(Events.filesOrDirectoriesChanged, this.filesOrDirectoriesChanged);
        this.$root.$on(Events.machineAdded, this.machineAdded);
        this.$root.$on(Events.machineModelUpdated, this.machineModelUpdated);

        this.isMounted = true;
        this.hasNext = this.$refs.window.hasNext;
        this.hasPrev = this.$refs.window.hasPrev;
        
        this.$watch(function() {return this.$refs.window.hasNext;}, function(value) { this.hasNext = value;});
        this.$watch(function() {return this.$refs.window.hasPrev;}, function(value) { this.hasPrev = value;});
    
        // this.items = [
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        //     {icon: 'mdi-polymer', name: 'Placeholder Content'},
        // ];
    
    },

    methods: {
        prev() {
            this.$refs.window.prev();
            // this.refresh();
        },
        next() {
            this.$refs.window.next();
            console.log(this.group);
            
            // this.refresh();
        },
        groupByN(n, data) {
            let result = [];
            for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
            return result;
        },

        // itemClick() {
        //     EventBus.$emit('gcodeview:show');
        // },

        async itemClick(item) {

			if (this.uiFrozen) {
				return;
            }

            if ((typeof item.callback) == "function" ) {
                item.callback();
            } else {

                const filename = Path.combine(this.directory, item.name);
                if (item.isDirectory) {
                    // this.directory = filename;
                    await this.loadDirectory(filename);
                } else if (!item.executing) {
                    item.executing = true;
                    try {
                        // await this.sendCode(`M98 P"${filename}"`);
                        EventBus.$emit('gcodeview:show', item, filename);
                    } catch (e) {
                        if (!(e instanceof DisconnectedError)) {
                            console.warn(e);
                        }
                    }
                    item.executing = false;
                }

            }

		},




        ...mapActions('machine', {
			machineDownload: 'download',
			machineMove: 'move',
			machineDelete: 'delete',
			getFileList: 'getFileList'
		}),
		...mapMutations('machine/cache', ['setSorting']),


        machineAdded(hostname) {
            console.log(hostname);
            this.waitingForMachineModel = true;
        },

        machineModelUpdated() {
            if (this.waitingForMachineModel) {
                this.refresh();
                this.waitingForMachineModel = false;
            }
        },

        filesOrDirectoriesChanged({ machine, files }) {
			// if (machine === this.selectedMachine && Path.filesAffectDirectory(files, this.directory)) {
            if (machine === this.selectedMachine) {
				// File or directory has been changed in the current directory
				this.refresh();
			}
		},


        async refresh() {
			await this.loadDirectory(this.directory);
		},
		async loadDirectory(directory) {
			if (!this.isConnected) {
				return;
            }

			// Update our path even if we're still busy loading
			this.directory = directory;
			if (this.innerLoading) {
				return;
			}

			// Make sure the current volume is actually available
            const volume = Path.getVolume(directory);
			if (volume < 0 || volume >= this.volumes.length || !this.volumes[volume].mounted) {
				// this.innerDirectory = (volume === 0) ? this.initialDirectory : `${volume}:`;
				this.innerFilelist = [];
				return;
			}

			// Load file list
            this.innerLoading = true;
            this.group = 0;
			try {
                const files = await this.getFileList(directory);

				// Create missing props if required
				// if (this.headers) {
				// 	files.forEach(function(item) {
				// 		this.headers.forEach(function(header) {
				// 			if (item[header.value] === undefined) {
				// 				Vue.set(item, header.value, undefined);
				// 			}
				// 		});
				// 	}, this);
				// }

				// Check if another directory was requested while files were being loaded
				if (directory !== this.directory) {
					// this.innerLoading = false;
					// this.loadDirectory(this.directory);
					return;
				}

				// Assign new file list
                this.innerFilelist = files;
                this.items = files.slice().sort((a,b) => b.lastModified - a.lastModified);

                if (!this.isRootDirectory) {
                    this.items.unshift({name: this.$t('list.baseFileList.goUp'), isDirectory: true, callback: this.goUp})
                }

				// this.innerValue = [];
				// this.$nextTick(function() {
				// 	this.$emit('directoryLoaded', directory);
                // });
                
                console.log(directory);
                console.log(this.innerFilelist);
                
			} catch (e) {
				if (!(e instanceof DisconnectedError)) {
					console.warn(e);
					this.$makeNotification('error', this.$t('error.filelistRequestFailed'), e.message);
				}
			}
			this.innerLoading = false;
        },
        
        async goUp() {
			await this.loadDirectory(Path.extractDirectory(this.directory));
		},

    },

    watch: {
		gCodesDirectory(to, from) {
			if (Path.equals(this.directory, from) || !Path.startsWith(this.directory, to)) {
				this.directory = to;
			}
		},
		lastJobFile(to) {
			if (Path.equals(this.directory, Path.extractDirectory(to))) {
				// this.$refs.filelist.refresh();
			}
        },
        
        // directory(to) {
		// 	// if (to !== this.innerDirectory) {
		// 		this.loadDirectory(to);
		// 	// }
		// },
		// innerDirectory(to) {
		// 	if (this.directory !== to) {
		// 		this.$emit('update:directory', to);
		// 	}
		// },
	}
}
</script>

<style scoped>
.v-btn {
    white-space: normal;
}
.v-btn >>> .v-btn__content {
    flex: auto;
}
.v-btn:hover:before {
    background-color: transparent !important
}
.v-window >>>.v-window__container {
    height: 100%;
}
</style>