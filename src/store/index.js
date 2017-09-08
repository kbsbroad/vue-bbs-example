import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
// import * as actions from './actions'

import post from './modules/post'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    post
  }
})

export default store
