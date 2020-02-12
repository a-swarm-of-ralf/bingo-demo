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
        <v-toolbar color="primary" dark flat><v-toolbar-title>Agent {{AgentName}}: Cards</v-toolbar-title></v-toolbar>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in AgentOntology.cards" :key="card.title" :cols="4">
                    <v-card>
                        <v-container fluid>
                            <v-row no-gutters>
                                <v-col v-for="track in card.tracks" :key="track.id" :cols="4">
                                    <v-card>
                                        <v-img :src="track.image.url" class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.9)" height="100px">
                                            <v-card-title v-text="track.name" class="caption"></v-card-title>
                                            <v-card-subtitle v-text="track.artist" class="caption"></v-card-subtitle>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-actions>
                            <v-card-title v-text="card.title"></v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                            <v-icon>fas fa-search-plus</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="agentEmit('bingo/generated')">Accept and Play</v-btn>
        </v-card-actions>
    </v-card>
    `
}