import Cookies from 'js-cookie'
import axios from 'axios'

export default {

  keyName: 'element_extension_token',
  baseURL: null,
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
      const ret = await axios({ method, url, headers, params, data, baseURL: this.baseURL })
      return ret.data
    }
    catch (error) {
      return Promise.reject(error)
    }
  },

  base(url) {
    this.baseURL = url
  },

  getToken() {
    if (this.token) return this.token
    return this.token = Cookies.get(this.keyName)
  },

  setToken(token) {
    return Cookies.set(this.keyName, this.token = token)
  },
  
  delToken() {
    this.token = null
    return Cookies.remove(this.keyName)
  }
}
