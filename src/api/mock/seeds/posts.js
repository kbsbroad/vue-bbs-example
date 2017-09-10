/**
 * posts seeds
 * [참고]
 * - creator 정보는 인스톨시 user store를 참고하여 매칭됨.
 */
import * as postRepo from '../repository/post'
import { getSeeds as getUserSeeds } from './users'

const userSeeds = getUserSeeds()

const __seeds = [
  {
    subject: '제목 1 입니다.',
    content: '이것은 첫번째 글입니다.\n에디터는 사용하지 않습니다.\n\n감사합니다.',
    creator: userSeeds[0],
    createdAt: '2017-09-10T05:50:50.000Z'
  },
  {
    subject: '제목 2 입니다.',
    content: '이것은 두번째 글입니다.\n에디터는 사용하지 않습니다.\n\n감사합니다.',
    creator: userSeeds[1],
    createdAt: '2017-09-10T05:50:53.000Z'
  }
]

export const getSeeds = () => {
  return __seeds
}

export const install = () => {
  return postRepo.createPosts(getSeeds())
}
