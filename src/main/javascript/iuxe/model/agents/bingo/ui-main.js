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
        <v-toolbar color="primary" dark flat><v-toolbar-title>Agent {{AgentName}}</v-toolbar-title></v-toolbar>
        <v-card-text>
            <p>
                {{AgentOntology.message}}
            </p>
            <v-list>
                <v-list-item>
                    <v-list-item-icon><v-icon>fas fa-seedling</i></v-icon></v-list-item-icon>
                    <v-list-item-title>Seed</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{ AgentOntology.seed }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon><v-icon>fab fa-spotify</i></i></v-icon></v-list-item-icon>
                    <v-list-item-title>Playlist</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{ AgentOntology.playlistName }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="agentEmit('bingo/seed-select')">Generate Cards</v-btn>
                <v-btn color="primary" @click="agentEmit('bingo/play')">Play Bingo</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}