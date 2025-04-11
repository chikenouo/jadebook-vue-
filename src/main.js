import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import apiService from './api'

// Configure axios for real API use when not in development
if (process.env.NODE_ENV !== 'development') {
  // Set base URL for all axios requests
  axios.defaults.baseURL = 'http://localhost:8000/api'

  // Add authorization header with JWT token if available
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // Handle auth errors
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        store.dispatch('logout')
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )
}

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)

// Mount the app directly for now, debug auto-login later
app.mount('#app')

// Log to indicate app is mounted
console.log('Vue app mounted')
