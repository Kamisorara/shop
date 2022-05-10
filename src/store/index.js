import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
  },
  getters: {
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token)
    },
    resetState: (state) => {
      state.token = "";//将token清空.
    },
  },
  actions: {
  },
  modules: {
  }
})
