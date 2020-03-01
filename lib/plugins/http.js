import Vue from 'vue'
import axios from 'axios'

export default Vue.prototype.$http = {

  token: null,

  get (url, params) { return this.request('get', url, params, null) },
  put (url, data) { return this.request('put', url, null, data) },
  patch (url, data) { return this.request('patch', url, null, data) },
  post (url, data) { return this.request('post', url, null, data) },  
  delete (url, params) { return this.request('delete', url, params, null) },
  download(url, params) { return this.request('get', url, params, null) },

  async request(method, url, params, data) {
    const headers =  { Accept: 'application/json' }
    if (this.token) headers.Authorization = 'Bearer ' + this.getToken()
    try {
      const ret = await axios({ method, url, headers, params, data })
      return ret.data
    }
    catch (error) {
      return Promise.reject(error)
    }
  },

  getToken() {
    if (this.token) return this.token
    let token = sessionStorage.getItem('token')
    if (token) return this.token = token
    return null
  },

  setToken(token) {
    sessionStorage.setItem('token', this.token = token)
    return this
  },

  delToken() {
    this.token = null
    sessionStorage.removeItem('token')
    return this
  }
}
