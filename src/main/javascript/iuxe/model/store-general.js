export default {

  state: {
    message: {
        visible: false,
        type: 'info',
        text: ''
    }
  },

  getters: {

    MessageVisible (state) { return state.message.visible; },
    MessageText (state) { return state.message.text; },
    MessageType (state) { return state.message.type; },

  },

  mutations: {

    updateMessage(state, type, text, visible) {
      state.message = { visible, type, text }
    },
  },

  actions: {

    showMessage({ commit }, { type, text }) {
      console.log(`[StoreGeneral] showing message...`)
      return commit('updateMessage', { type, text, visible: true });
    },

    hideMessage({ commit }) {
        console.log(`[StoreGeneral] showing message...`)
        return commit('updateMessage', { type: 'info', text: '', visible: false });
      },

  },

}
