<template>
  <div class="post-create-container">
    <div class="post-create-card">
      <div class="post-create-header">
        <h2>Create Post</h2>
        <el-button icon="el-icon-close" circle @click="goBack"></el-button>
      </div>

      <el-divider />

      <div class="post-create-user">
        <img
          :src="currentUser?.photo || require('@/assets/defaultAvatar.svg')"
          alt="Profile"
          class="avatar"
        />
        <div class="user-info">
          <div class="username">{{ currentUser?.name || 'User' }}</div>
        </div>
      </div>

      <div class="post-create-form">
        <el-form
          :model="postForm"
          :rules="rules"
          ref="postForm"
          @submit.prevent="createPost"
        >
          <el-form-item prop="content">
            <el-input
              v-model="postForm.content"
              type="textarea"
              :rows="5"
              placeholder="What's on your mind?"
              resize="none"
              autofocus
            />
          </el-form-item>

          <div class="post-create-actions">
            <div class="add-to-post">
              <span>Add to your post:</span>
              <div class="actions-icons">
                <i class="fas fa-images" title="Photo/Video"></i>
                <i class="fas fa-user-tag" title="Tag People"></i>
                <i class="fas fa-smile" title="Feeling/Activity"></i>
                <i class="fas fa-map-marker-alt" title="Check in"></i>
              </div>
            </div>
          </div>

          <el-form-item>
            <el-button
              type="primary"
              class="post-submit-button"
              native-type="submit"
              :loading="loading"
              :disabled="!postForm.content.trim()"
            >
              Post
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCreate',
  data() {
    return {
      postForm: {
        content: '',
      },
      rules: {
        content: [
          {
            required: true,
            message: 'Please enter post content',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    loading() {
      return this.$store.getters.isLoading
    },
  },
  methods: {
    async createPost() {
      if (!this.postForm.content.trim()) return

      try {
        await this.$refs.postForm.validate()

        await this.$store.dispatch('createPost', this.postForm)

        this.$message.success('Post created successfully')
        this.$router.push('/')
      } catch (error) {
        this.$message.error('Failed to create post')
        console.error('Error creating post:', error)
      }
    },
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.post-create-container {
  max-width: 500px;
  margin: 0 auto;
}

.post-create-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.post-create-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-create-header h2 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.post-create-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0;
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

.post-create-form {
  margin-top: 16px;
}

.post-create-actions {
  margin: 16px 0;
}

.add-to-post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #e4e6eb;
  border-radius: 8px;
}

.add-to-post span {
  color: #65676b;
  font-size: 14px;
}

.actions-icons {
  display: flex;
  gap: 16px;
}

.actions-icons i {
  font-size: 20px;
  color: #45bd62;
  cursor: pointer;
}

.actions-icons i:nth-child(2) {
  color: #1877f2;
}

.actions-icons i:nth-child(3) {
  color: #f7b928;
}

.actions-icons i:nth-child(4) {
  color: #f5533d;
}

.post-submit-button {
  width: 100%;
  background-color: #1877f2;
  border-color: #1877f2;
  font-weight: bold;
  font-size: 16px;
  height: 36px;
}

.post-submit-button:disabled {
  background-color: #e4e6eb;
  border-color: #e4e6eb;
  color: #bcc0c4;
}
</style>
