export default {

    computed: {
        ...Vuex.mapGetters([ 
            'AgentOntology', 
        ]),

    },

    methods: {
        ...Vuex.mapActions([ 
            'agentEmit', 
        ]),
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat><v-toolbar-title>Agent {{AgentOntology.chapter}}</v-toolbar-title></v-toolbar>
        <v-img 
            v-if="!!AgentOntology.currentTrack" 
            :src="AgentOntology.currentTrack.image.url" class="white--text align-end" height="400px">
            <v-card-title v-text="AgentOntology.currentTrack.name" ></v-card-title>
            <v-card-subtitle v-text="AgentOntology.currentTrack.artist"></v-card-subtitle>
        </v-img>
        <v-card-text>
            <p>Now {{AgentOntology.doing}}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="agentEmit('bingo/call-bingo')">Call Bingo!</v-btn>
            <v-btn color="primary" @click="agentEmit('bingo/continue')">Continue Playing</v-btn>
        </v-card-actions>

    </v-card>
    `
}