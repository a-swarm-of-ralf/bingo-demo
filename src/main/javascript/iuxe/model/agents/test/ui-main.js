import agents from '../../agents.js'

export default {

    data: () => ({
        message: 'Hello there!'
    }),

    methods: {
        
        emit (name) {
            agents.emit(name, {});
        }
    },
    
    created () {
        agents.on('web.update', (pairs) => { 
            console.log(`[ui-main] web.update ("${pairs.message}")`)
            this.message = pairs.message; 
        })    
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat><v-toolbar-title>Test</v-toolbar-title></v-toolbar>
        <v-card-text>
            <p>
                {{message}}
            </p>
            <v-card-actions>
                <v-btn color="secondary" @click="emit('clicked/left')">Left</v-btn>
                <v-spacer />
                <v-btn color="primary" @click="emit('clicked/right')">Right</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}