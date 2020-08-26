import Vue from 'vue'
import ElementUI from 'element-ui'
import ElementGo from '../../lib'
import i18n from '../plugins/i18n'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {i18n: (key, value) => i18n.t(key, value)})
Vue.use(ElementGo)