<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '@/api/request'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import defaultAvatar from '@/assets/defaultAvatar.svg'

const router = useRouter()
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
<<<<<<< HEAD
=======
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
<!-- header.vue -->
<template>
  <div class="header-container">
    <div class="header-left">
      <!-- Logo -->
      <router-link to="/" class="logo-link">
<<<<<<< HEAD
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
=======
<<<<<<< HEAD
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
=======
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
        <router-link to="/" class="nav-link" active-class="active">
          <i class="fas fa-home"></i>
        </router-link>
        <router-link to="/marketplace" class="nav-link" active-class="active">
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
            :src="currentUser.photo || defaultAvatar"
            alt="Profile"
            class="avatar"
          />
          <span class="username desktop-only">{{ currentUser?.name }}</span>
<<<<<<< HEAD
=======
=======
            :src="currentUser.photo || require('@/assets/defaultAvatar.svg')"
            alt="Profile"
            class="avatar"
          />
          <span class="username desktop-only">{{ currentUser.userName }}</span>
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '@/api/request'

const router = useRouter()
const searchQuery = ref('')
const currentUser = ref(null)

// 獲取當前用戶資料
onMounted(async () => {
  try {
    const response = await axios.get('/api/user/me', {
      withCredentials: true,
    })
    currentUser.value = response.data
  } catch (error) {
    console.error('Error fetching current user:', error)
    currentUser.value = null
  }
})

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
        currentUser.value = null
        router.push('/login')
      } catch (error) {
        console.error('Error during logout:', error)
        ElMessage.error('登出失敗')
      }
      break
  }
}
</script>

>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
  color: var(--esun-green);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--esun-green);
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
  color: var(--esun-green);
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
