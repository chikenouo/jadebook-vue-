// src/api/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 200000,
  withCredentials: true, // 確保攜帶 Cookie
})

// 請求攔截器
request.interceptors.request.use((config) => {
  return config
})

// 響應攔截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        ElMessage.error('登入失效，請重新登入')
        return Promise.reject(new Error('未授權'))
      }
      ElMessage.error('接口訪問異常')
    } else {
      ElMessage.error('網絡錯誤')
    }
    return Promise.reject(error)
  }
)

export default request
