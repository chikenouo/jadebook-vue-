<template>
  <div class="profile-container">
    <!-- Cover Photo -->
    <div class="cover-photo">
      <div class="profile-info">
        <div class="profile-avatar">
          <img 
            :src="profileUser?.photo || require('@/assets/defaultAvatar.svg')" 
            alt="Profile" 
            class="avatar"
          >
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
        ref="profileForm" 
        :model="profileForm" 
        :rules="formRules"
        label-width="100px"
      >
        <div class="edit-profile-avatar">
          <img 
            :src="profileForm.photo || require('@/assets/defaultAvatar.svg')" 
            alt="Avatar" 
            class="edit-avatar"
          >
          <el-button 
            type="primary" 
            size="small" 
            class="change-avatar-btn"
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
        
        <el-form-item label="手機號碼" prop="phoneNumber">
          <el-input v-model="profileForm.phoneNumber" disabled />
          <div class="form-hint">手機號碼無法修改</div>
        </el-form-item>
        
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
            儲存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

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
    }
  }
}
</script>

<style scoped>
.profile-container {
  width: 100%;
}

.cover-photo {
  height: 200px;
  background-color: var(--esun-green);
  border-radius: 8px 8px 0 0;
  position: relative;
  margin-bottom: 60px;
}

.profile-info {
  position: absolute;
  bottom: -40px;
  left: 20px;
  display: flex;
  align-items: flex-end;
}

.profile-avatar {
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
  color: #1c1e21;
}

.profile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 0 16px;
  margin-bottom: 20px;
  border-top: 1px solid #e4e6eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
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
}

.no-bio {
  color: #65676b;
  font-style: italic;
}

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
</style>
