import fetch from '@/api/mock/fetch'
import { router, clearRoutes } from '@/api/mock/router'

describe('[mock] fetch 모듈 테스트', () => {
  const mockPost = {
    _id: 1,
    subject: '제목',
    creator: {
      _id: 1,
      username: 'jeremy.kang',
      name: 'Jeremy Kang'
    },
    createdAt: '2017-09-08T23:11:23',
    updatedAt: '2017-09-08T23:11:23'
  }

  before(() => {
    router('/api/post/:id', { method: 'GET' }, (req) => {
      return mockPost
    })
  })

  after(() => {
    clearRoutes()
  })

  it('fetch() - promise 이용 테스트', (done) => {
    // When
    const promise = fetch('/api/post/1', { method: 'GET' })

    // Then
    promise.then(result => {
      expect(result).to.be.an('object')
      expect(result).to.deep.equal(mockPost)
      done()
    })
  })

  it('fetch() - 콜백함수 이용 테스트', () => {
    fetch('/api/post/1', { method: 'GET' }, (err, result) => {
      expect(err).to.be.an('null')
      expect(result).to.be.an('object')
      expect(result).to.deep.equal(mockPost)
    })
  })
})
