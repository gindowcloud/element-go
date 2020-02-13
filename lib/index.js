import exTable from './exTable'
import exTree from './exTree'
import './styles/index.css'

const components = [ exTable, exTree ]
const install = (Vue, options = {}) => {
  if (install.installed) return;

  // 语言支持
  const locale = options.exLocale ? options.exLocale : require('./locale/lang/zh-CN')
  Vue.prototype.$t = function (text) {
    let current = locale
    let value = ''
    text.split('.').forEach(j => {
      value = current[j]
      if (!value) return text
      current = value
    })
    return typeof(value) === 'string' ? value : text
  }

  // 安装组件
  components.map((component) => { Vue.component(component.name, component) })

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  exTable,
  exTree
}
