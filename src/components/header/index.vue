<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '@/api/request'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import defaultAvatar from '@/assets/defaultAvatar.svg'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const userStore = useUserStore()
const { userData: currentUser } = storeToRefs(userStore)

// 處理下拉選單命令
const handleCommand = async (command) => {
  switch (command) {
    case 'profile':
      if (currentUser.value) {
        router.push(`/user/${currentUser.value.id}`)
      }
      break
    case 'logout':
      try {
        // 調用後端登出 API
        await axios.post('/api/logout', {}, { withCredentials: true })
        ElMessage.success('登出成功')
        userStore.logout()
        router.push('/login')
      } catch (error) {
        console.error('Error during logout:', error)
        ElMessage.error('登出失敗')
      }
      break
  }
}
</script>
<!-- header.vue -->
<template>
  <div class="header-container">
    <div class="header-left">
      <!-- Logo -->
      <router-link to="/" class="logo-link">
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
      </router-link>

      <!-- Search Bar -->
      <div class="search-container">
        <el-input
          v-model="searchQuery"
          placeholder="搜尋"
          prefix-icon="el-icon-search"
          class="search-input"
          clearable
        />
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="header-center desktop-only">
      <div class="nav-links">
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: route.path === '/' || route.path === '/home' }"
        >
          <i class="fas fa-home"></i>
        </router-link>
        <router-link
          to="/marketplace"
          class="nav-link"
          exact-active-class="active"
        >
          <i class="fas fa-store"></i>
        </router-link>
      </div>
    </div>

    <!-- User Menu -->
    <div class="header-right">
      <div class="icon-button">
        <i class="fas fa-th"></i>
      </div>
      <div class="icon-button">
        <i class="fas fa-comment"></i>
      </div>
      <div class="icon-button">
        <i class="fas fa-bell"></i>
      </div>

      <!-- User Profile Dropdown -->
      <el-dropdown trigger="click" v-if="currentUser" @command="handleCommand">
        <div class="user-profile">
          <img
            :src="currentUser.photo || defaultAvatar"
            alt="Profile"
            class="avatar"
          />
          <span class="username desktop-only">{{ currentUser?.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <i class="fas fa-user"></i> 個人檔案
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <i class="fas fa-sign-out-alt"></i> 登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- Login Button (if not authenticated) -->
      <router-link v-else to="/login">
        <el-button type="primary" size="small">Login</el-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
}

.search-container {
  position: relative;
}

.search-input {
  width: 240px;
}

.search-input :deep(.el-input__inner) {
  border-radius: 20px;
  background-color: #f0f2f5;
  border: none;
  padding-left: 36px;
}

.search-input :deep(.el-input__prefix) {
  left: 12px;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  position: relative;
  width: 112px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--esun-green-dark);
  border-radius: 8px;
  cursor: pointer;
}

.nav-link i {
  font-size: 22px;
}

.nav-link.active {
  color: var(--esun-green-dark);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--esun-green-dark);
  display: block;
}

.nav-link i {
  color: var(--esun-green);
}

.nav-link.active i {
  color: var(--esun-green-dark);
}

.nav-link:hover:not(.active) {
  background-color: #f0f2f5;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 117, 80, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-button i {
  font-size: 18px;
  color: #4caf50;
}

.icon-button:hover {
  background-color: rgba(0, 117, 80, 0.2);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: bold;
  font-size: 15px;
}

@media screen and (max-width: 768px) {
  .search-input {
    width: 160px;
  }
}
</style>
