// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'
import store from './store'
import installMock from './api/mock'

Vue.config.productionTip = false

Vue.use(Vuetify)

if (process.env.NODE_ENV === 'development') {
  installMock()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
