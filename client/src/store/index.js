import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:0,
    username:''
  },
  mutations: {
    increment(state){
      state.status++
    }
  },
  actions: {
  },
  modules: {
  }
})
