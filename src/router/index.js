import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'post-list' },
    },
    {
      path: '/posts/:page?',
      name: 'post-list',
      component: () => import('@/components/PostList'),
      props: true,
    },
    {
      path: '/post/:id(\\d+)',
      name: 'post-view',
      component: () => import('@/components/PostView'),
      props: true,
    },
    {
      path: '/post/create',
      name: 'post-create',
      component: () => import('@/components/PostForm'),
    },
    {
      path: '/post/:id(\\d+)/edit',
      name: 'post-edit',
      component: () => import('@/components/PostForm'),
      props: true,
    },
    {
      path: '/user/:id/profile',
      name: 'user-profile',
      component: () => import('@/components/UserProfile'),
      props: true,
    },
    {
      path: '*',
      component: () => import('@/components/NotFound'),
    },
  ],
});
