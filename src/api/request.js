// src/api/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 200000,
  withCredentials: true, // 確保攜帶 Cookie
})

// 請求攔截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

// 響應攔截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = '網絡錯誤'
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        errorMessage = '登入失效，請重新登入'
      } else {
        errorMessage = error.response.data?.message || '接口訪問異常'
      }
    }
    return Promise.reject(new Error(errorMessage))
  }
)

export default request
