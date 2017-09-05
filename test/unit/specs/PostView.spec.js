import Vue from 'vue';
import PostView from '@/components/PostView';

describe('<post-view>', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PostView);
    const vm = new Constructor().$mount();
    expect(vm.$el.tagName.toUpperCase()).to.equal('P');
  });
});
