import exTable from './exTable.vue'

exTable.install = (Vue, options = {}) => {
  
  // 多语言
  const locale = options.exLocale ? options.exLocale : require('../locale/lang/zh-CN')
  Vue.prototype.$t = function (text) { return eval('locale.' + text ) || text }

  // 安装组件
  Vue.component(exTable.name, exTable)

}
export default exTable
