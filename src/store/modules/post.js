import postApi from '../../api/post';

export const type = {
  UPDATE_POSTS: 'updatePosts',
  UPDATE_TOTAL: 'updateTotal'
}

const state = {
  posts: [],
  total: 0
}

const mutations = {
  [type.UPDATE_POSTS](state, posts) {
    state.posts = posts
  },
  [type.UPDATE_TOTAL](state, count) {
    state.total = count
  }
}

const actions = {
  getPosts({ commit }, options = { page: 1, size: 10, direction: -1 }) {
    return postApi.getPosts(options)
      .then(result => {
        const posts = result.data

        commit(type.UPDATE_POSTS, posts)
        commit(type.UPDATE_TOTAL, result.metadata.total)
        return posts
      })
  },
  createPost({ commit }, payload) {
    return postApi.createPost(payload)
  }
}

export default {
  state,
  mutations,
  actions
}
