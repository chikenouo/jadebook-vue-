<<<<<<< HEAD
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

=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
<template>
  <div class="profile-container">
    <!-- Cover Photo -->
    <div class="cover-photo">
      <div class="profile-info">
        <div class="profile-avatar">
<<<<<<< HEAD
          <img
            :src="profileUser?.photo || defaultAvatar"
            alt="Profile"
            class="avatar"
          />
=======
          <img 
            :src="profileUser?.photo || require('@/assets/defaultAvatar.svg')" 
            alt="Profile" 
            class="avatar"
          >
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
        </div>
        <div class="profile-details">
          <h1 class="profile-name">{{ profileUser?.name || 'User' }}</h1>
        </div>
      </div>
    </div>
<<<<<<< HEAD

=======
    
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
    <!-- Profile Navigation -->
    <div class="profile-nav">
      <div class="nav-links">
        <div class="nav-link active">Posts</div>
        <div class="nav-link">About</div>
        <div class="nav-link">Friends</div>
        <div class="nav-link">Photos</div>
      </div>
<<<<<<< HEAD

=======
      
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
      <div class="nav-actions" v-if="isCurrentUser">
        <el-button type="primary" size="small" @click="openEditProfileModal">
          <i class="fas fa-pencil-alt"></i> 編輯個人資料
        </el-button>
      </div>
    </div>
<<<<<<< HEAD

=======
    
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
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
<<<<<<< HEAD

=======
      
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
      <div class="profile-feed">
        <!-- Create Post Card (if current user) -->
        <div class="create-post-card" v-if="isCurrentUser">
          <div class="create-post-header">
<<<<<<< HEAD
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

=======
            <img 
              :src="profileUser?.photo || require('@/assets/defaultAvatar.svg')" 
              alt="Profile" 
              class="avatar-small"
            >
            <el-button 
              class="create-post-button" 
              @click="goToCreatePost"
            >
              What's on your mind, {{ profileUser?.name?.split(' ')[0] || 'there' }}?
            </el-button>
          </div>
        </div>
        
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
        <!-- Loading Skeleton -->
        <div v-if="loading">
          <el-skeleton :rows="3" animated />
          <el-divider />
          <el-skeleton :rows="3" animated />
        </div>
<<<<<<< HEAD

        <!-- Posts List -->
        <div v-else-if="userPosts.length > 0">
          <PostComponent
            v-for="post in userPosts"
            :key="post.id"
            :post="post"
            @delete="handleDeletePost"
          />
        </div>

=======
        
        <!-- Posts List -->
        <div v-else-if="userPosts.length > 0">
          <PostComponent 
            v-for="post in userPosts" 
            :key="post.id" 
            :post="post" 
            @delete="handleDeletePost"
          />
        </div>
        
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
        <!-- No Posts Message -->
        <div v-else class="no-posts">
          <i class="el-icon-document"></i>
          <h3>No posts yet</h3>
          <p v-if="isCurrentUser">Share something with your friends!</p>
          <p v-else>This user hasn't posted anything yet.</p>
<<<<<<< HEAD
          <el-button
            v-if="isCurrentUser"
            type="primary"
=======
          <el-button 
            v-if="isCurrentUser" 
            type="primary" 
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
            @click="goToCreatePost"
          >
            Create Post
          </el-button>
        </div>
      </div>
    </div>
<<<<<<< HEAD

=======
    
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
    <!-- Edit Profile Modal -->
    <el-dialog
      v-model="editProfileModalVisible"
      title="編輯個人資料"
      width="500px"
      destroy-on-close
    >
<<<<<<< HEAD
      <el-form
        ref="profileFormRef"
        :model="profileForm"
=======
      <el-form 
        ref="profileForm" 
        :model="profileForm" 
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
        :rules="formRules"
        label-width="100px"
      >
        <div class="edit-profile-avatar">
<<<<<<< HEAD
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

