export default {

    data: () => ({ 
        slide: false,
        slideTimeoutId: 0,
        value: false,
        items: [ { title: 'Hello' }, { title: 'Robot' }]
    }),

    computed: {

        ...Vuex.mapGetters([ 
            'PlayerConnected', 
        ]),
    },

    methods: {

        ...Vuex.mapActions([ 
            'agentEmit', 
            'authorizeSpotify'
        ]),

        openSlide () {
            console.log('open robot slide!')
            clearTimeout(this.slideTimeoutId);
            this.slide = true;
            this.slideTimeoutId = setTimeout(() => this.closeSlide(), 6000);
        },

        closeSlide () {
            console.log('close robot slide!')
            clearTimeout(this.slideTimeoutId);
            this.slide = false;
        }

    },

    template: `
    <v-menu v-model="value" fixed style="top: 110px; left: 24px;" :close-on-click="true" :close-on-content-click="false" 
        offset-x offset-y>
      <template v-slot:activator="{ on }">
        <v-btn fixed top left style="top: 180px; left: 8px;" elevation="24" 
        :block="false" :color="PlayerConnected ? 'primary' : 'grey darken-2'" dark v-on="on" large
        fab tile><v-icon large>fab fa-spotify</v-icon></v-btn>

        <v-container class=" fill-height pa-0" style="position: fixed; left: 72px; top: 180px; width: 360px; height:64px;">
            <v-scroll-x-transition>
                <v-row no-gutters class="pa-0 grey darken-4" v-if="slide">
                    <v-col cols="2" align-self="center" class="pa-4">
                        <v-icon large color="secondary">fab fa-spotify</v-icon>
                    </v-col>
                    <v-col   align-self="center" class="pl-2">
                        Two hello hello hello hello hello hello hello
                    </v-col>
                    <v-col cols="3" align-self="center">
                        <v-btn color="secondary" text @click="closeSlide">Close</v-btn>
                    </v-col>
                </v-row>
            </v-scroll-x-transition>
        </v-container>

      </template>
      <v-card width="360px">
        <v-list two-line flat>
            <v-toolbar color="secondary" dark flat dense>
                <v-toolbar-title><v-icon>fab fa-spotify</v-icon> Player Settings</v-toolbar-title>
            </v-toolbar>
            <v-list-item @click="authorizeSpotify">
                <v-list-item-avatar>
                    <v-icon large :color="PlayerConnected ? 'primary' : 'grey darken-2'">fab fa-spotify</v-icon>
                </v-list-item-avatar>
  
                <v-list-item-content>
                    <v-list-item-title>Connect</v-list-item-title>
                    <v-list-item-subtitle>Redirect to Spotify Login</v-list-item-subtitle>
                </v-list-item-content>
  
                <v-list-item-icon>
                    <v-icon :color="PlayerConnected ? 'grey darken-2' : 'primary'" large>fas fa-external-link-alt</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-list-item @click="openSlide">
                <v-list-item-avatar>
                    <v-icon large color="grey darken-2">fab fa-spotify</v-icon>
                </v-list-item-avatar>
  
                <v-list-item-content>
                    <v-list-item-title>Playlist</v-list-item-title>
                    <v-list-item-subtitle>Send mock event with playlists</v-list-item-subtitle>
                </v-list-item-content>
  
                <v-list-item-icon>
                    <v-icon :color="PlayerConnected ? 'grey darken-2' : 'primary'" large>fas fa-circle</v-icon>
                </v-list-item-icon>
            </v-list-item>

        </v-list>
      </v-card>
    </v-menu>
    `
}