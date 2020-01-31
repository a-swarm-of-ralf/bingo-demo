import robot from '../../api/robot/robot.js'

export default {

  state: {
    name: '',
    active: true,
    connected: false,
    ipAddress: 'pepper.local',
    ipAddressHistory: ['pepper.local', '192.168.188.28']
  },

  getters: {

  },

  mutations: {

    updateRobotIpAddress(state, ipAddress) {
      state.ipAddress = ipAddress
      state.ipAddressHistory = _(state.ipAddressHistory).remove(ip => ip === ipAddress).concat(ipAddress).takeRight(10).value()
    }

  },

  actions: {


    connectPepperRobot({ commit, state }) {
      console.log(`[StoreRobot] connecting pepper...`)
      robot.loadImpl('pepper')  
    },


    connectMockRobot({ commit, state }) {
      console.log(`[StoreRobot] connecting mock robot...`)
      robot.loadImpl('mock')  
    },

  },

}
