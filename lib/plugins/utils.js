import Vue from 'vue'

export default Vue.prototype.$util = {
}

/**
 * 千分位格式（字符串）
 */
String.prototype.thousands = function() {
  return parseInt(this).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
}

/**
 * 千分位格式（数值型）
 */
Number.prototype.thousands = function() {
  return this.toString().thousands()
}