=======
          <img 
            :src="profileForm.photo || require('@/assets/defaultAvatar.svg')" 
            alt="Avatar" 
            class="edit-avatar"
          >
          <el-button 
            type="primary" 
            size="small" 
            class="change-avatar-btn"
            @click="$refs.fileInput.click()"
          >
            更換頭像
          </el-button>
          <input 
            type="file" 
            ref="fileInput"
            style="display: none;"
            accept="image/*"
            @change="handleAvatarChange"
          >
        </div>
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="profileForm.name" />
        </el-form-item>
        
        <el-form-item label="電子郵件" prop="email">
          <el-input v-model="profileForm.email" />
        </el-form-item>
        
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
        <el-form-item label="手機號碼" prop="phoneNumber">
          <el-input v-model="profileForm.phoneNumber" disabled />
          <div class="form-hint">手機號碼無法修改</div>
        </el-form-item>
<<<<<<< HEAD

        <el-form-item label="自我介紹" prop="bio">
          <el-input v-model="profileForm.bio" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editProfileModalVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProfile" :loading="updating">
=======
        
        <el-form-item label="自我介紹" prop="bio">
          <el-input 
            v-model="profileForm.bio"
            type="textarea"
            :rows="4"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editProfileModalVisible = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="saveProfile"
            :loading="updating"
          >
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
            儲存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<<<<<<< HEAD
<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
=======
<script>
import PostComponent from '@/components/post/index.vue'

