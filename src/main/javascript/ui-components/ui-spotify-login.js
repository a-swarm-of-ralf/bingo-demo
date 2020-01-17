import model from '../iuxe/model/index.js'


export default {
    data: () => ({
        clientId: '3848d012f506457997ebde1cb526ebcf',
        scope: [ 'user-follow-modify', 
            'user-follow-read', 
            'user-library-read', 
            'user-top-read', 
            'user-read-email'].join(' '),
        redirect_uri: `${location.protocol}//${location.hostname}`,
        messageVisible: false,
        messageText: '',
        messageTimeout: 6000
      }),
    methods: {
        redirectUri () {
            return window.location.protocol+'//'+
                window.location.hostname+
                (window.location.port?":"+window.location.port:"")+
                window.location.pathname
        },
        authorizationUrl (clientId, scope, redirectUri) {
            return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token`
        },
        messageShow (text) {
            this.messageText = text
            this.messageVisible = true
        },
        messageHide () {
            this.messageText = ''
            this.messageVisible = false
        },
        connectSpotify () {
            const url = this.authorizationUrl(this.clientId, this.scope, this.redirect_uri)
            console.log(`Redirecting to "${url}"`)
            window.location.href = url
        },
    },
    created () {
        this.redirect_uri = this.redirectUri()
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
                <v-snackbar v-model="messageVisible" :timeout="messageTimeout">
                    {{ messageText }}
                    <v-btn color="blue" text @click="messageVisible = false">Close</v-btn>
                </v-snackbar>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="connectSpotify">Connect Spotify</v-btn>
              </v-card-actions>
            </v-card>
    `
}