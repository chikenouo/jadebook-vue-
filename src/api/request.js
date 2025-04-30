// src/api/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
<<<<<<< HEAD
import { useUserStore } from '@/stores/userStore'
=======
<<<<<<< HEAD
import { useUserStore } from '@/stores/userStore'
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 200000,
  withCredentials: true, // 確保攜帶 Cookie
})

// 請求攔截器
request.interceptors.request.use((config) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
<<<<<<< HEAD
=======
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  return config
})

// 響應攔截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
<<<<<<< HEAD
=======
=======
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
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  }
)

export default request
