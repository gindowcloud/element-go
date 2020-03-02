import Vue from 'vue'
import ElementUI from 'element-ui'
import ElementEx from '../../lib'
import 'element-ui/lib/theme-chalk/index.css'
import exLocale from '../../lib/locale/lang/zh-CN'

Vue.use(ElementUI)
Vue.use(ElementEx, { exLocale })
