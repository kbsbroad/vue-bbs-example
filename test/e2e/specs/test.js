// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '초기 페이지 렌더링 테스트': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('nav.toolbar')
      .assert.containsText('.pageTitle', 'Vue Simple BBS')
      .assert.elementPresent('button.btn-login')
      .assert.elementPresent('button.btn-register')
      .assert.elementPresent('#post-list')
      .assert.elementPresent('table.datatable')
      .end()
  }
}
