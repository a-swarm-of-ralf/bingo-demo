export default {
    data: () => ({ }),

    computed: {
        ...Vuex.mapGetters([ 
            'AgentName', 
            'AgentOntology', 
            'AgentRunning',
            'AgentList'
        ]),
    },

    methods: {

        ...Vuex.mapActions([ 
            'agentRun', 
            'agentEmit', 
        ]),

    },

    created () {
        this.$store.commit('updateAgentList');
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Load Agent</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                Select one of the following agents to run.
            </v-card-text>
            <v-list>
                <v-list-item v-for="item in AgentList" :key="item" @click="agentRun(item)">

                <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon v-if="item ===  AgentName" >fas fa-stop-circle</v-icon>
                    <v-icon v-if="item !==  AgentName" >fas fa-play-circle</v-icon>
                </v-list-item-icon>
                </v-list-item>
            </v-list>
            </v-card>
    `
}