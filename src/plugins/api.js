import Vue from "vue"
import { $http } from '../../lib'

export default Vue.prototype.$api = {
  users(para) { return $http.get('users', para) },
}