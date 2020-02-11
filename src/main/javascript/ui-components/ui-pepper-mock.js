export default {
    data: () => ({ 
        sheetVisible: true
    }),

    computed: {
        ...Vuex.mapGetters([ 
            'MessageVisible', 
            'MessageType', 
            'MessageText',
            'RobotConnectionState',
            'userName',
            'RobotName',
        ])
    },

    methods: {
        hideMessage () {
            this.$store.dispatch('hideMessage');
        }
    },

    created () { },

    template: `
    <v-bottom-sheet v-model="sheetVisible" hide-overlay inset persistent :retain-focus="false">
        <v-card class="d-flex flex-row" flat tile>
            <v-card class="flex-grow-1" outlined tile v-if="RobotConnectionState > 1">
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
            <v-snackbar v-model="MessageVisible" bottom right>
                {{ MessageText }}
                <v-btn color="primary" text @click="hideMessage">Close</v-btn>
            </v-snackbar>
        </v-card>
    </v-bottom-sheet>
    `
}