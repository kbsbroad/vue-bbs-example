import Promise from 'bluebird'
import pathToRegexp from 'path-to-regexp'

const routes = {}

const router = (pattern, options = { method: 'GET' }, cb = () => {}) => {
  const key = `${options.method.toUpperCase()} ${pattern}`

  const wrapCb = (request, response) => {
    return Promise.resolve(cb())
  }

  routes[key] = {
    options,
    cb: wrapCb
  }
}

const searchRoute = (url, method = 'GET') => {
  let result = null

  for (key in routes) {
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
      result = Object.assign({}, routes[key])
      result.params = params
      return
    }
  }

  return result
}

export default {
  router,
  searchRoute
}
