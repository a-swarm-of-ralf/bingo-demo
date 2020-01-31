import agents from '../iuxe/model/agents.js'

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
            <v-toolbar-title>Load App</v-toolbar-title>
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
                <ol>
                    <li><b>Believe</b> The beleive step is about updating the mental model. In this step events
                    are received and examined to build a view of the world. 
                    </li>
                    <li><b>Plan</b> Here high level goals are determined and plans made.
                    </li>
                    <li><b>Plan</b> An finaly a plan is executed, or at least a part of it. Most plans consist of
                    several steps sometimes called intents, which are executed step by step.
                    </li>
                </ol>
                </p>
                <p>
                    Curently there is only one app, the bingo app. You can press next to load this app.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" to="agent-load" >Next</v-btn>
              </v-card-actions>
            </v-card>
    `
}