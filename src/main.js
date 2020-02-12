import Vue from 'vue'
import App from './App.vue'

//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//
import exTable from './lib/exTable'
import exLocale from './lib/locale/lang/en'
Vue.use(exTable, { exLocale })

new Vue({
  el: '#app',
  render: h => h(App)
})
