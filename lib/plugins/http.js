import Cookies from 'js-cookie'
import axios from 'axios'

const request = axios.create({ timeout: 5000 })
request.interceptors.response.use(
  response => { return response.data }
)

export default {

  token: null,
  baseURL: null,
  keyName: 'element_extension_token',
  handle: () => {},
  error: () => {},
  
  get (url, params) { return this.request('get', url, params) },
  put (url, data) { return this.request('put', url, null, data) },
  patch (url, data) { return this.request('patch', url, null, data) },
  post (url, data) { return this.request('post', url, null, data) },  
  delete (url, params) { return this.request('delete', url, params) },
  
  async download(url, params, filename) {
    const baseURL = this.baseURL
    const method = 'get'
    const responseType = 'blob'
    const headers = {}
    if (this.token) headers.Authorization = 'Bearer ' + this.getToken()
    return request({method, url, headers, params, responseType, baseURL}).then(data => { 
      if (window.navigator.msSaveOrOpenBlob) return navigator.msSaveBlob(data, filename)
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(data)
      link.download = filename
      link.click()                
      window.URL.revokeObjectURL(link) // 释放内存
    })
    .catch(err => { return err })
  },

  request(method, url, params, data, headers, responseType) {
    const baseURL = this.baseURL
    if (!headers) headers = { Accept: 'application/json' }
    if (this.token) headers.Authorization = 'Bearer ' + this.getToken()
    return request({ method, url, headers, params, data, headers, responseType, baseURL }).then(this.handle).catch(this.error)
  },

  configure(para) {
    if (para.keyName) this.keyName = para.keyName
    if (para.baseURL) this.baseURL = para.baseURL
    if (para.handle) this.handle = para.handle
    if (para.error) this.error = para.error
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
