import model from '../iuxe/model/index.js'


export default {
    data: () => ({
        show: true,
        snackbar: false,
        snackbarText: 'Hello, I am Fake Pepper!'
      }),

    computed: {
        ...Vuex.mapGetters([ 'userName' ])
    },

    methods: {
    },
    created () {
        this.snackbar = true    
    },
    template: `
    <v-bottom-sheet v-model="show" hide-overlay inset persistent :retain-focus="false">
        <v-card class="d-flex flex-row" flat tile>
            <v-card class="flex-grow-1" outlined tile>
                <v-toolbar color="secondary" dark flat dense>
                    <v-icon small>fas fa-robot</v-icon>&nbsp;<v-toolbar-title>Robot</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <p>
                        Hey, I am a fake pepper! Use me if you cannot use a real one.
                    </p>
                </v-card-text>
            </v-card>
            <v-card class="flex-grow-1" outlined tile v-if="!!userName">
                <v-toolbar color="secondary" dark flat dense>
                    <v-icon small>fab fa-spotify</v-icon>&nbsp;<v-toolbar-title>Music Player</v-toolbar-title>&nbsp;             
                    <v-chip small>
                        <v-avatar left><v-icon small>fas fa-user</v-icon></v-avatar>
                        {{userName}}
                    </v-chip>
                </v-toolbar>
                <v-card-text>
                    <p>
                        Hello {{userName}}
                    </p>
                </v-card-text>
            </v-card>
        </v-card>
    </v-bottom-sheet>
    `
}