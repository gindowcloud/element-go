import Vue from "vue"
import $http from '../../lib/plugins/http'

export default Vue.prototype.$api = {
  users(para) { return $http.get('users', para) },
}