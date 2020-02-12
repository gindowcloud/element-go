import Vue from 'vue'
import App from './App.vue'

//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//
import exTable from '../lib'
Vue.use(exTable)

new Vue({
  el: '#app',
  render: h => h(App)
})
