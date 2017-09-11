import Promise from 'bluebird'
import * as postRepo from '../repository/post'
import * as userRepo from '../repository/user'
import { checkAuth } from '../utils'
import { getCookie } from '@/utils/cookie'

/**
 * 해당 페이지의 글 반환 요청 처리
 * @param {*} param0
 */
export const getPosts = (req) => {
  const { page = 1, size = 10, sort = 'createdAt', direction = -1 } = req.payload
  const skip = (page - 1) * size

  const result = {
    data: [],
    metadata: {
      page,
      size,
      direction
    }
  }
  return postRepo.getPosts({ skip, direction, sort, limit: size })
    .then(posts => {
      if (!posts || (posts && posts.length <= 0)) {
        return Promise.reject(new Error('Not Found'))
      }
      result.data = posts
      return result
    })
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
    .then(post => {
      if (!post) {
        return Promise.reject(new Error('Not Found'))
      }

      return Promise.resolve(post)
    })
}

/**
 * 글 생성 요청 처리
 * @param {*} param0
 */
export const createPost = ({ payload }) => {
  const curLoggedUser = getCookie('username')

  if (!curLoggedUser || !checkAuth(curLoggedUser)) {
    return Promise.reject(new Error('Not Autorized'))
  }

  return userRepo.getUserByUsername(curLoggedUser)
    .then(creator => {
      return Object.assign({}, payload, {
        creator
      })
    })
    .then(payload => {
      return postRepo.createPost(payload)
    })
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
