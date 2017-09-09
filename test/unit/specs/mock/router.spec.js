import {
  router,
  searchRoute,
  getRoutes,
  clearRoutes
} from '@/api/mock/router'

describe('[mock] router 모듈 테스트', () => {
  afterEach(() => {
    clearRoutes()
  })

  it('router() 테스트', () => {
    // Given
    router('/api/post/:id', { method: 'GET' }, (req) => {
      return req
    })
    const routes = getRoutes()
    const target = routes['GET /api/post/:id']

    // Then
    expect(target, '등록된 라우터가 존재해야 한다.').to.not.be.a('undefined')
    expect(target, 'options 속성이 존재해야 한다.').to.have.property('options')
    expect(target, 'cb 속성이 존재해야 한다.').to.have.property('cb')
    expect(target['cb'], 'cb는 함수여야 한다.').to.have.a('function')
  })

  it('searchRoutes() - 일치 테스트', () => {
    // Given
    router('/api/board/:boradId/post/:postId', { method: 'GET' }, (req) => {
      return req
    })

    // When
    const route = searchRoute('/api/board/1/post/323', 'GET')

    // Then
    expect(route, 'Object가 반환되어야 한다.').to.be.an('object')
    expect(route, 'params 속성을 가져야 한다.').to.have.property('params')
    expect(route.params, 'params는 Object이다.').to.be.an('object')
    expect(route.params, 'params는 boardId 속성을 가져야한다.').to.have.property('boradId')
    expect(route.params.boradId, 'boardId 값은 "1"이다.').to.equal('1')
    expect(route.params, 'params는 postId 속성을 가져야한다.').to.have.property('postId')
    expect(route.params, 'params는 postId 속성을 가져야한다.').to.have.property('postId')
    expect(route.params.postId, 'postId 값은 "323"이다.').to.equal('323')
  })

  it('searchRoutes() - 비일치 테스트', () => {
    // Given
    router('/api/board/:boradId/post/:postId', { method: 'GET' }, (req) => {
      return req
    })

    // When
    const route = searchRoute('/api/boards/1/post/323', 'GET')

    // Then
    expect(route, 'NULL이 반환되어야 한다.').to.be.an('null')
  })
})
