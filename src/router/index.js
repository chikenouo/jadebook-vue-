import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'
import PostCreate from '../views/PostCreate.vue'
import UserProfile from '../views/UserProfile.vue'
import { isAuthenticated } from '../utils/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: 'post/create',
        name: 'PostCreate',
        component: PostCreate,
        meta: { requiresAuth: true }
      },
      {
        path: 'post/:id',
        name: 'PostDetail',
        component: PostDetail,
        meta: { requiresAuth: true }
      },
      {
        path: 'user/:id',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    // Redirect to home if authenticated user tries to access login/register
    if (isAuthenticated() && (to.name === 'Login' || to.name === 'Register')) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})

export default router
