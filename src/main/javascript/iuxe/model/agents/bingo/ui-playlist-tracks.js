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

    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat><v-toolbar-title>Agent {{AgentName}}: Show Tracks {{AgentOntology.playlistName}}</v-toolbar-title></v-toolbar>
        <v-card-text>
            <p>
                {{AgentOntology.message}}
            </p>
            <v-list>
                <v-list-item v-for="item in AgentOntology.tracks" :key="item.id"
                    @click="selectItem(item)">
                    <v-list-item-avatar><v-img :src="item.image.url"></v-img></v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.artist"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon :color="item.played ? 'green accent-4' : 'grey darken-2'">fas fa-check-circle</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="agentEmit('bingo/generate/cancel')">Back to Main</v-btn>
                <v-btn color="primary" @click="agentEmit('bingo/generate')">Generate Cards</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}