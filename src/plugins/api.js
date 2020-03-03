import Vue from "vue"
import { $http } from '../../lib'
import { Message } from 'element-ui'

$http.configure({
  handle(ret) {
    if (ret.code != 200) return Promise.reject(new Error(ret.message))
    return ret
  },
  error(err) {
    Message({ type: 'error', message: err.message })
    return Promise.reject(err)
  }
})

export default Vue.prototype.$api = {
  users(para) { return $http.get('users', para) },
}