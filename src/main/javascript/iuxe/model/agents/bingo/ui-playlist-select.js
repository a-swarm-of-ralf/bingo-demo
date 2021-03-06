export default {

    computed: {
        ...Vuex.mapGetters([ 
            'AgentName', 
            'AgentOntology', 
            'AgentRunning'
        ]),
    },

    methods: {

        ...Vuex.mapActions([ 
            'agentRun', 
            'agentEmit', 
        ]),

        selectItem (item) {
            console.log('selectItem item', item)
            console.log('selectItem name', item.name)
            console.log('selectItem id  ', item.id)
            console.log('selectItem uri ', item.uri)
            this.agentEmit({ name: 'bingo/playlist-selected', args: [item] })
        }

    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat><v-toolbar-title>Agent {{AgentName}}: Select Playlist</v-toolbar-title></v-toolbar>
        <v-card-text>
            <p>
                {{AgentOntology.message}}
            </p>
            <p>
                Selection {{AgentOntology.playlistName}} ({{ AgentOntology.playlistId }})
            </p>
            <v-list>
                <v-list-item v-for="item in AgentOntology.playlists" :key="item.id"
                    @click="selectItem(item)">
                    <v-list-item-avatar><v-img :src="item.images[0].url"></v-img></v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon :color="item.name ===  AgentOntology.playlistName ? 'green accent-4' : 'grey'">fas fa-play-circle</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="agentEmit('bingo/generate/cancel')">Back to Main</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}