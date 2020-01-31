import Robot from './iuxe/model/store-robot.js'
import Player from './iuxe/model/store-player.js'


const store = new Vuex.Store({
    modules: {
      robot: Robot,
      player: Player
    }
});


export default store;