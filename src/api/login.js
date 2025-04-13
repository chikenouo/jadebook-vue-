import request from './request'

// 用戶登入
export const loginApi = (data) => request.post('/api/login', data)
