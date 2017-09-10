import Promise from 'bluebird'
import { install as installPosts } from './posts'
import { install as installUsers } from './users'

export default () => {
  return installUsers()
    .then(installPosts)
    .catch(err => {
      // seeds는 오류가 나더라도 오류 로그만 출력하고
      // 정상 진행한다.
      console.warn(err.stack || err)
      return Promise.resolve()
    })
}
