import Vue from 'vue'
import App from './App.vue'

//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//
import mintTable from './lib/mintTable'
Vue.use(mintTable)

new Vue({
  el: '#app',
  render: h => h(App)
})
