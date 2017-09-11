import * as postApi from '@/api/post'
import * as type from '../types'

const state = {
}

const mutations = {
}

const actions = {
  [type.FETCH_POSTS]({ commit }, options = { page: 1, size: 10, sort: 'createAt', direction: -1 }) {
    return postApi.getPosts(options)
  },
  [type.FETCH_POST](context, id) {
    return postApi.getPost(id)
  },
  [type.ADD_POST](context, payload) {
    return postApi.createPost(payload)
  },
  [type.UPDATE_POST](context, payload) {
    return postApi.updatePost(payload._id, payload)
  },
  [type.DELETE_POST](context, id) {
    return postApi.deletePost(id)
  }
}

export default {
  state,
  mutations,
  actions
}
