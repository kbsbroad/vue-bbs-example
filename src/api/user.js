import fetch from './mock/fetch'

/**
 * 사용자 프로필 조회
 * @param {*} id
 */
const getUser = id => {
  return fetch(`/api/user/:id`, { method: 'GET' })
}
