export default {
    data: () => ({ }),

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

    created () {
        
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Load Agent</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <p>
                    So 
                </p>
                <p>
                    Having both spotify and Pepper, it is now time to do something with it. We can 
                    run soming called an app to perfom perform teh actual logic of doing things. An
                    application is basicly a continues loop consiting of three steps.
                </p>
                <p>
                    Curently there is only one app, the bingo app. You can press next to load this app.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="agentRun('test')" >Run Test</v-btn>
                <v-btn color="primary" @click="agentRun('bingo')" >Run Bingo</v-btn>
              </v-card-actions>
            </v-card>
    `
}