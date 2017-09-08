import Vue from 'vue'
import PostForm from '@/components/PostForm'

describe('<post-form>', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PostForm)
    const vm = new Constructor().$mount()
    expect(vm.$el.tagName.toUpperCase()).to.equal('P')
  })
})
