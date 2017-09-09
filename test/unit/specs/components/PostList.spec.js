import Vue from 'vue'
import PostList from '@/containers/PostList'

describe('<post-list>', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PostList)
    const vm = new Constructor().$mount()
    expect(vm.$el.id).to.equal('post-list')
  })
})
