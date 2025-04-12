// main.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/element-theme.css'
import App from './App.vue'
import router from './router'
import request from './api/request' // 直接導入 request.js

const app = createApp(App)

// 全局配置
app.config.globalProperties.$axios = request // 使用 request.js 中的實例

// 使用插件
app.use(ElementPlus, {
  size: 'default',
})
app.use(router)

// 等待路由準備就緒後再掛載應用
router.isReady().then(() => {
  app.mount('#app')
})

console.log('Vue app mounted')
