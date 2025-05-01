<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getAllPostsApi, createCommentApi } from '@/api/api.js'
import { getAllCommentsApi } from '@/api/api.js'
import CommentComponent from '@/components/comment/index.vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const comments = ref([])
const newComment = ref('')

const submitComment = async () => {
  try {
    const postId = route.params.postId
    const response = await createCommentApi(postId, {
      content: newComment.value,
    })

    if (response && response.comment) {
      ElMessage.success('留言成功')
      newComment.value = ''
      await fetchComments()
    }
  } catch (error) {
    console.error('Error submitting comment:', error)
    ElMessage.error('留言失敗')
  }
}

onMounted(async () => {
  userStore.initialize()
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  await fetchComments()
})

const fetchComments = async () => {
  try {
    const postId = route.params.postId
    const response = await getAllCommentsApi(postId)
    if (Array.isArray(response)) {
      comments.value = response
      console.log(`Loaded ${comments.value.length} comments for post ${postId}`)
    } else {
      console.error('Expected an array, but got:', response)
      comments.value = []
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
    ElMessage.error('無法加載留言')
    comments.value = []
  }
}
</script>

<template>
  <div class="comments-container">
    <h2>貼文留言</h2>

    <div class="comment-input">
      <el-input
        v-model="newComment"
        type="textarea"
        :rows="2"
        placeholder="寫下你的留言..."
      />
      <el-button
        type="primary"
        @click="submitComment"
        :disabled="!newComment.trim()"
      >
        發布
      </el-button>
    </div>

    <div v-if="comments.length > 0">
      <CommentComponent
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :defaultAvatar="defaultAvatar"
      />
    </div>
    <div v-else class="no-comments">
      <p>暫無留言</p>
    </div>
  </div>
</template>

<style scoped>
.comments-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.comments-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.no-comments {
  text-align: center;
  padding: 20px;
  color: #666;
}

.comment-input {
  margin-bottom: 20px;
}

.comment-input .el-button {
  margin-top: 10px;
}
</style>
