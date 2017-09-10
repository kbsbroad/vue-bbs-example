import { router } from './router'
import * as postCtr from './controllers/post'
import * as userCtr from './controllers/user'

export default () => {
  // post 관련 router
  router('/api/posts', { method: 'GET' }, postCtr.getPosts)
  router('/api/post/:id', { method: 'GET' }, postCtr.getPost)
  router('/api/post', { method: 'POST' }, postCtr.createPost)
  router('/api/post/:id', { method: 'PUT' }, postCtr.updatePost)
  router('/api/post/:id', { method: 'DELETE' }, postCtr.deletePost)

  // user 관련 router
  router('/api/users', { method: 'GET' }, userCtr.getUsers)
  router('/api/user/:id', { method: 'GET' }, userCtr.getUser)
  router('/api/user', { method: 'POST' }, userCtr.createUser)
  router('/api/user/:id', { method: 'PUT' }, userCtr.updateUser)
  router('/api/user/:id', { method: 'DELETE' }, userCtr.deleteUser)
  router('/api/login', { method: 'POST' }, userCtr.login)
  router('/api/logout', { method: 'GET' }, userCtr.logout)
}
