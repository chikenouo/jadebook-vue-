// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Login from '../components/login/index.vue'
import Register from '../components/register/index.vue'
import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'
import PostCreate from '../views/PostCreate.vue'
import UserProfile from '../views/UserProfile.vue'
import TestPage from '../views/TestPage.vue'
import Settings from '../components/settings/index.vue'
import Marketplace from '../views/Marketplace.vue'
import { ElMessage } from 'element-plus'
import axios from '@/api/request'

const routes = [
  {
    path: '/',
    name: '',
    component: MainLayout,
    redirect: '/login',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: 'post/create',
        name: 'PostCreate',
        component: PostCreate,
        meta: { requiresAuth: true },
      },
      {
        path: 'post/:id',
        name: 'PostDetail',
        component: PostDetail,
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'user/:id',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true },
      },
      {
        path: 'marketplace',
        name: 'Marketplace',
        component: Marketplace,
        meta: { requiresAuth: true },
      },
      {
        path: 'test',
        name: 'TestPage',
        component: TestPage,
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 全局前置守衛
router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false

  // 調用 /api/user/me 檢查認證狀態
  try {
    await axios.get('http://localhost:8080/api/user/me', {
      withCredentials: true,
    })
    isAuthenticated = true
  } catch (error) {
    console.error('Error checking auth status:', error)
    isAuthenticated = false
  }

  // 如果已登入，訪問 /login 時重定向到 /home
  if (to.name === 'Login' && isAuthenticated) {
    next('/home')
  }
  // 如果訪問受保護頁面且未登入，重定向到 /login
  else if (to.meta.requiresAuth && !isAuthenticated) {
    ElMessage.warning('請先登入')
    next('/login')
  } else {
    next()
  }
})

export default router
