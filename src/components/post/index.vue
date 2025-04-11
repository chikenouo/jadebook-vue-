<template>
  <div class="post-card">
    <!-- Post Header -->
    <div class="post-header">
      <div class="user-info" @click="goToUserProfile(post.authorId)">
        <img 
          :src="post.author?.photo || require('@/assets/defaultAvatar.svg')" 
          alt="Profile" 
          class="avatar"
        >
        <div>
          <div class="username">{{ post.author?.name || 'Unknown User' }}</div>
          <div class="post-time">{{ formatDate(post.createdAt) }}</div>
        </div>
      </div>
      
      <!-- Post Actions (Edit/Delete) -->
      <div class="post-actions" v-if="isCurrentUserPost">
        <el-dropdown trigger="click">
          <i class="el-icon-more"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="editPost">Edit Post</el-dropdown-item>
              <el-dropdown-item @click="deletePost">Delete Post</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    
    <!-- Post Body -->
    <div class="post-body" @click="goToPostDetail">
      <p>{{ post.content }}</p>
    </div>
    
    <!-- Post Footer -->
    <div class="post-footer">
      <div class="post-stats">
        <span>
          <i class="fas fa-thumbs-up"></i> {{ post.likes || 0 }}
        </span>
        <span @click="goToPostDetail">
          {{ post.comments?.length || 0 }} comments
        </span>
      </div>
      
      <el-divider />
      
      <div class="post-buttons">
        <div class="action-button">
          <i class="fas fa-thumbs-up"></i>
          <span>Like</span>
        </div>
        <div class="action-button" @click="goToPostDetail">
          <i class="fas fa-comment"></i>
          <span>Comment</span>
        </div>
        <div class="action-button">
          <i class="fas fa-share"></i>
          <span>Share</span>
        </div>
      </div>
    </div>
    
    <!-- Edit Post Dialog -->
    <el-dialog
      title="Edit Post"
      v-model="editDialogVisible"
      width="500px"
    >
      <el-form :model="editForm" @submit.prevent="saveEditedPost">
        <el-form-item>
          <el-input
            v-model="editForm.content"
            type="textarea"
            :rows="5"
            placeholder="What's on your mind?"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveEditedPost">Save</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <el-dialog
      title="Delete Post"
      v-model="deleteDialogVisible"
      width="400px"
    >
      <p>Are you sure you want to delete this post? This action cannot be undone.</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="confirmDeletePost">Delete</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PostComponent',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialogVisible: false,
      deleteDialogVisible: false,
      editForm: {
        content: ''
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    isCurrentUserPost() {
      return this.currentUser && this.post.authorId === this.currentUser.id
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Unknown date'
      
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffMins < 60) {
        return diffMins === 0 ? 'Just now' : `${diffMins}m ago`
      } else if (diffHours < 24) {
        return `${diffHours}h ago`
      } else if (diffDays < 7) {
        return `${diffDays}d ago`
      } else {
        return date.toLocaleDateString()
      }
    },
    goToPostDetail() {
      this.$router.push(`/post/${this.post.id}`)
    },
    goToUserProfile(userId) {
      if (userId) {
        this.$router.push(`/user/${userId}`)
      }
    },
    editPost() {
      this.editForm.content = this.post.content
      this.editDialogVisible = true
    },
    async saveEditedPost() {
      if (!this.editForm.content.trim()) return
      
      try {
        await this.$store.dispatch('updatePost', {
          postId: this.post.id,
          postData: { content: this.editForm.content }
        })
        this.editDialogVisible = false
        this.$message.success('Post updated successfully')
      } catch (error) {
        this.$message.error('Failed to update post')
        console.error('Error updating post:', error)
      }
    },
    deletePost() {
      this.deleteDialogVisible = true
    },
    async confirmDeletePost() {
      try {
        await this.$store.dispatch('deletePost', this.post.id)
        this.deleteDialogVisible = false
        this.$message.success('Post deleted successfully')
        this.$emit('delete', this.post.id)
      } catch (error) {
        this.$message.error('Failed to delete post')
        console.error('Error deleting post:', error)
      }
    }
  }
}
</script>

<style scoped>
.post-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
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

.post-time {
  color: #65676b;
  font-size: 13px;
}

.post-actions {
  color: #65676b;
  cursor: pointer;
}

.post-body {
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.5;
  cursor: pointer;
}

.post-footer {
  margin-top: 12px;
}

.post-stats {
  display: flex;
  justify-content: space-between;
  color: #65676b;
  font-size: 14px;
  margin-bottom: 8px;
}

.post-stats span {
  cursor: pointer;
}

.post-stats span:hover {
  text-decoration: underline;
}

.post-buttons {
  display: flex;
  justify-content: space-between;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #65676b;
  font-weight: bold;
  font-size: 14px;
  padding: 6px 0;
  border-radius: 4px;
  flex: 1;
  cursor: pointer;
}

.action-button:hover {
  background-color: #f0f2f5;
}
</style>
