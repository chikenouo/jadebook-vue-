// src/stores/userStore.js
import { defineStore } from 'pinia'

// 解析 JWT token 的函數
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Error parsing JWT token:', e)
    return {}
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userData: null,
    userId: null, // 新增 userId 狀態
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserData: (state) => state.userData,
    getUserId: (state) => state.userId, // 新增 getter
  },

  actions: {
    setUserData(data) {
      this.userData = data
    },

    setToken(token) {
      this.token = token
      // 解析 token 中的 sub 字段作為 userId
      if (token) {
        const payload = parseJwt(token)
        this.userId = payload.sub || null
      } else {
        this.userId = null
      }
    },

    login({ token, userData }) {
      this.setToken(token) // 會自動解析 userId
      this.userData = userData
      // 持久化儲存
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
    },

    logout() {
      this.token = null
      this.userData = null
      this.userId = null
      localStorage.removeItem('loginUser')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    // 初始化用戶數據（例如頁面刷新時）
    initialize() {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        this.setToken(token)
        this.userData = JSON.parse(userData)
      }
    },
  },
})
