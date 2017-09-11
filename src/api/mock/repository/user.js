import Promise from 'bluebird'
import { users } from '../datastore'

/**
 * fetch posts
 * @param {*} boardId
 * @param {*} options
 */
export const getUsers = ({ page = 1, limit = 10, direction = -1 }) => {
  return new Promise((resolve, reject) => {
    const skip = (page - 1) * limit
    users
      .find({})
      .sort({ _id: direction })
      .skip(skip)
      .limit(limit)
      .exec((err, docs) => {
        if (err) {
          reject(err.stack || err)
        }

        resolve(docs)
      })
  })
}

/**
 * 사용자 계정/프로필 반환
 * @param {*} id
 */
export const getUser = id => {
  return new Promise((resolve, reject) => {
    users.findOne({ _id: id }, (err, user) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(user)
    })
  })
}

/**
 * 사용자 계정/프로필 반환(사용자 아이디로 검색)
 * @param {*} username
 */
export const getUserByUsername = username => {
  return new Promise((resolve, reject) => {
    users.findOne({ username: username }, (err, user) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(user)
    })
  })
}

/**
 * 사용자 계정/프로필 생성
 * @param {Array | Object} user
 */
export const createUsers = payload => {
  return new Promise((resolve, reject) => {
    users.insert(payload, (err, newUsers) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(newUsers)
    })
  })
}

/**
 * 사용자 계정/프로필 생성(편의 함수)
 * @param {Object} user
 */
export const createUser = user => {
  return createUsers(user)
}

/**
 * 사용자 계정/프로필 수정
 * @param {Object} user
 */
export const updateUser = (username, payload) => {
  return new Promise((resolve, reject) => {
    users.update(
      { username: username },
      { $set: payload },
      { multi: true },
      (err, newUsers) => {
        if (err) {
          reject(err.stack || err)
        }
        resolve(newUsers)
      }
    )
  })
}

/**
 * 사용자 계정/프로필 삭제
 * @param {*} id
 */
export const deleteUser = id => {
  return new Promise((resolve, reject) => {
    users.remove({_id: id}, { multi: true }, (err, numRemoved) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(numRemoved)
    })
  })
}
