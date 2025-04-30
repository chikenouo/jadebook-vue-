// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Login from '../components/login/index.vue'
import Register from '../components/register/index.vue'
import Home from '../components/home/index.vue'
import PostDetail from '../components/post-detail/index.vue'
import PostCreate from '../components/post-create/index.vue'
import UserProfile from '../components/user-profile/index.vue'
import Settings from '../components/settings/index.vue'
import Marketplace from '../components/marketplace/index.vue'
import { ElMessage } from 'element-plus'
import axios from '@/api/request'
import PostComments from '@/components/post-comments/index.vue'

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
    ],
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/post/:postId/comments',
    name: 'PostComments',
    component: PostComments,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
