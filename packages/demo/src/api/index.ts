import request from './request'
import '../mocks/users.ts' // Mock

export default {
  users: (para?: {}) => request.get('users', para)
}
