<!-- sidebar.vue -->
<template>
  <div class="sidebar-container">
    <!-- User Section -->
    <div class="sidebar-section" v-if="currentUser">
      <router-link
        :to="`/user/${currentUser.id}`"
        class="sidebar-item"
        active-class="active"
      >
        <img
          :src="currentUser.photo || require('@/assets/defaultAvatar.svg')"
          alt="Profile"
          class="sidebar-avatar"
        />
        <span>{{ currentUser.userName }}</span>
      </router-link>
    </div>

    <!-- Main Navigation -->
    <div class="sidebar-section">
      <router-link to="/" class="sidebar-item" exact-active-class="active">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </router-link>

      <div class="sidebar-item">
        <i class="fas fa-user-friends"></i>
        <span>Friends</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-users"></i>
        <span>Groups</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-store"></i>
        <span>Marketplace</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-tv"></i>
        <span>Watch</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-bookmark"></i>
        <span>Saved</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-flag"></i>
        <span>Pages</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-calendar-alt"></i>
        <span>Events</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-history"></i>
        <span>Memories</span>
      </div>
    </div>

    <!-- Shortcuts Section -->
    <div class="sidebar-section">
      <div class="section-header">
        <h3>Your Shortcuts</h3>
        <span class="edit-link">Edit</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-gamepad"></i>
        <span>Games</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-images"></i>
        <span>Photos</span>
      </div>

      <div class="sidebar-item">
        <i class="fas fa-video"></i>
        <span>Videos</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="sidebar-footer">
      <div class="footer-links">
        <a href="#">Privacy</a> · <a href="#">Terms</a> ·
        <a href="#">Advertising</a> ·
        <a href="#">Cookies</a>
      </div>
      <div class="copyright">
        Facebook Clone © {{ new Date().getFullYear() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api/request'

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
</script>

<style scoped>
.sidebar-container {
  padding: 20px 8px;
  overflow-y: auto;
  height: calc(100vh - 60px);
}

.sidebar-section {
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 16px;
  margin-bottom: 4px;
}

.section-header h3 {
  font-size: 17px;
  color: #65676b;
  font-weight: 600;
}

.edit-link {
  color: #1877f2;
  font-size: 14px;
  cursor: pointer;
}

.edit-link:hover {
  text-decoration: underline;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.sidebar-item:hover {
  background-color: #f0f2f5;
}

.sidebar-item.active {
  background-color: #e7f3ff;
}

.sidebar-item i {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e4e6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 18px;
  color: #1877f2;
}

.sidebar-item.active i {
  color: #1877f2;
  background-color: #c7e3ff;
}

.sidebar-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.sidebar-footer {
  padding: 16px;
  font-size: 12px;
  color: #65676b;
}

.footer-links {
  margin-bottom: 8px;
}

.footer-links a {
  color: #65676b;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.copyright {
  color: #65676b;
}
</style>
