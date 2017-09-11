import PostList from '@/containers/PostList'
import store from '../../store'
import router from '../../router'
import { wrapTestComponent } from '../../utils'

describe('<post-list>', () => {
  let vm

  before(() => {
    vm = wrapTestComponent({ store, router })(PostList)
    vm.$mount()
  })

  after(() => {
    vm.$destroy()
  })

  it('should render correct contents', () => {
    expect(vm.getComponent().$el.id).to.equal('post-list')
  })

  it('fetchPosts() 테스트', done => {
    const component = vm.getComponent()
    component
      .fetchPosts()
      .then(() => {
        expect(component.posts.length).to.equal(1)
        done()
      })
      .catch(done)
  })
})
