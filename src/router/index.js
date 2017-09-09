import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'post-list' }
    },
    {
      path: '/posts/:page?',
      name: 'post-list',
      component: () => import('@/containers/PostList'),
      props: true
    },
    {
      path: '/post/:id(\\d+)',
      name: 'post-view',
      component: () => import('@/containers/PostView'),
      props: true
    },
    {
      path: '/post/create',
      name: 'post-create',
      component: () => import('@/containers/PostForm')
    },
    {
      path: '/post/:id(\\d+)/edit',
      name: 'post-edit',
      component: () => import('@/containers/PostForm'),
      props: true
    },
    {
      path: '/user/:id/profile',
      name: 'user-profile',
      component: () => import('@/containers/UserProfile'),
      props: true
    },
    {
      path: '*',
      component: () => import('@/containers/NotFound')
    }
  ]
})
