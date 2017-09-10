import * as postApi from '@/api/post'
import * as type from '../types'

const state = {
  posts: [],
  pagination: {
    sortBy: 'createdAt',
    page: 1,
    rowsPerPage: 10,
    descending: true,
    totalItems: 0
  }
}

const mutations = {
  [type.COMMIT_POSTS](state, result) {
    state.posts = result.data
    state.pagination = {
      sortBy: result.metadata.sort,
      page: result.metadata.page,
      rowsPerPage: result.metadata.size,
      descending: result.metadata.direction === -1,
      totalItems: result.metadata.total
    }
    state.total = result.metadata.total
  },
  [type.COMMIT_TOTAL](state, count) {
    state.total = count
  }
}

const actions = {
  [type.FETCH_POSTS]({ commit }, options = { page: 1, size: 10, sort: 'createAt', direction: -1 }) {
    return postApi.getPosts(options)
      .then(result => {
        const posts = result.data

        commit(type.COMMIT_POSTS, result)
        return posts
      })
      .catch(err => {
        console.log(err.stack || err)
        return []
      })
  },
  [type.FETCH_POST](context, id) {
    return postApi.getPost(id)
  },
  [type.ADD_POST](context, payload) {
    return postApi.createPost(payload)
  },
  [type.UPDATE_POST](context, payload) {
    return postApi.updatePost(payload._id, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
