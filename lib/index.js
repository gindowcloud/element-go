import _exLayout from './exLayout/exLayout'
import _exTable from './exTable/exTable'
import _exView from './exView/exView'
import _exTree from './exTree/exTree'
import _$http from './plugins/http'
import './plugins/utils'
import './styles/index.css'

export const exLayout = _exLayout
export const exTable = _exTable
export const exView = _exView
export const exTree = _exTree
export const $http = _$http

const components = [ exLayout, exTable, exView, exTree ]
const install = (Vue, options = {}) => {
  if (install.installed) return

  // 安装组件
  components.map((component) => { Vue.component(component.name, component) })

  // 跳转命令
  Vue.prototype.$to = function(url) {
    this.$router.push(url)
  }

  // 后退命令
  Vue.prototype.$back = function(url) {
    this.$router.back()
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
