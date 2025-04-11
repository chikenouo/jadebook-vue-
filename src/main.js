import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mockApi from './services/mockApi'

// For demo purposes, replace axios with mockApi
const api = process.env.NODE_ENV === 'development' ? mockApi : axios;

// If using real axios
if (api === axios) {
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

// Make api available globally
window.$api = api;

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)

// Auto login for demo purposes
store.dispatch('autoLogin').finally(() => {
  app.mount('#app')
})
