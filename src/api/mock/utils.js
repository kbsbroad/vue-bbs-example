import { getCookie } from '@/utils/cookie'

export const checkAuth = username => {
  const loginUser = getCookie('username')

  if (!loginUser || loginUser !== username) {
    return false
  }

  return true
}
