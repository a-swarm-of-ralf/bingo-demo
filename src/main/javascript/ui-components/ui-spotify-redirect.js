import model from '../iuxe/model/index.js'

export default {
    data: () => ({
        token: '',
        tokenType: '',
        expiresInStr: '',
        expiresIn: 0
      }),
    methods: {
        extractParams(path) {
            const params = _(path).split('&').map(p => p.split('=')).fromPairs().value()
            console.log(JSON.stringify(params))
            return params
        }
    },
    created () {
        console.log(`Redirected from spotify with path: ${this.$route.path}`)
        const params = this.extractParams(this.$route.path)
        this.token = params["/access_token"]
        this.tokenType = params["token_type"]
        this.expiresInStr = params["expires_in"]
        this.expiresIn = parseInt(params["expires_in"])

        model.player.authorizationToken(this.token, this.expiresIn)

        /*

        model.player.authorize(this.token, this.tokenType, this.expiresIn)
            .then(model.player.me)
            .then(user => {
                console.log('user:', user)
                user.playlists().then((playlistCollection) => {

                    console.log(`Iterate Playlists`)
                    _(playlistCollection).forEach((e) => {
                        console.log(`Playlist "${e.name}"`)
                    })
                    
                    console.log(`Search for playlist named "bingo"`)
                    const playlist = _.find(playlistCollection, (playlist) => playlist.name === "bingo")
                    
                    console.log(`Playlist named "bingo" was`, playlist)
                    console.log(`Playlist name "${playlist.name}"`)
                    console.log(`Playlist uri "${playlist.uri}"`)
                    console.log(`Playlist tracks "${playlist.tracks}"`)

                    console.log(`Iterating over playlist tracks`)
                    playlist.tracks.then(tracks => {
                        console.log(`Track resolved`, tracks)
                        _(tracks).forEach((track, i) => {
                            console.log(`Track ${i}: "${track.name}" by "${track.artists[0].name}"`, track)
                        })
                    });
                    
                    /*

                    console.log('Playlists', playlistCollection)
                    let PlaylistEntity = playlistCollection.first();
                    console.log('First Entity', PlaylistEntity)
            
                    PlaylistEntity.contains(['1258448899']).then(res => {
                        console.log(res)
                    });
            
                    PlaylistEntity.tracks.then(tracksCollection => {
                        let ArtistEntity = tracksCollection[0].artists[0];
                        ArtistEntity.albums().then(albumsCollection => {
                            console.log(albumsCollection);  //Wooo!!!
                        });
                    });

                    
                });
                
            })
            */

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
                For now the token we received is "{{token}}" and this will be valid 
                for {{expiresInStr}} minutes.
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