import Vue from "vue"
import { $http } from '../../lib'
import { Message } from 'element-ui'

$http.configure({
  resolve(response) {
    return response.data
  },
  reject(error) {
    const data = error.response.data
    Message({ type: 'error', message: data.message })
    return Promise.reject(data)
  }
})

export default Vue.prototype.$api = {
  users(para) { return $http.get('users', para) },
}
