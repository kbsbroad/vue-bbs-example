import Vue from 'vue'
import PostList from '@/components/UserProfile'

describe('<user-profile>', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PostList)
    const vm = new Constructor().$mount()
    expect(vm.$el.tagName.toUpperCase()).to.equal('DIV')
  })
})
