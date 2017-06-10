import Vue from 'vue'
import App from './App'
import config from './config'
import router from './router'
import store from './vuex/store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
