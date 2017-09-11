import Promise from 'bluebird'
import * as userRepo from '../repository/user'
import { setCookie, removeCookie } from '@/utils/cookie'

/**
 * 해당 페이지의 사용자 목록 반환 요청 처리
 * @param {*} param0
 */
export const getUsers = ({ params, payload }) => {
  const { page = 1, size = 10, direction = -1 } = payload
  const skip = (page - 1) * size

  return userRepo.getUsers({ skip, direction, limit: size })
}

/**
 * 사용자 프로필 반환 요청 처리
 * @param {*} param0
 */
export const getUser = ({ params }) => {
  return userRepo.getUserByUsername(params.id)
}

/**
 * 사용자 계정/프로필 생성 요청 처리
 * @param {*} param0
 *
 * password에 대한 암호화 처리해야 하나 mock에서는 하지 않음.
 */
export const createUser = ({ payload }) => {
  return userRepo.createUser(payload)
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

  if (!payload['password'] || payload['password'] === '') {
    delete payload.password
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
  return userRepo.getUserByUsername(payload.username)
    .then(user => {
      // payload.password를 암호화하여 비교해야 하나,
      // mock에서는 단순 비교

      if (!user || user.password !== payload.password) {
        return Promise.reject(new Error('Invalid User'))
      }

      const session = Object.assign({}, user, {
        loginAt: new Date()
      })

      // 서버의 세션을 쿠키로 임시 대체(30분후 파기로 설정)
      setCookie('username', user.username, 30)

      return Promise.resolve(session)
    })
}

/**
 * 로그아웃
 * - 쿠키를 지우는 것으로 간단히 구현
 */
export const logout = () => {
  return new Promise(resolve => {
    removeCookie('username')
    resolve()
  })
}
