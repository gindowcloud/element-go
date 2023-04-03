import axios from  'axios'

// 请求模型
const request = axios.create()

// 请求失败
const error = (data: { code?: string, message?: string }) => {
  return Promise.reject(data)
}

// 响应处理
request.interceptors.response.use(
  response => response.data.code === 200 || response.config.responseType === 'blob' ? response.data : error(response.data),
  error => error(error.response.data)
)

export default {
  get (url: string, params?: {}) { return this.request('get', url, params, {}) },
  put (url: string, data?: {}) { return this.request('put', url, {}, data) },
  patch (url: string, data?: {}) { return this.request('patch', url, {}, data) },
  delete (url: string, params?: {}) { return this.request('delete', url, params, {}) },
  post (url: string, data?: {}) { return this.request('post', url, {}, data) },
  request (method: string, url: string, params?: {}, data?: {}) {
    return request({ method, url, params, data })
  }
}
