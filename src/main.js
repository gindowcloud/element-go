import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import './plugins/mock.js'
import './plugins/api'
import './styles/index.css'

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
