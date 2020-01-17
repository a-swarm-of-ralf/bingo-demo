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
            <v-toolbar-title>Select Game</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
            
                <p>
                    Copy the <i>client id</i> and <i>secret id</i> from your spotify app. 
                    Follow the steps listed in
                    <a href="https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app">Register Your App</a> 
                    to create a new Spotify app on 
                    <a href="https://developer.spotify.com/">Spotify for Developers</a>.
                </p>

              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="secondary" @click="gameCreate">Create New Game</v-btn>
                <v-btn color="primary" @click="gamePlay">Play Current Game</v-btn>
              </v-card-actions>
            </v-card>
    `
}