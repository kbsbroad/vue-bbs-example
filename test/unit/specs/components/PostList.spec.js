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
})
