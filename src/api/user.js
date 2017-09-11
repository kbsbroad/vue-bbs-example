import fetch from './mock/fetch'

/**
 * 사용자 프로필 조회
 * @param {*} id
 */
export const getUser = id => {
  return fetch(`/api/user/${id}`, { method: 'GET' })
}

export const addUser = payload => {
  return fetch('/api/user', {
    method: 'POST',
    data: payload
  })
}

export const updateUser = (username, payload) => {
  return fetch(`/api/user/${username}`, {
    method: 'PUT',
    data: payload
  })
}

/**
 * 로그인 요청
 * @param {*} username
 * @param {*} password
 */
export const login = (username, password) => {
  return fetch('/api/login', {
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 * 로그아웃 요청
 */
export const logout = () => {
  return fetch('/api/logout', { method: 'GET' })
}
