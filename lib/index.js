import _exLayout from './exLayout/exLayout'
import _exTable from './exTable/exTable'
import _exTree from './exTree/exTree'
import _$http from './plugins/http'
import './plugins/utils'
import './styles/index.css'

export const exLayout = _exLayout
export const exTable = _exTable
export const exTree = _exTree
export const $http = _$http

const components = [ exLayout, exTable, exTree ]
const install = (Vue, options = {}) => {
  if (install.installed) return

  // 安装组件
  components.map((component) => { Vue.component(component.name, component) })
  
  // 默认语言
  const locale = options.exLocale || require('./locale/lang/zh-CN')

  // 语言支持
  Vue.prototype.$t = function(text) {
    let current = locale
    let value = ''
    text.split('.').forEach(j => {
      value = current[j]
      if (!value) return text
      current = value
    })
    return typeof(value) === 'string' ? value : text
  }

  // 跳转命令
  Vue.prototype.$to = function(url) {
    this.$router.push(url)
  }
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default {
  install,
  exLayout,
  exTable,
  exTree,
  $http
}
