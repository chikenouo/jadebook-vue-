<template>
  <div class="post-detail-container">
    <!-- Back Button -->
    <div class="back-button-container">
      <el-button icon="el-icon-arrow-left" @click="goBack">Back</el-button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <i class="el-icon-warning-outline"></i>
      <h3>Error Loading Post</h3>
      <p>{{ error }}</p>
      <el-button @click="fetchPostDetails">Try Again</el-button>
    </div>

    <!-- Post Content -->
    <div v-else-if="post" class="post-content">
      <!-- Post Card -->
      <div class="post-card">
        <div class="post-header">
          <div class="user-info">
            <img
              :src="post.author?.photo || require('@/assets/defaultAvatar.svg')"
              alt="Profile"
              class="avatar"
            />
            <div>
              <div class="username">
                {{ post.author?.name || 'Unknown User' }}
              </div>
              <div class="post-time">{{ formatDate(post.createdAt) }}</div>
            </div>
          </div>

          <!-- Post Actions (Edit/Delete) -->
          <div class="post-actions" v-if="isCurrentUserPost">
            <el-dropdown trigger="click">
              <i class="el-icon-more"></i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="editPost"
                    >Edit Post</el-dropdown-item
                  >
                  <el-dropdown-item @click="deletePost"
                    >Delete Post</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <div class="post-body">
          <p>{{ post.content }}</p>
        </div>

        <div class="post-footer">
          <div class="post-stats">
            <span>
              <i class="fas fa-thumbs-up"></i> {{ post.likes || 0 }}
            </span>
            <span> {{ post.comments?.length || 0 }} 則留言 </span>
          </div>

          <el-divider />

          <div class="post-buttons">
            <div class="action-button">
              <i class="fas fa-thumbs-up"></i>
              <span>讚</span>
            </div>
            <div class="action-button">
              <i class="fas fa-comment"></i>
              <span>留言</span>
            </div>
            <div class="action-button">
              <i class="fas fa-share"></i>
              <span>分享</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Comment Section -->
      <div class="comments-section">
        <h3>留言</h3>

        <!-- Add Comment Form -->
        <div class="add-comment" v-if="isAuthenticated">
          <img
            :src="currentUser?.photo || require('@/assets/defaultAvatar.svg')"
            alt="Profile"
            class="avatar"
          />
          <div class="comment-input">
            <el-input
              v-model="newComment"
              type="textarea"
              :rows="2"
              placeholder="寫下你的留言..."
              @keyup.enter="addComment"
            />
            <el-button
              type="primary"
              size="small"
              @click="addComment"
              :disabled="!newComment.trim()"
            >
              發佈留言
            </el-button>
          </div>
        </div>

        <!-- Comments List -->
        <div
          v-if="post.comments && post.comments.length > 0"
          class="comments-list"
        >
          <CommentComponent
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
        <div v-else class="no-comments">
          <p>暫無留言。成為第一個留言的人吧！</p>
        </div>
      </div>
    </div>

    <!-- No Post Found -->
    <div v-else class="not-found">
      <i class="el-icon-document"></i>
      <h3>貼文不存在</h3>
      <p>您查找的貼文不存在或已被移除。</p>
      <el-button type="primary" @click="goHome">返回首頁</el-button>
    </div>

    <!-- Edit Post Dialog -->
    <el-dialog title="編輯貼文" v-model="editDialogVisible" width="500px">
      <el-form :model="editForm" @submit.prevent="saveEditedPost">
        <el-form-item>
          <el-input
            v-model="editForm.content"
            type="textarea"
            :rows="5"
            placeholder="你在想什麼？"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditedPost">儲存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Delete Confirmation Dialog -->
    <el-dialog title="刪除貼文" v-model="deleteDialogVisible" width="400px">
      <p>確定要刪除這則貼文嗎？此操作無法復原。</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDeletePost">刪除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import CommentComponent from '@/components/comment/index.vue'

export default {
  name: 'PostDetailView',
  components: {
    CommentComponent,
  },
  data() {
    return {
      newComment: '',
      editDialogVisible: false,
      deleteDialogVisible: false,
      editForm: {
        content: '',
      },
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    },
    post() {
      return this.$store.getters.currentPost
    },
    currentUser() {
      return this.$store.getters.currentUser
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    loading() {
      return this.$store.getters.isLoading
    },
    error() {
      return this.$store.getters.error
    },
    isCurrentUserPost() {
      return (
        this.post &&
        this.currentUser &&
        this.post.authorId === this.currentUser.id
      )
    },
  },
  created() {
    this.fetchPostDetails()

    // 监听路由变化，当路由参数改变时重新获取帖子详情
    this.$watch(
      () => this.$route.params.id,
      (newId) => {
        if (newId && newId !== this.postId) {
          this.fetchPostDetails()
        }
      }
    )
  },
  methods: {
    async fetchPostDetails() {
      try {
        console.log('Fetching post with ID:', this.postId)
        await this.$store.dispatch('fetchPostById', this.postId)
        console.log('Fetched post:', this.$store.getters.currentPost)
      } catch (error) {
        console.error('Error fetching post details:', error)
      }
    },
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
    async addComment() {
      if (!this.newComment.trim()) return

      try {
        await this.$store.dispatch('addComment', {
          postId: this.postId,
          commentData: { content: this.newComment },
        })
        this.newComment = ''
      } catch (error) {
        this.$message.error('Failed to add comment')
        console.error('Error adding comment:', error)
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
          postId: this.postId,
          postData: { content: this.editForm.content },
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
        await this.$store.dispatch('deletePost', this.postId)
        this.deleteDialogVisible = false
        this.$message.success('Post deleted successfully')
        this.goHome()
      } catch (error) {
        this.$message.error('Failed to delete post')
        console.error('Error deleting post:', error)
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.post-detail-container {
  max-width: 680px;
  margin: 0 auto;
}

.back-button-container {
  margin-bottom: 20px;
}

.loading-container,
.error-container,
.not-found {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
  text-align: center;
  margin-bottom: 20px;
}

.error-container i,
.not-found i {
  font-size: 48px;
  color: #bcc0c4;
  margin-bottom: 20px;
}

.error-container h3,
.not-found h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #1c1e21;
}

.error-container p,
.not-found p {
  font-size: 16px;
  color: #65676b;
  margin-bottom: 20px;
}

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

.comments-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
}

.comments-section h3 {
  font-size: 16px;
  margin-bottom: 12px;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.comment-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comments-list {
  margin-top: 20px;
}

.no-comments {
  text-align: center;
  padding: 20px 0;
  color: #65676b;
}
</style>