export default {
  name: 'UserProfileView',
  components: {
    PostComponent
  },
  data() {
    return {
      profileUser: null,
      userPosts: [],
      editProfileModalVisible: false,
      profileForm: {
        name: '',
        email: '',
        phoneNumber: '',
        bio: '',
        photo: ''
      },
      formRules: {
        name: [
          { required: true, message: '請輸入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '請輸入電子郵件', trigger: 'blur' },
          { type: 'email', message: '請輸入有效的電子郵件格式', trigger: 'blur' }
        ]
      },
      updating: false
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    currentUser() {
      return this.$store.getters.currentUser
    },
    isCurrentUser() {
      return this.currentUser && this.profileUser && this.currentUser.id === this.profileUser.id
    },
    loading() {
      return this.$store.getters.isLoading
    }
  },
  created() {
    this.fetchUserData()
    this.fetchUserPosts()
  },
  methods: {
    async fetchUserData() {
      try {
        // This would be replaced with an actual API call to get user data
        // For now, using current user if it's the current user's profile
        if (this.currentUser && this.userId === this.currentUser.id) {
          this.profileUser = this.currentUser
        } else {
          // Mock user data - in a real app, this would come from an API
          // API call would be something like:
          // const response = await this.$store.dispatch('fetchUserById', this.userId)
          // this.profileUser = response.data
          this.profileUser = {
            id: this.userId,
            name: 'Sample User',
            photo: null,
            bio: 'This is a sample user profile for demonstration purposes.'
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        this.$message.error('Failed to load user profile')
      }
    },
    async fetchUserPosts() {
      try {
        // In a real app, this would dispatch an action to fetch user's posts
        // await this.$store.dispatch('fetchUserPosts', this.userId)
        // this.userPosts = this.$store.getters.userPosts
        
        // For demo, using all posts from store if it's current user
        if (this.currentUser && this.userId === this.currentUser.id) {
          this.userPosts = this.$store.getters.allPosts.filter(
            post => post.authorId === this.currentUser.id
          )
        } else {
          // Empty array for other users (in real app, would fetch from API)
          this.userPosts = []
        }
      } catch (error) {
        console.error('Error fetching user posts:', error)
      }
    },
    goToCreatePost() {
      this.$router.push('/post/create')
    },
    async handleDeletePost(postId) {
      try {
        await this.$store.dispatch('deletePost', postId)
        this.$message.success('Post deleted successfully')
        // Remove the deleted post from local array
        this.userPosts = this.userPosts.filter(post => post.id !== postId)
      } catch (error) {
        this.$message.error('Failed to delete post')
        console.error('Error deleting post:', error)
      }
    },
    
    openEditProfileModal() {
      // Initialize form with current user data
      this.profileForm = {
        name: this.profileUser?.name || '',
        email: this.profileUser?.email || '',
        phoneNumber: this.profileUser?.phoneNumber || '',
        bio: this.profileUser?.bio || '',
        photo: this.profileUser?.photo || ''
      }
      this.editProfileModalVisible = true
    },
    
    handleAvatarChange(e) {
      const file = e.target.files[0]
      if (!file) return
      
      // In a real app, you would upload the file to a server
      // For now, we'll use a FileReader to create a data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        this.profileForm.photo = e.target.result
      }
      reader.readAsDataURL(file)
    },
    
    async saveProfile() {
      try {
        await this.$refs.profileForm.validate()
        
        this.updating = true
        
        // In a real app, this would be an API call
        // For demo, we'll update the store directly
        await this.$store.dispatch('updateUserProfile', {
          userId: this.currentUser.id,
          userData: {
            name: this.profileForm.name,
            email: this.profileForm.email,
            bio: this.profileForm.bio,
            photo: this.profileForm.photo
          }
        })
        
        // Update local profileUser object
        this.profileUser = {
          ...this.profileUser,
          name: this.profileForm.name,
          email: this.profileForm.email,
          bio: this.profileForm.bio,
          photo: this.profileForm.photo
        }
        
        this.$message.success('個人資料已更新')
        this.editProfileModalVisible = false
      } catch (error) {
        this.$message.error('更新個人資料失敗')
        console.error('Error updating profile:', error)
      } finally {
        this.updating = false
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  width: 100%;
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
}

.cover-photo {
  height: 200px;
<<<<<<< HEAD
  background-color: #f0f2f5;
  border-radius: 8px;
  position: relative;
  margin-bottom: 16px;
=======
  background-color: var(--esun-green);
  border-radius: 8px 8px 0 0;
  position: relative;
  margin-bottom: 60px;
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
}

.profile-info {
  position: absolute;
<<<<<<< HEAD
  bottom: -30px;
=======
  bottom: -40px;
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
  left: 20px;
  display: flex;
  align-items: flex-end;
}

.profile-avatar {
<<<<<<< HEAD
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
=======
  position: relative;
}

.avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  object-fit: cover;
  background-color: white;
}

.profile-details {
  margin-left: 20px;
  margin-bottom: 15px;
}

.profile-name {
  font-size: 28px;
  font-weight: bold;
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
  color: #1c1e21;
}

.profile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
<<<<<<< HEAD
  padding: 0 20px;
  margin-top: 50px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
=======
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 0 16px;
  margin-bottom: 20px;
  border-top: 1px solid #e4e6eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
}

.nav-links {
  display: flex;
<<<<<<< HEAD
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
=======
}

.nav-link {
  padding: 16px;
  font-weight: bold;
  color: #65676b;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.nav-link.active {
  color: var(--esun-green);
  border-bottom-color: var(--esun-green);
}

.nav-link:hover:not(.active) {
  background-color: #f2f2f2;
  border-radius: 6px;
}

.profile-content {
  display: flex;
  gap: 20px;
}

.profile-sidebar {
  flex: 0 0 360px;
}

.profile-feed {
  flex: 1;
  max-width: 680px;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
}

.profile-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
}

.no-bio {
  color: #65676b;
  font-style: italic;
}

<<<<<<< HEAD
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .profile-content {
    grid-template-columns: 1fr;
  }
}
</style>
=======
.create-post-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin-bottom: 20px;
}

.create-post-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.create-post-button {
  flex: 1;
  text-align: left;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f2f5;
  color: #65676b;
  border: none;
}

.no-posts {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
  text-align: center;
}

.no-posts i {
  font-size: 48px;
  color: #bcc0c4;
  margin-bottom: 20px;
}

.no-posts h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #1c1e21;
}

.no-posts p {
  font-size: 16px;
  color: #65676b;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .profile-content {
    flex-direction: column;
  }
  
  .profile-sidebar {
    flex: 1;
    width: 100%;
  }
  
  .profile-feed {
    width: 100%;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .profile-name {
    font-size: 22px;
  }
  
  .cover-photo {
    margin-bottom: 40px;
  }
  
  .profile-info {
    bottom: -30px;
  }
}

.edit-profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.edit-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #e4e6eb;
}

.change-avatar-btn {
  margin-top: 10px;
}

.form-hint {
  font-size: 12px;
  color: #8a8d91;
  margin-top: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
