export default {

    data: () => ({

    }),

    methods: {
        
        emit () {

        }
    },
    
    created () {
        
    },
    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat><v-toolbar-title>Select Playlist</v-toolbar-title></v-toolbar>
        <v-card-text>
            <p>
                Bingo
            </p>
            <v-card-actions>
                <v-spacer />
                <v-btn color="secondary" @click="emit('prepare')">Prepare Bingo</v-btn>
                <v-btn color="primary" @click="emit('play')">Play Bingo</v-btn>
              </v-card-actions>
        </v-card-text>
    </v-card>
    `
}