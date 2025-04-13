<!-- src/views/PostComments.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getAllPostsApi } from '@/api/api.js'
import { getAllCommentsApi } from '@/api/api.js'
import CommentComponent from '@/components/comment/index.vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const comments = ref([])

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
    <div v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.commentId">
        <CommentComponent :comment="comment" :default-avatar="defaultAvatar" />
      </div>
    </div>
    <div v-else class="no-comments">
      <p>暫無留言</p>
    </div>
  </div>
</template>

<style scoped>
.comments-container {
  max-width: 680px;
  margin: 20px auto;
  padding: 0 16px;
  overflow-y: visible;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.no-comments {
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.no-comments p {
  font-size: 16px;
  color: #65676b;
}
</style>
