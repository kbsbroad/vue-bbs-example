import Datastore from 'nedb'

const posts = new Datastore()
const users = new Datastore()
const postSeq = new Datastore()
const userSeq = new Datastore()

// constraint 생성
users.ensureIndex({ fieldName: 'username', unique: true })

// userSeq 생성
postSeq.insert({ seq: 0 })
userSeq.insert({ seq: 0 })

export {
  posts,
  users,
  postSeq,
  userSeq
}
