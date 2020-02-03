import Robot from './iuxe/model/store-robot.js'
import Player from './iuxe/model/store-player.js'
import General from './iuxe/model/store-general.js'
import Agent from './iuxe/model/store-agent.js'


const store = new Vuex.Store({
    modules: {
      robot: Robot,
      player: Player,
      agent: Agent,
      general: General
    }
});

store.watch(state => {
  console.log(`[Store] State fields: [ ${_(state).keys().join(', ')} ].`);
  return state.agent.events
}, (newVal, oldVal) => {
  console.log('[Store] agent.events changed: ', newVal);

  if (newVal && newVal.length && newVal.length > 0) {
    console.log(`[Store] Event queue has ${newVal.length} entries.`);
    store.dispatch('AgentHandleEvent', newVal)
  } else if (newVal && newVal.length < 1) {
    console.log('[Store] Event queue is now empty.');
  }

});


export default store;