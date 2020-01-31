export default {
    
  state: { 
      active: true,
      connected: false,
      ipAddress: 'pepper.local',
      ipAddressHistory: [ 'pepper.local', '192.168.188.28' ]
  },
  
  getters: {
  
  },

  mutations: {

    updateRobotIpAddress (state, ipAddress ) {
      state.ipAddress = ipAddress
      state.ipAddressHistory = _(state.ipAddressHistory).remove(ip => ip === ipAddress).concat(ipAddress).takeRight(10).value()
    }

  },

}
  