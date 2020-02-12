export default {

    data: () => ({
        rules: [
            value => !!value || 'Required.',
            value => !!parseInt(value) || 'Integers only.',
        ]
    }),

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

        updateSeed(value) {
            console.log('updateSeed', value);
            this.$store.dispatch('agentEmit', { name: 'bingo/seed-updated', args: [value] })    
        }
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat><v-toolbar-title>Agent {{AgentName}}: Select Seed</v-toolbar-title></v-toolbar>
        <v-card-text>
            <p>
                {{AgentOntology.message}} 
            </p>
            <v-text-field :rules="rules"
                :value="AgentOntology.seed" @input="updateSeed"
                prepend-icon="fas fa-seedling" label="Seed"></v-text-field>
            
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="agentEmit('bingo/generate/cancel')">Back to Main</v-btn>
                <v-btn color="primary" @click="agentEmit('bingo/seed-selected')">Select Seed and Continue</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}