import Cookies from 'js-cookie'
import axios from 'axios'

export default {

  token: null,
  baseURL: null,
  keyName: 'token_element_go',
  resolve: () => {},
  reject: () => {},
  timeout: 5000,
  
  get(url, params) { return this.request('get', url, params) },
  put(url, data) { return this.request('put', url, null, data) },
  patch(url, data) { return this.request('patch', url, null, data) },
  post(url, data) { return this.request('post', url, null, data) },  
  delete(url, params) { return this.request('delete', url, params) },
  
  async download(url, params, filename) {
    const baseURL = this.baseURL
    const method = 'get'
    const responseType = 'blob'
    const headers = {}
    if (this.token) headers.Authorization = 'Bearer ' + this.getToken()
    return axios({ method, url, headers, params, responseType, baseURL }).then(data => { 
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
    const timeout = this.timeout
    if (!headers) headers = { Accept: 'application/json' }
    if (this.token) headers.Authorization = 'Bearer ' + this.getToken()
    return axios({ method, url, headers, params, data, headers, responseType, baseURL, timeout }).then(this.resolve).catch(this.reject)
  },

  configure(para) {
    if (para.timeout) this.timeout = para.timeout
    if (para.keyName) this.keyName = para.keyName
    if (para.baseURL) this.baseURL = para.baseURL
    if (para.resolve) this.resolve = para.resolve
    if (para.reject) this.reject = para.reject
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
