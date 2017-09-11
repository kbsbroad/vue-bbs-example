import moment from 'moment'

import * as userRepo from '../repository/user'

const __seeds = [
  {
    username: 'scott',
    password: 'tiger',
    name: 'Scott Tiger',
    email: 'scott.tiger@example.com',
    phone: '+82-10-1111-2222',
    createdAt: moment().toISOString()
  },
  {
    username: 'robert',
    password: 'monkey',
    name: 'Robert Monkey',
    email: 'robert.monkey@example.com',
    phone: '+82-10-3333-4444',
    createdAt: moment().toISOString()
  }
]

export const getSeeds = () => {
  return __seeds
}

export const install = () => {
  return userRepo.createUser(getSeeds())
}
