<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PostComponent from '@/components/post/index.vue'
import { useUserStore } from '@/stores/userStore'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import axios from '@/api/request'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 狀態
const profileUser = ref(null)
const userPosts = ref([])
const editProfileModalVisible = ref(false)
const loading = ref(true)
const updating = ref(false)
const fileInput = ref(null)

// 表單相關
const profileForm = ref({
  name: '',
  email: '',
  phoneNumber: '',
  bio: '',
  photo: ''
})

const formRules = {
  name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的電子郵件格式', trigger: 'blur' }
  ]
}

const profileFormRef = ref(null)

// 計算屬性
const userId = computed(() => route.params.id)
const currentUser = computed(() => userStore.userData)
const isCurrentUser = computed(() => currentUser.value?.id === userId.value)

// 方法
const fetchUserProfile = async () => {
  try {
    loading.value = true
    const response = await axios.get(`/api/users/${userId.value}`)
    profileUser.value = response.data
    await fetchUserPosts()
  } catch (error) {
    console.error('Error fetching user profile:', error)
    ElMessage.error('無法載入用戶資料')
  } finally {
    loading.value = false
  }
}

const fetchUserPosts = async () => {
  try {
    const response = await axios.get(`/api/users/${userId.value}/posts`)
    userPosts.value = response.data
  } catch (error) {
    console.error('Error fetching user posts:', error)
    ElMessage.error('無法載入貼文')
  }
}

const openEditProfileModal = () => {
  Object.assign(profileForm.value, profileUser.value)
  editProfileModalVisible.value = true
}

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await axios.post('/api/users/avatar', formData)
    profileForm.value.photo = response.data.url
  } catch (error) {
    console.error('Error uploading avatar:', error)
    ElMessage.error('上傳頭像失敗')
  }
}

const saveProfile = async () => {
  if (!profileFormRef.value) return

  try {
    await profileFormRef.value.validate()
    updating.value = true

    const response = await axios.put(`/api/users/${userId.value}`, profileForm.value)
    Object.assign(profileUser.value, response.data)
    userStore.setUserData(response.data)
    editProfileModalVisible.value = false
    ElMessage.success('個人資料已更新')
  } catch (error) {
    console.error('Error updating profile:', error)
    ElMessage.error('更新個人資料失敗')
  } finally {
    updating.value = false
  }
}

const handleDeletePost = async (postId) => {
  try {
    await axios.delete(`/api/posts/${postId}`)
    userPosts.value = userPosts.value.filter(post => post.id !== postId)
    ElMessage.success('貼文已刪除')
  } catch (error) {
    console.error('Error deleting post:', error)
    ElMessage.error('刪除貼文失敗')
  }
}

const goToCreatePost = () => {
  router.push('/post/create')
}

// 生命週期鉤子
onMounted(() => {
  fetchUserProfile()
})
</script>

