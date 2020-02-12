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
            <v-card-actions>
                <v-btn color="secondary" @click="agentEmit('clicked/left')">Left</v-btn>
                <v-spacer />
                <v-btn color="primary" @click="agentEmit('clicked/right')">Right</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}