import exTable from './exTable/index.js'

const components = [ exTable ]
const install = (Vue, options = {}) => {
  if (install.installed) return;

  // 多语言
  const locale = options.exLocale ? options.exLocale : require('./locale/lang/zh-CN')
  Vue.prototype.$t = function (text) { return eval('locale.' + text ) || text }  

  // 安装组件
  components.map((component) => { Vue.component(component.name, component) })

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  exTable
}
