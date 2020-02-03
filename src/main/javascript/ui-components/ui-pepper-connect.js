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

        ...Vuex.mapGetters([ 
            'RobotIpAddressHistory', 
            'RobotInjected', 
            'RobotInjectionState',
            'RobotConnected', 
            'RobotConnectionState',
        ]),

        RobotIpAddress: {
            get () {
                return this.$store.state.robot.ipAddress
            },
            set (value) {
                this.$store.commit('updateRobotIpAddress', value)
            }
        }
    },

    methods: {

        ...Vuex.mapActions([ 
            'connectPepperRobot', 
            'connectMockRobot', 
        ]),

        connect () {
            console.log(`[UI-Pepper-Connect] connecting to pepper.`)
            this.$store.dispatch('connectPepperRobot').then(() => {
                console.log(`[UI-Pepper-Connect] pepper connected.`)
                setTimeout(() => {
                    console.log(`[UI-Pepper-Connect] directing to /pepper-ready.`);
                    this.$router.push('/pepper-ready')
                }, 2000);
            }).catch(err => {
                console.log(`[UI-Pepper-Connect] error connecting pepper.`, err)
                this.$store.dispatch('showMessage', { type: 'error', message:'Error while connecting to Pepper' });    
            });
        },

        mock () {
            console.log(`[UI-Pepper-Connect] connecting to mock.`)
            this.$store.dispatch('connectMockRobot').then(() => {
                console.log(`[UI-Pepper-Connect] mock connected.`)
                setTimeout(() => {
                    console.log(`[UI-Pepper-Connect] directing to /pepper-ready.`);
                    this.$router.push('/pepper-ready')
                }, 1000);
            }).catch(err => {
                console.log(`[UI-Pepper-Connect] error connecting mock.`, err)
                this.$store.dispatch('showMessage', { type: 'error', message:'Error while connecting to mock robot' });    
            });
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
                <v-combobox v-model="RobotIpAddress" :items="RobotIpAddressHistory" label="Pepper IP Address"></v-combobox>
                <v-simple-table>
                    <template v-slot:default>
                    <tbody>
                        <tr>
                        <td>Qi script injection</td>
                        <td>
                            <v-icon x-large v-if="RobotInjectionState === 0" >fas fa-question</v-icon>
                            <v-progress-circular indeterminate v-if="RobotInjectionState === 1"></v-progress-circular>
                            <v-icon x-large color="primary" v-if="RobotInjectionState === 3">fas fa-check</v-icon>
                            <v-icon x-large color="error" v-if="RobotInjectionState === 2">fas fa-times</v-icon>
                        </td>
                        </tr>
                        <tr>
                        <td>Connecting to Pepper</td>
                        <td>
                            <v-icon x-large v-if="RobotConnectionState === 0" >fas fa-question</v-icon>
                            <v-progress-circular indeterminate v-if="RobotConnectionState === 1"></v-progress-circular>
                            <v-icon x-large color="primary" v-if="RobotConnectionState === 3">fas fa-check</v-icon>
                            <v-icon x-large color="error" v-if="RobotConnectionState === 2">fas fa-times</v-icon>
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