<template>
  <div class="user-profile">
    <div v-if="loading" class="loading">
      <el-spinner />
    </div>

    <div v-else-if="profileUser" class="profile-container">
      <div class="profile-header">
        <div class="profile-avatar">
          <img
            :src="profileUser.photo || defaultAvatar"
            :alt="profileUser.name"
          />
          <el-upload
            v-if="isCurrentUser"
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarChange"
          >
            <el-button size="small" type="primary">更換頭像</el-button>
          </el-upload>
        </div>

        <div class="profile-info">
          <h2>{{ profileUser.name }}</h2>
          <p class="bio">{{ profileUser.bio || '這個用戶很懶，什麼都沒寫' }}</p>
          <div class="profile-actions" v-if="isCurrentUser">
            <el-button @click="editProfileModalVisible = true"
              >編輯個人資料</el-button
            >
          </div>
        </div>
      </div>

      <div class="profile-posts">
        <h3>貼文</h3>
        <div class="posts-container">
          <post-component
            v-for="post in userPosts"
            :key="post.postId"
            :post="post"
            :defaultAvatar="defaultAvatar"
            @delete="handlePostDelete"
          />
        </div>

        <div v-if="userPosts.length === 0" class="no-posts">
          目前還沒有任何貼文
        </div>
      </div>
    </div>

    <div v-else class="not-found">找不到該用戶</div>

    <!-- 編輯個人資料對話框 -->
    <el-dialog
      v-model="editProfileModalVisible"
      title="編輯個人資料"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="profileFormRef"
        :model="profileForm"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="profileForm.name" />
        </el-form-item>
        <el-form-item label="電子郵件" prop="email">
          <el-input v-model="profileForm.email" />
        </el-form-item>
        <el-form-item label="電話號碼" prop="phoneNumber">
          <el-input v-model="profileForm.phoneNumber" />
        </el-form-item>
        <el-form-item label="個人簡介" prop="bio">
          <el-input
            v-model="profileForm.bio"
            type="textarea"
            :rows="3"
            placeholder="寫下一些關於你自己的事情"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editProfileModalVisible = false">取消</el-button>
          <el-button type="primary" @click="updateProfile" :loading="updating">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

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
  photo: '',
})

const formRules = {
  name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的電子郵件格式', trigger: 'blur' },
  ],
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
    // 填充編輯表單
    if (isCurrentUser.value) {
      profileForm.value = {
        name: profileUser.value.name,
        email: profileUser.value.email,
        phoneNumber: profileUser.value.phoneNumber || '',
        bio: profileUser.value.bio || '',
        photo: profileUser.value.photo || '',
      }
    }
  } catch (error) {
    ElMessage.error('獲取用戶資料失敗')
    console.error('Error fetching user profile:', error)
  }
}

const fetchUserPosts = async () => {
  try {
    const response = await axios.get(`/api/users/${userId.value}/posts`)
    userPosts.value = response.data
  } catch (error) {
    ElMessage.error('獲取用戶貼文失敗')
    console.error('Error fetching user posts:', error)
  } finally {
    loading.value = false
  }
}

const updateProfile = async () => {
  if (!profileFormRef.value) return

  try {
    await profileFormRef.value.validate()
    updating.value = true

    await axios.put(`/api/users/${userId.value}`, profileForm.value)

    // 更新本地用戶資料
    await userStore.fetchUserData()
    await fetchUserProfile()

    editProfileModalVisible.value = false
    ElMessage.success('個人資料更新成功')
  } catch (error) {
    if (error.name === 'ValidationError') {
      return
    }
    ElMessage.error('更新個人資料失敗')
    console.error('Error updating profile:', error)
  } finally {
    updating.value = false
  }
}

const handleAvatarChange = async (file) => {
  if (!file) return

  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上傳圖片檔案')
    return
  }
  if (!isLt2M) {
    ElMessage.error('圖片大小不能超過 2MB')
    return
  }

  try {
    updating.value = true
    const formData = new FormData()
    formData.append('photo', file.raw)

    await axios.put(`/api/users/${userId.value}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // 更新本地用戶資料
    await userStore.fetchUserData()
    await fetchUserProfile()

    ElMessage.success('頭像更新成功')
  } catch (error) {
    ElMessage.error('上傳頭像失敗')
    console.error('Error uploading avatar:', error)
  } finally {
    updating.value = false
  }
}

const handlePostDelete = async (postId) => {
  try {
    await axios.delete(`/api/posts/${postId}`)
    ElMessage.success('貼文刪除成功')
    await fetchUserPosts()
  } catch (error) {
    ElMessage.error('刪除貼文失敗')
    console.error('Error deleting post:', error)
  }
}

onMounted(async () => {
  await fetchUserProfile()
  await fetchUserPosts()
})
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.profile-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.profile-header {
  padding: 24px;
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  text-align: center;
}

.profile-avatar img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.bio {
  color: #666;
  margin: 0 0 16px;
}

.profile-posts {
  padding: 24px;
}

.profile-posts h3 {
  margin: 0 0 16px;
  font-size: 18px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #666;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
