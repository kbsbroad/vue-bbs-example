import Promise from 'bluebird'
import { searchRoute } from './router'

/**
 * ajax request (mock)
 * @param {*} url
 * @param {*} payload
 * @param {*} options
 * @param {*} cb
 *
 * [참고]
 *  - options.method는 mock에서는 크게 의미없다.
 */
const fetch = (url, options = { data: null, method: 'GET' }, cb) => {
  const request = searchRoute(url, options.method)

  if (!request) {
    const err = new Error('Not Found')
    if (cb) {
      // 콜백 함수가 들어오면 node callback 타입으로 넘겨준다.
      cb(err)
      return
    } else {
      // 그외에는 promise 반환
      return Promise.reject(err)
    }
  }

  if (options.data) {
    request.payload = options.data
  }

  let chain
  if (request['cb']) {
    const rcb = request.cb
    delete request.cb
    chain = rcb(request)
  } else {
    chain = Promise.resolve(request)
  }

  if (cb) {
    // 콜백 함수가 들어오면 node callback 타입으로 넘겨준다.
    chain.then(result => {
      return cb(null, result, {})
    })
  } else {
    // 그외에는 promise 반환
    return chain
  }
}

export default fetch
