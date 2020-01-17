import model from '../iuxe/model/index.js'


export default {
    data: () => ({
        numberOfCards: 6,
        rows: 3,
        cols: 3,
        playlist: '',
        messageVisible: false,
        messageText: '',
        messageTimeout: 6000
      }),
    methods: {
        messageShow (text) {
            this.messageText = text
            this.messageVisible = true
        },
        messageHide () {
            this.messageText = ''
            this.messageVisible = false
        },
        connectSpotify () {
            model.player.connectSpotify(this.clientId, this.secretId, this.scopes, this.redirect_uri).catch(err => {
                this.messageShow(`Error logging into spotify: ${err}`)
                console.log('Error loging into spotify', err)
            });
        },
        stubSpotify () {
            console.log(`Stubbing spotify`);
        },
        restore () {
            model.player.settings()
                .then(settings => {
                    this.clientId = settings.clientId || '3848d012f506457997ebde1cb526ebcf';
                    this.secretId = settings.secretId || '216e4d5ba034408d8c3d3113ecccbd1d';
                    this.scopes = settings.scopes || ['user-follow-modify', 'user-follow-read', 'user-library-read', 'user-top-read', 'user-read-email'];
                    this.redirect_uri = settings.redirect_uri || 'http://localhost:8080/#/spotify-redirect';
                }).catch(err => this.messageShow(`Error loading previous spotify settings: ${err}`))
        }
    },
    created () {
        this.restore()    
    },
    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title><v-icon x-large>fab fa-gamepad</v-icon> Game Config</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <p>
                    Set the thenumber of bingo cards to create and the dimensions of each card.
                </p>
                <v-form>
                    <v-text-field label="Number Of Cards" name="NumberOfCards" v-model="numberOfCards" type="text"/>
                    <v-text-field label="Number Of Rows" name="NumberOfRows" v-model="rows" type="text"/>
                    <v-text-field label="Number Of Columns" name="NumberOfColumns" v-model="cols" type="text"/>
                
                </v-form>
                <v-snackbar v-model="messageVisible" :timeout="messageTimeout">
                    {{ messageText }}
                    <v-btn color="blue" text @click="messageVisible = false">Close</v-btn>
                </v-snackbar>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="secondary" @click="stubSpotify">Use Spotify Stub</v-btn>
                <v-btn color="primary" @click="connectSpotify">Connect Spotify</v-btn>
              </v-card-actions>
            </v-card>
    `
}