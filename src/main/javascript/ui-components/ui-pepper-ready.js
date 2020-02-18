export default {
    data: () => ({
      }),
    methods: {
    },
    created () {
        
    },
    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title><v-icon x-large>fas fa-robot</v-icon> Pepper Ready</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <p>
                    Nice! That worked, we are now connected to Pepper!
                </p>
                <p>
                    Having both spotify and Pepper, it is now time to do something with it. 
                    This works with an agent. An agent defines the behaviour of our application 
                    and decides how and when actions are perfomed. You can see it as the brains 
                    of the application.
                </p>
                <p>
                    Click next to go to the agent load screen.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" to="agent-load" >Next</v-btn>
              </v-card-actions>
            </v-card>
    `
}