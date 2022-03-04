import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import history from './modules/history'
import getters from './getters'

//数据持久化存储
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    history
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
  plugins: [persistedState({
    // storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的count
        history: val.history
      }
    }
  })]
})
