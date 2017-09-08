import Promise from 'bluebird'
import { posts } from '../datastore'

/**
 * fetch posts
 * @param {*} boardId
 * @param {*} options
 */
export const getPosts = ({ skip = 1, limit = 10, direction = -1 }) => {
  return Promise((resolve, reject) => {
    const skip = (page - 1) * size
    posts
      .find({})
      .sort({ _id: direction })
      .skip(skip)
      .limit(size)
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
  return Promise((resolve, reject) => {
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
  return Promise((resolve, reject) => {
    posts.count({}, (err, count) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(count)
    })
  })
}

/**
 * create a post
 * @param {*} payload
 */
export const insertPost = payload => {
  return Promise((resolve, reject) => {
    posts.insert(payload, (err, result) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(result)
    })
  })
}

/**
 * update a post
 * @param {*} payload
 * @param {*} condition
 */
export const updatePost = (id, payload) => {
  return Promise((resolve, reject) => {
    posts.update({ _id: id }, payload, (err, result) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(result)
    })
  })
}

/**
 * remove a post
 * @param {*} condition
 */
export const deletePost = (id) => {
  return Promise((resolve, reject) => {
    posts.remove({ _id: id }, { multi: true }, (err, numRemoved) => {
      if (err) {
        reject(err.stack || err)
      }

      resolve(numRemoved)
    })
  })
}
