export default {

    data: () => ({

    }),

    methods: {

        ...Vuex.mapActions([ 'authorizedSpotify' ]),

        extractParams(path) {
            const params = _(path).split('&').map(p => p.split('=')).fromPairs().value()
            // console.log(JSON.stringify(params))
            return params
        }
    },

    created () {
        console.log(`Redirected from spotify with path: ${this.$route.path}`)
        const params = this.extractParams(this.$route.path)
        this.authorizedSpotify(params["/access_token"], params["token_type"], parseInt(params["expires_in"]))  
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title><v-icon x-large>fab fa-spotify</v-icon>Spotify Login Result</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <h2>Welcome back,</h2>
            <p>
                You have succesfully logged in to Spotify and Spotify has redirected you back to
                us. With this redirect we received aa access token. This token can be used to send
                requests to Spotify to perform actions as if you were doing them. We will use it to 
                access your playlists and play some songs later. 
            </p>
            <p>
                Note that the token is only valid for one hour. If you want to continue after one hour 
                you need to go back to the spotify setup and login again. This is a limitation of the 
                Implicit Grant Flow. If we want to have longer sessions we would need to use the 
                "Authorization Code Flow". this would allow use to refresh the token we received to
                have longer sessions. It also would require us to have a server that Spotify can send 
                requests to during the authorization process.
            </p>
            <p>
                Next we will need a host for our game. We will try to use a Pepper robot for this. If you 
                press "Next" below we will try to connect to the Pepper.
            </p>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" to="spotify-login">Back to Spotify Login</v-btn>
            <v-btn color="primary" to="pepper-connect">Next</v-btn>
        </v-card-actions>
    </v-card>
    `
}