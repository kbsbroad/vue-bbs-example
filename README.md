# vue-bbs-example
Vue.js 기반으로 간단한 게시판을 구현합니다.

## 대표적인 라이브러리들
- [Vue.js](http://vuejs.org) : UI 라이브러리
- [vue-router](https://router.vuejs.org/) : Vue.js 라우터 처리
- [Vuex](https://vuex.vuejs.org/) : Vue.js store 관리 라이브러리
- [Vuetify](https://vuetifyjs.com) : Vue.js UI 라이브러리
- [NeDB](https://github.com/louischatriot/nedb) : In-memory Database, API Mock 구성을 위해 사용

## 지원 브라우저
Vuetify를 사용함에 따라 해당 라이브러리의 지원 브라우저에 따라갑니다.
- All modern browser
- Internet Explorer 11

## 프로젝트 설치
```bash
# git clone
git clone https://github.com/kbsbroad/vue-bbs-example
# change directory
cd vue-bbs-example
# package install
yarn install (or npm install)
```

## 프로젝트 실행
이 프로젝트는 임시 프로젝트이므로 개발모드로만 실행되도록 구성되어 있습니다.
```bash
# serve with hot reload at localhost:8080
yarn run dev (or npm run dev)
```
실행 후 기본 브라우저가 자동으로 실행됩니다. 원하지 않을 경우 `config/index.js`의 `dev.autoOpenBrowser = false`로 수정하기 바랍니다.

실행시 두개의 계정과 두개의 글이 기본적으로 들어가도록 bootstrap을 구성함.

### 초기 계정 정보
- scott / tiger ( id / pw )
- robert / monkey

## 프로젝트 테스트
```bash
# unit test
yarn run unit (or npm run unit)
# e2e test
yarn run e2e (or npm run e2e)
# all test(unit & e2e)
yarn test (or npm test)
```
## 기능(Spec)
- 게시글 생성/수정/삭제
- 로그인/로그아웃
- 게시판 접근 권한 구현
  - 로그인 사용자만 게시글 작성 가능
  - 자신의 글에 대해서는 게시글 수정/삭제 가능
- 사용자 프로필 조회
  - 로그인 여부에 따라 보이는 정보 틀림: 현재는 폰 번호만 적용됨.
- 사용자 추가/수정
  - (테스트용) 사용자 추가 - 누구나 할 수 있음
  - 자신의 프로필에 대해 수정 가능
- 영속성 처리
  - NeDB를 이용하여 메모리에 쓰도록 함.
  - 브라우저 리프레시 하면 초기화됨
- API 서버 MOCK 처리
  - fetch MOCK 기능 구현하여 실제 API 서비스를 호출한다고 가정하고 처리.
- 입력폼 별 validation 간단히 구현
