import fetch from './mock/fetch'

/**
 * 해당 보드의 글 반환
 * @param {*} boardId
 * @param {*} options
 */
export const getPosts = (boardId, options = { page = 1, size = 10, direction = -1 }) => {
  return fetch(`/api/posts`, { method: 'GET' }, options)
}

/**
 * 새글 작성 API(mock)
 * @param {Object} content
 */
export const createPost = content => {
  return fetch(`/api/post`, { method: 'POST' }, content)
}

/**
 * 글 수정 API(mock)
 * @param {Object} content
 */
export const updatePost = (id, content) => {
  return fetch(`/api/post/${id}`, { method: 'PUT' }, content)
}

/**
 * 글 삭제 API(mock)
 * @param {*} id
 */
export const deletePost = id => {
  return fetch(`/api/post/${id}`, { method: 'DELETE' })
}
