import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import './plugins/element'
import './plugins/mock.js'
import './plugins/api'
import './styles/index.css'

new Vue({
  router,
  i18n,
  el: '#app',
  render: h => h(App)
})
