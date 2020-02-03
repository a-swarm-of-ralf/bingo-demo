import robot from '../../api/robot/robot.js'

export default {

  state: {
    name: '',
    injectionState: 0,  // 0 initial value, 1 trying, 2 failed, 3 success
    connectionState: 0,  // 0 initial value, 1 trying, 2 failed, 3 success

    ipAddress: 'pepper.local',
    ipAddressHistory: ['pepper.local', '192.168.188.28']
  },

  getters: {

    RobotIpAddress (state) { return state.ipAddress; },
    RobotIpAddressHistory (state) { return state.ipAddressHistory; },

    RobotInjectionState (state) { return state.injectionState; },
    RobotConnectionState (state) { return state.connectionState; },

    RobotInjected (state) { return state.injectionState === 3; },
    RobotConnected (state) { return state.connectionState === 3; },

    RobotName (state) { return state.name; },
    

  },

  mutations: {

    updateRobotIpAddress(state, ipAddress) {
      state.ipAddress = ipAddress
      state.ipAddressHistory = _(state.ipAddressHistory).remove(ip => ip === ipAddress).concat(ipAddress).takeRight(10).value()
    },

    updateRobotConnected(state, bool) {
      state.connectionState = bool ? 3 : 4;
    },

    updateRobotInjected(state, bool) {
      state.injectionState = bool ? 3 : 4;
    },

    updateRobotName(state, name) {
      state.name = name;
    }

  },

  actions: {

    connectPepperRobot({ commit, state }) {
      console.log(`[StoreRobot] connecting pepper...`)
      robot.loadImpl('pepper');
      robot.on('injected', bool => commit('updateRobotInjected', bool))
      robot.on('connected', bool => commit('updateRobotConnected', bool))
      return robot.connect(state.ipAddress)
    },


    connectMockRobot({ commit, state }) {
      console.log(`[StoreRobot] connecting mock robot...`)
      robot.loadImpl('mock');
      robot.on('injected', bool => commit('updateRobotInjected', bool))
      robot.on('connected', bool => commit('updateRobotConnected', bool))
      return robot.connect(state.ipAddress).then((v) => {
        console.log(`[StoreRobot] connection had result ${v}`)
        return v;
      })
    },

    RobotCall({ dispatch }, method, args) {
      console.log(`[StoreRobot] Calling ${method}()...`)
      
      if (!robot[method]) {
          console.log(`[StoreRobot] Error: Robot has no method "${method}".`)
          return Promise.reject({code: 'robot-unknown-method', message: `Api "robot" is has no method ${method}.` })
      }

      console.log(`[StoreRobot] Calling ${method}()...`)
      return robot[method](...args).then(result => {
          console.log(`[StoreRobot] ${method}() called.`)
          return dispatch('AgentEmitEvent', { name: `robot.${method}`, args: [result] });
      });    
  },

  },

}
