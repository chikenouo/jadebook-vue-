<!-- src/components/post/index.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import { getAllPostsApi } from '@/api/api.js'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  defaultAvatar: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const router = useRouter()
const userStore = useUserStore()
console.log('PostComponent received post:', props.post)
const editDialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const editForm = ref({
  content: '',
})

const currentUser = computed(() => userStore.getUserData)
const currentUserId = computed(() => userStore.getUserId)
const isCurrentUserPost = computed(
  () => currentUserId.value && props.post.userId === currentUserId.value
)

const formatDate = (dateString) => {
  if (!dateString) return '未知時間'
  return dateString // 直接使用後端的 createdAt，例如 "2025-04-12 15:37"
}

const goToPostDetail = () => {
  router.push(`/post/${props.post.postId}`)
}

const goToComments = () => {
  router.push(`/post/${props.post.postId}/comments`)
}

const goToUserProfile = (userId) => {
  if (userId) {
    router.push(`/user/${userId}`)
  }
}

const editPost = () => {
  editForm.value.content = props.post.content
  editDialogVisible.value = true
}

const saveEditedPost = async () => {
  if (!editForm.value.content.trim()) return

  try {
    await getAllPostsApi({
      url: `/posts/${props.post.postId}`,
      method: 'put',
      data: { content: editForm.value.content },
    })
    props.post.content = editForm.value.content
    editDialogVisible.value = false
    ElMessage.success('貼文更新成功')
  } catch (error) {
    ElMessage.error('無法更新貼文')
    console.error('Error updating post:', error)
  }
}

const deletePost = () => {
  deleteDialogVisible.value = true
}

const confirmDeletePost = async () => {
  try {
    await getAllPostsApi({
      url: `/posts/${props.post.postId}`,
      method: 'delete',
    })
    deleteDialogVisible.value = false
    ElMessage.success('貼文已成功刪除')
    emit('delete', props.post.postId)
  } catch (error) {
    ElMessage.error('無法刪除貼文')
    console.error('Error deleting post:', error)
  }
}
</script>

<template>
  <div class="post-card">
    <!-- Post Header -->
    <div class="post-header">
      <div class="user-info" @click="goToUserProfile(post.userId)">
        <img :src="post.photo || defaultAvatar" alt="Profile" class="avatar" />
        <div>
          <div class="username">{{ post.userName || 'Unknown User' }}</div>
          <div class="post-time">{{ formatDate(post.createdAt) }}</div>
        </div>
      </div>

      <!-- Post Actions (Edit/Delete) -->
      <div class="post-actions" v-if="isCurrentUserPost">
        <el-dropdown trigger="click">
          <i class="el-icon-more"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="editPost">編輯貼文</el-dropdown-item>
              <el-dropdown-item @click="deletePost">刪除貼文</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- Post Body -->
    <div class="post-body" @click="goToPostDetail">
      <p>{{ post.content }}</p>
      <img
        v-if="post.image"
        :src="post.image"
        alt="Post Image"
        class="post-image"
      />
    </div>

    <!-- Post Footer -->
    <div class="post-footer">
      <div class="post-stats">
        <span> <i class="fas fa-thumbs-up"></i> {{ post.likes || 0 }} </span>
        <span @click="goToComments"> {{ post.commentsCount }} 則留言 </span>
      </div>

      <el-divider />

      <div class="post-buttons">
        <div class="action-button">
          <i class="fas fa-thumbs-up"></i>
          <span>讚</span>
        </div>
        <div class="action-button" @click="goToComments">
          <i class="fas fa-comment"></i>
          <span>留言</span>
        </div>
        <div class="action-button">
          <i class="fas fa-share"></i>
          <span>分享</span>
        </div>
      </div>
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
      <p>確定要刪除這篇貼文嗎？此操作無法撤銷。</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDeletePost">刪除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 樣式保持不變 */
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

.post-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 8px;
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
