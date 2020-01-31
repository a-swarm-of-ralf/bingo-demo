import model from '../iuxe/model/index.js'


export default {

    data: () => ({
        host: '192.168.188.28',
        hostHistory: [ 'pepper.local', "192.168.188.28" ],
        injectionUnknown: true,
        injectionBusy: false,
        injectionSuccess: false,
        injectionError: false,
        connectionUnknown: true,
        connectionBusy: false,
        connectionSuccess: false,
        connectionError: false,
    }),

    computed: {

        ipAddressHistory: {
            get () {
                return  this.$store.state.robot.ipAddressHistory
            }
        },

        ipAddress: {
            get () {
                return this.$store.state.robot.ipAddress
            },
            set (value) {
                this.$store.commit('updateRobotIpAddress', value)
            }
        }
    },

    methods: {
        inject () {
            console.log(`[UI-Pepper-Setup] Injecting Qi Script...`);
            this.injectionUnknown = false;
            this.injectionBusy = true;
            this.injectionSuccess = false;
            this.injectionError = false;
            return model.robot.inject(this.host)
                .then(() => {
                    console.log(`[UI-Pepper-Setup] Injecting qi script complete`);
                    this.injectionUnknown = false;
                    this.injectionBusy = false;
                    this.injectionSuccess = true;
                    this.injectionError = false;    
                })
                .catch(err => {
                    console.log(`[UI-Pepper-Setup] Error injecting qi script`, err);
                    this.injectionUnknown = false;
                    this.injectionBusy = false;
                    this.injectionSuccess = false;
                    this.injectionError = true;
                })
        },
        connect () {
            console.log(`[UI-Pepper-Setup] Injecting script and establishing connection...`);
            this.inject().then(() => {
                if (this.injectionSuccess){
                    this.connectionUnknown = false;
                    this.connectionBusy = true;
                    this.connectionSuccess = false;
                    this.connectionError = false; 

                    console.log(`[UI-Pepper-Setup] Connecting to pepper`);
                    model.robot.connect(this.host)
                        .then(() => {
                            console.log(`[UI-Pepper-Setup] Connection established`);
                            this.connectionUnknown = false;
                            this.connectionBusy = false;
                            this.connectionSuccess = true;
                            this.connectionError = false;

                            model.robot.reactToTouch()
                            setTimeout(() => this.$router.push({ name: 'app-load' }) , 2000);
                        })
                        .catch(err => {
                            console.log(`[UI-Pepper-Setup] Error connection to pepper`, err);
                            this.connectionUnknown = false;
                            this.connectionBusy = false;
                            this.connectionSuccess = false;
                            this.connectionError = true;
                        })
                } else {
                    this.connectionUnknown = true;
                    this.connectionBusy = false;
                    this.connectionSuccess = false;
                    this.connectionError = false;    
                }
            })
        },
        save () {

        },
        mock () {
            model.robot.mock()
            this.$router.push('/agent-load')
        }
    },
    created () {
        
    },
    template: `
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title><v-icon x-large>fas fa-robot</v-icon> Pepper Setup</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <h2>Welcome,</h2>
                <p>
                    Next we'll need to connect to a pepper robot as the physical body of our ePal. This 
                    conenction consist of two parts. First the script need to be loaded and secondly we
                    need to establish a connection. To perform these steps we'll need the ip address of
                    our robot.
                </p>
                <p>
                    Pepper will say her ip address when you press on the button underneath the tablet. 
                    Please fill in this address in the box below. 
                </p>
                <v-form>
                <v-combobox v-model="ipAddress" :items="ipAddressHistory" label="Pepper IP Address"></v-combobox>
                <v-simple-table>
                    <template v-slot:default>
                    <tbody>
                        <tr>
                        <td>Qi script injection</td>
                        <td>
                            <v-icon x-large v-if="injectionUnknown" >fas fa-question</v-icon>
                            <v-progress-circular indeterminate v-if="injectionBusy"></v-progress-circular>
                            <v-icon x-large color="primary" v-if="injectionSuccess">fas fa-check</v-icon>
                            <v-icon x-large color="error" v-if="injectionError">fas fa-times</v-icon>
                        </td>
                        </tr>
                        <tr>
                        <td>Connecting to Pepper</td>
                        <td>
                            <v-icon x-large v-if="connectionUnknown" >fas fa-question</v-icon>
                            <v-progress-circular indeterminate v-if="connectionBusy"></v-progress-circular>
                            <v-icon x-large color="primary" v-if="connectionSuccess">fas fa-check</v-icon>
                            <v-icon x-large color="error" v-if="connectionError">fas fa-times</v-icon>
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="secondary" @click="mock">Use Mock Robot</v-btn>
                <v-btn color="primary" @click="connect" >Connect Pepper</v-btn>
              </v-card-actions>
            </v-card>
    `
}