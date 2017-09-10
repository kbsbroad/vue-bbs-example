/**
 * 쿠키 설정
 * @param {*} cname
 * @param {*} cvalue
 * @param {*} exdays
 */
export const setCookie = (cname, cvalue, exmins) => {
  const date = new Date()
  date.setTime(date.getTime() + (exmins * 60 * 1000))
  const expires = date.toUTCString()
  document.cookie = `${cname}=${cvalue}; expires=${expires}; path=/`
}

/**
 * 쿠키 반환
 * @param {*} cname
 */
export const getCookie = cname => {
  if (document.cookie) {
    const name = cname + '='
    let tokens = document.cookie.split(';')
    for (let i = 0, len = tokens.length; i < len; len++) {
      const token = tokens[i]
      const c = token.replace(/\s/g, '')
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
  }

  return ''
}

/**
 * 쿠키 삭제
 * @param {*} cname
 */
export const removeCookie = cname => {
  setCookie(cname, '', -1000)
}
