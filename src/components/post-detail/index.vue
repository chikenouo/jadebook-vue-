<template>
  <div class="post-detail">
    <div v-if="loading" class="loading">
      <el-spinner />
    </div>

    <div v-else-if="post" class="post-container">
      <post-component
        :post="post"
        :defaultAvatar="defaultAvatar"
        @delete="handlePostDelete"
      />

      <div class="comments-section">
        <h3>評論</h3>
        <div class="comment-create">
          <el-input
            v-model="newComment"
            type="textarea"
            :rows="2"
            placeholder="寫下你的評論..."
            resize="none"
          />
          <div class="comment-actions">
            <el-button
              type="primary"
              @click="createComment"
              :loading="commenting"
            >
              發布評論
            </el-button>
          </div>
        </div>

        <div class="comments-list">
          <comment-component
            v-for="comment in comments"
            :key="comment.commentId"
            :comment="comment"
            :defaultAvatar="defaultAvatar"
          />
        </div>

        <div v-if="comments.length === 0" class="no-comments">
          目前還沒有評論
        </div>
      </div>
    </div>

    <div v-else class="not-found">找不到該貼文</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PostComponent from '@/components/post/index.vue'
import CommentComponent from '@/components/comment/index.vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import axios from '@/api/request'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const comments = ref([])
const newComment = ref('')
const loading = ref(true)
const commenting = ref(false)

const postId = route.params.id

const fetchPost = async () => {
  try {
    const response = await axios.get(`/api/posts/${postId}`)
    post.value = response.data
  } catch (error) {
    ElMessage.error('獲取貼文失敗')
    console.error('Error fetching post:', error)
  }
}

const fetchComments = async () => {
  try {
    const response = await axios.get(`/api/posts/${postId}/comments`)
    comments.value = response.data
  } catch (error) {
    ElMessage.error('獲取評論失敗')
    console.error('Error fetching comments:', error)
  } finally {
    loading.value = false
  }
}

const createComment = async () => {
  if (!newComment.value.trim()) {
    ElMessage.warning('請輸入評論內容')
    return
  }

  try {
    commenting.value = true
    await axios.post(`/api/posts/${postId}/comments`, {
      content: newComment.value.trim(),
    })
    newComment.value = ''
    ElMessage.success('評論發布成功')
    await fetchComments()
  } catch (error) {
    ElMessage.error('發布評論失敗')
    console.error('Error creating comment:', error)
  } finally {
    commenting.value = false
  }
}

const handlePostDelete = async () => {
  try {
    await axios.delete(`/api/posts/${postId}`)
    ElMessage.success('貼文刪除成功')
    router.push('/')
  } catch (error) {
    ElMessage.error('刪除貼文失敗')
    console.error('Error deleting post:', error)
  }
}

onMounted(async () => {
  await fetchPost()
  await fetchComments()
})
</script>

<style scoped>
.post-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.post-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.comments-section {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.comments-section h3 {
  margin: 0 0 16px;
  font-size: 18px;
  color: #1a1a1a;
}

.comment-create {
  margin-bottom: 20px;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.no-comments {
  text-align: center;
  padding: 20px;
  color: #666;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}
</style>
