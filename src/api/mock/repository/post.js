import Promise from 'bluebird'
import moment from 'moment'
import { posts } from '../datastore'

/**
 * fetch posts
 * @param {*} boardId
 * @param {*} options
 */
export const getPosts = ({ skip = 1, limit = 10, sort = 'createdAt', direction = -1 }) => {
  return new Promise((resolve, reject) => {
    posts
      .find({})
      .sort({ [sort]: direction })
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
 * fetch a post
 * @param {*} id
 */
export const getPost = id => {
  console.log(id)
  return new Promise((resolve, reject) => {
    posts.findOne({ _id: id }, (err, docs) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(docs)
    })
  })
}

/**
 * fetch total count of posts
 */
export const totalCount = () => {
  return new Promise((resolve, reject) => {
    posts.count({}, (err, count) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(count)
    })
  })
}

/**
 * create a posts(bulk)
 * @param {Array | Object} payload
 */
export const createPosts = payload => {
  return new Promise((resolve, reject) => {
    posts.insert(addCreateAt(payload), (err, newPosts) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(newPosts)
    })
  })
}

/**
 * create a post
 * @param {Object} post
 */
export const createPost = post => {
  return createPosts(addCreateAt(post))
}

/**
 * post 정보에 생성일시를 추가.
 * @param {*} payload
 */
const addCreateAt = payload => {
  const isoStr = moment().toISOString()
  if (payload instanceof Array) {
    payload.map(item => {
      item.createdAt = isoStr
    })
  } else if (typeof payload === 'object') {
    payload.createdAt = isoStr
  }

  return payload
}

/**
 * update a post
 * @param {*} payload
 * @param {*} condition
 */
export const updatePost = (id, payload) => {
  return new Promise((resolve, reject) => {
    posts.update({ _id: id }, payload, (err, result) => {
      if (err) {
        reject(err.stack || err)
      }

      console.log(result)

      resolve(result)
    })
  })
}

/**
 * remove a post
 * @param {*} condition
 */
export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    posts.remove({ _id: id }, { multi: true }, (err, numRemoved) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(numRemoved)
    })
  })
}
