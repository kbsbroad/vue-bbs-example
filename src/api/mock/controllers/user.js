import Promise from 'bluebird'
import * as userRepo from '../repository/user'

/**
 * 해당 페이지의 사용자 목록 반환 요청 처리
 * @param {*} param0
 */
export const getUsers = ({ params, payload }) => {
  const { page = 1, size = 10, direction = -1 } = payload
  const skip = (page - 1) * size

  return userRepo.getUsers({ skip, direction, limit: size})
}

/**
 * 사용자 프로필 반환 요청 처리
 * @param {*} param0
 */
export const getUser = ({ params }) => {
  return userRepo.getUser(params.id)
}

/**
 * 사용자 계정/프로필 생성 요청 처리
 * @param {*} param0
 *
 * password에 대한 암호화 처리해야 하나 mock에서는 하지 않음.
 */
export const createUser = ({ payload }) => {
  return userRepo.insertUser(payload)
}

/**
 * 사용자 프로필 수정 요청 처리
 * @param {*} param0
 */
export const updateUser = ({ payload, params }) => {
  if (payload['_id']) {
    delete payload._id
  }

  if (payload['username']) {
    delete payload.username
  }

  return userRepo.updateUser(params.id, payload)
}

/**
 * 글 삭제 요청 처리
 * @param {*} param0
 */
export const deleteUser = ({ params }) => {
  return userRepo.deleteUser(params.id)
}

/**
 * 로그인 요청 처리
 * @param {*} param0
 */
export const login = ({ payload }) => {
  return getUserByUsername( payload.username )
    .then(user => {
      // payload.password를 암호화하여 비교해야 하나,
      // mock에서는 단순 비교

      if (user.password !== payload.password) {
        return Promise.reject(new Error('Invalid User'))
      }

      const session = Object.assign({}, user, {
        loginAt: new Date()
      })

      return Promise.resolve(session)
    })
}
