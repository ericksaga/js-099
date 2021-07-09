import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    updateUsername(state, newUsername) {
      state.username = newUsername
    }
  },
  actions: {
  },
  modules: {
  }
})
