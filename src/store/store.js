import Vue from 'vue'

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'



var store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions

})

export default store