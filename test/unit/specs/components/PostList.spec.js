import Vue from 'vue'
import Vuex from 'vuex'
import Promise from 'bluebird'
import PostList from '@/containers/PostList'

const postStoreInjector = require('inject-loader!@/store/modules/post') // eslint-disable-line

describe('<post-list>', () => {
  let vm

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

  const store = new Vuex.Store({
    modules: {
      // inject-loader를 이용할 경우 default를 명시해줘야 함.
      post: postStore.default
    }
  })

  before(() => {
    vm = new Vue({
      store,
      components: {
        'post-list': PostList
      },
      template: '<v-app><post-list ref="postList"></post-list></v-app>'
    })
  })

  it('should render correct contents', () => {
    vm.$mount()
    expect(vm.$refs.postList.$el.id).to.equal('post-list')
  })
})
