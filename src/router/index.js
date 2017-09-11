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
      path: '/post/create',
      name: 'post-create',
      component: () => import('@/containers/PostForm')
    },
    {
      path: '/post/:id',
      name: 'post-view',
      component: () => import('@/containers/PostView'),
      props: true
    },
    {
      path: '/post/:id/edit',
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
      path: '/user/regist',
      name: 'user-regist',
      component: () => import('@/containers/UserRegistForm')
    },
    {
      path: '/user/:id/edit',
      name: 'user-edit',
      component: () => import('@/containers/UserRegistForm')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/containers/Login')
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('@/containers/NotFound')
    }
  ]
})
