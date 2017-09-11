/* eslint-disable */
import Vuex from 'vuex'

const postStoreInjector = require('inject-loader!@/store/modules/post')
const userStoreInjector = require('inject-loader!@/store/modules/user')

const mockPosts = [{
  _id: 1,
  subject: '제목',
  creator: {
    _id: 1,
    username: 'jeremy.kang',
    name: 'Jeremy Kang'
  },
  createdAt: '2017-09-08T23:11:23',
  updatedAt: '2017-09-08T23:11:23'
}]

const postStore = postStoreInjector({
  '@/api/post': {
    getPosts(options = { page: 1, size: 10, direction: -1 }) {
      return Promise.resolve({
        data: mockPosts,
        metadata: {
          ...options,
          total: 1
        }
      })
    }
  }
})

const userStore = userStoreInjector({
  '@/api/user': {
    login(username, password) {
      return true
    },
    logout() {
      return Promise.resolve()
    },
    addUser(payload) {
      return Promise.resolve(1)
    },
    getUser(username) {
      return Promise.resolve([])
    },
    updateUser(payload) {
      return Promise.resolve(1)
    }
  }
})

const store = new Vuex.Store({
  modules: {
    // inject-loader를 이용할 경우 default를 명시해줘야 함.
    post: postStore.default,
    user: userStore.default
  }
})

export default store
