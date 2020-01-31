export default {
    
    data: () => ({

    }),

    methods: {
        ...Vuex.mapActions([ 'authorizeSpotify' ])
    },

    created () {
        
    },

    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title><v-icon x-large>fab fa-spotify</v-icon> Spotify Setup</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <h2>Welcome,</h2>
                <p>
                    First we wil need to setup Spotify so we can access your playlists and play songs.
                    To this end we will redirect you to the Spotify website. You will be asked to login.
                    After the login Spotify will redirect you back to this site.
                </p>
                <p>
                    If you are interested how this works, we are using an authorization method Spotify refers 
                    to as "Implicit Grant Flow". You can find more information about it at 
                    <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow">
                    Spotify for Developers</a>.
                </p>
                <p>
                    So when you are ready click the "Connect to Spotify" button to go to the spotify 
                    website and we'll see you back in a bit.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="authorizeSpotify">Connect Spotify</v-btn>
              </v-card-actions>
            </v-card>
    `
}