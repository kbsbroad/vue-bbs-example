import Promise from 'bluebird'
import pathToRegexp from 'path-to-regexp'

let __routes = {}

export const router = (pattern, options = { method: 'GET' }, cb = () => {}) => {
  const key = `${options.method.toUpperCase()} ${pattern}`

  const wrapCb = (request, response) => {
    return Promise.resolve(cb(request, response))
  }

  __routes[key] = {
    options,
    cb: wrapCb
  }
}

export const searchRoute = (url, method = 'GET') => {
  let result = null

  for (let key in __routes) {
    let keys = []
    const token = key.split(' ')
    const curMethod = token[0]
    const pattern = token[1]
    const re = pathToRegexp(pattern, keys)
    const matched = re.exec(url)

    if (
      curMethod === method.toUpperCase() &&
      (matched && matched.length > 0)
    ) {
      const params = {}
      keys.forEach((item, index) => {
        params[item.name] = matched[index + 1]
      })
      result = Object.assign({}, __routes[key])
      result.params = params
      break
    }
  }

  return result
}

/**
 * 라우트 테이블 반환(테스트 용)
 */
export const getRoutes = () => {
  return __routes
}

/**
 * 라우트 테이블 초기화(테스트 용)
 */
export const clearRoutes = () => {
  __routes = {}
}
