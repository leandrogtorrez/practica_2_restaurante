import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    baseUrl: process.env.VUE_APP_API_URL
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    }
  },
  getters: {
    getBaseUrl(state) {
      return state.baseUrl
    },
  }
})
