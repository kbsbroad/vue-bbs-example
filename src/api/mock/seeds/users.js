import moment from 'moment'

import * as userRepo from '../repository/user'

const __seeds = [
  {
    username: 'scott',
    password: 'tiger',
    name: 'Scott Tiger',
    email: 'scott.tiger@example.com',
    createdAt: moment().toISOString()
  },
  {
    username: 'robert',
    password: 'monkey',
    name: 'Robert Monkey',
    email: 'robert.monkey@example.com',
    createdAt: moment().toISOString()
  }
]

export const getSeeds = () => {
  return __seeds
}

export const install = () => {
  return userRepo.createUser(getSeeds())
}
