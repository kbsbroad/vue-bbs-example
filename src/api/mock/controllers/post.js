import Promise from 'bluebird'
import * as postRepo from '../repository/post'

/**
 * 해당 페이지의 글 반환 요청 처리
 * @param {*} param0
 */
export const getPosts = ({ params, payload }) => {
  const { page = 1, size = 10, direction = -1 } = payload
  const skip = (page - 1) * size

  const result = {
    data: [],
    metadata: {
      page,
      size,
      direction
    }
  }
  return postRepo.getPosts(params.boardId, { skip, direction, limit: size})
    .then(posts => result.data = posts)
    .then(() => postRepo.totalCount())
    .then(count => {
      result.metadata.total = count
      return result
    })
}

/**
 * 글 반환 요청 처리
 * @param {*} param0
 */
export const getPost = ({ params }) => {
  return postRepo.getPost(params.id)
}

/**
 * 글 생성 요청 처리
 * @param {*} param0
 */
export const createPost = ({ payload }) => {
  return postRepo.insertPost(payload)
}

/**
 * 글 수정 요청 처리
 * @param {*} param0
 */
export const updatePost = ({ payload, params }) => {
  if (payload['_id']) {
    delete payload._id
  }

  return postRepo.updatePost(params.id, payload)
}

/**
 * 글 삭제 요청 처리
 * @param {*} param0
 */
export const deletePost = ({ params }) => {
  return postRepo.deletePost(params.id)
}