<template>
  <div class="profile-container">
    <!-- Cover Photo -->
    <div class="cover-photo">
      <div class="profile-info">
        <div class="profile-avatar">
          <img
            :src="profileUser?.photo || defaultAvatar"
            alt="Profile"
            class="avatar"
          />
        </div>
        <div class="profile-details">
          <h1 class="profile-name">{{ profileUser?.name || 'User' }}</h1>
        </div>
      </div>
    </div>

    <!-- Profile Navigation -->
    <div class="profile-nav">
      <div class="nav-links">
        <div class="nav-link active">Posts</div>
        <div class="nav-link">About</div>
        <div class="nav-link">Friends</div>
        <div class="nav-link">Photos</div>
      </div>

      <div class="nav-actions" v-if="isCurrentUser">
        <el-button type="primary" size="small" @click="openEditProfileModal">
          <i class="fas fa-pencil-alt"></i> 編輯個人資料
        </el-button>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-content">
      <div class="profile-sidebar desktop-only">
        <!-- Intro Section -->
        <div class="profile-card">
          <h3>Intro</h3>
          <p v-if="profileUser?.bio">{{ profileUser.bio }}</p>
          <p v-else class="no-bio">No bio added yet.</p>
        </div>
      </div>

      <div class="profile-feed">
        <!-- Create Post Card (if current user) -->
        <div class="create-post-card" v-if="isCurrentUser">
          <div class="create-post-header">
            <img
              :src="profileUser?.photo || defaultAvatar"
              alt="Profile"
              class="avatar-small"
            />
            <el-button class="create-post-button" @click="goToCreatePost">
              What's on your mind,
              {{ profileUser?.name?.split(' ')[0] || 'there' }}?
            </el-button>
          </div>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="loading">
          <el-skeleton :rows="3" animated />
          <el-divider />
          <el-skeleton :rows="3" animated />
        </div>

        <!-- Posts List -->
        <div v-else-if="userPosts.length > 0">
          <PostComponent
            v-for="post in userPosts"
            :key="post.id"
            :post="post"
            @delete="handleDeletePost"
          />
        </div>

        <!-- No Posts Message -->
        <div v-else class="no-posts">
          <i class="el-icon-document"></i>
          <h3>No posts yet</h3>
          <p v-if="isCurrentUser">Share something with your friends!</p>
          <p v-else>This user hasn't posted anything yet.</p>
          <el-button
            v-if="isCurrentUser"
            type="primary"
            @click="goToCreatePost"
          >
            Create Post
          </el-button>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <el-dialog
      v-model="editProfileModalVisible"
      title="編輯個人資料"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="profileFormRef"
        :model="profileForm"
        :rules="formRules"
        label-width="100px"
      >
        <div class="edit-profile-avatar">
          <img
            :src="profileForm.photo || defaultAvatar"
            alt="Avatar"
            class="edit-avatar"
          />
          <el-button
            type="primary"
            size="small"
            class="change-avatar-btn"
            @click="fileInput.click()"
          >
            更換頭像
          </el-button>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept="image/*"
            @change="handleAvatarChange"
          />
        </div>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="profileForm.name" />
        </el-form-item>

        <el-form-item label="電子郵件" prop="email">
          <el-input v-model="profileForm.email" />
        </el-form-item>

        <el-form-item label="手機號碼" prop="phoneNumber">
          <el-input v-model="profileForm.phoneNumber" disabled />
          <div class="form-hint">手機號碼無法修改</div>
        </el-form-item>

        <el-form-item label="自我介紹" prop="bio">
          <el-input v-model="profileForm.bio" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editProfileModalVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProfile" :loading="updating">
            儲存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cover-photo {
  height: 200px;
  background-color: #f0f2f5;
  border-radius: 8px;
  position: relative;
  margin-bottom: 16px;
}

.profile-info {
  position: absolute;
  bottom: -30px;
  left: 20px;
  display: flex;
  align-items: flex-end;
}

.profile-avatar {
  margin-right: 20px;
}

.avatar {
  width: 168px;
  height: 168px;
  border-radius: 50%;
  border: 4px solid white;
  background-color: white;
}

.profile-name {
  margin: 0 0 20px 0;
  font-size: 32px;
  color: #1c1e21;
}

.profile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 50px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  padding: 16px 0;
  color: #65676b;
  font-weight: 600;
  cursor: pointer;
}

.nav-link.active {
  color: var(--el-color-primary);
  border-bottom: 2px solid var(--el-color-primary);
}

.profile-content {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 20px;
  margin-top: 20px;
}

.profile-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.create-post-card {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.create-post-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.create-post-button {
  flex-grow: 1;
  text-align: left;
  background-color: #f0f2f5;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
}

.edit-profile-avatar {
  text-align: center;
  margin-bottom: 20px;
}

.edit-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.form-hint {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.no-posts {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.no-bio {
  color: #65676b;
  font-style: italic;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .profile-content {
    grid-template-columns: 1fr;
  }
}
</style>