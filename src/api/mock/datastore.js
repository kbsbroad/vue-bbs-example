import Datastore from 'nedb'

const posts = new Datastore()
const users = new Datastore()

// constraint 생성
users.ensureIndex({ fieldName: 'username', unique: true })

export default {
  posts,
  users
}
