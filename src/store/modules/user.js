import * as userApi from '@/api/user'
import * as type from '../types'
import { getCookie } from '@/utils/cookie'

const state = {
  loginUser: getCookie('username')
}

const mutations = {
  [type.COMMIT_LOGIN](state, username) {
    state.loginUser = username
  },
  [type.COMMIT_LOGOUT](state) {
    state.loginUser = ''
  }
}

const actions = {
  [type.LOGIN]({ commit }, { username, password }) {
    return userApi.login(username, password)
      .then(() => {
        commit(type.COMMIT_LOGIN, getCookie('username'))
        return true
      })
  },
  [type.LOGOUT]({ commit }) {
    return userApi.logout()
      .then(() => {
        commit(type.COMMIT_LOGOUT)
      })
  },
  [type.ADD_USER](context, payload) {
    return userApi.addUser(payload)
  },
  [type.FETCH_USER](context, username) {
    return userApi.getUser(username)
  },
  [type.UPDATE_USER](context, payload) {
    return userApi.updateUser(payload.username, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
