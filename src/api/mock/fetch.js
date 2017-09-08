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
const fetch = (url, payload, options = { method: 'GET' }, cb) => {
  const result = searchRoute(url, options.method)

  if (!result) {
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

  result.payload = payload

  let chain;
  if (result['cb']) {
    const rcb = result.cb
    delete result.cb
    chain = rcb(result)
  } else {
    chain = Promise.resolve(result)
  }

  if (cb) {
    // 콜백 함수가 들어오면 node callback 타입으로 넘겨준다.
    return chain.then(result => cb(undefined, result, {}))
  } else {
    // 그외에는 promise 반환
    return chain
  }
}

export default fetch
