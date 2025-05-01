<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import PostComponent from '@/components/post/index.vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import axios from '@/api/request'
import { createPostApi } from '@/api/api'
import { useUserStore } from '@/stores/userStore'

const posts = ref([])
const newPostContent = ref('')
const loading = ref(false)
const posting = ref(false)

const fetchPosts = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/posts')
    console.log('Fetched posts:', response)
    posts.value = response.map((post) => ({
      ...post,
      userId: String(post.userId),
    }))
  } catch (error) {
    ElMessage.error('獲取貼文失敗')
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
  }
}

const createPost = async () => {
  if (!newPostContent.value.trim()) {
    ElMessage.warning('請輸入貼文內容')
    return
  }

  try {
    posting.value = true
    await createPostApi({
      content: newPostContent.value.trim(),
      image: null,
    })
    newPostContent.value = ''
    ElMessage.success('貼文發布成功')
    await fetchPosts()
  } catch (error) {
    ElMessage.error('發布貼文失敗')
    console.error('Error creating post:', error)
  } finally {
    posting.value = false
  }
}

const handlePostDelete = async (postId) => {
  try {
    await axios.delete(`/api/posts/${postId}`)
    ElMessage.success('貼文刪除成功')
    await fetchPosts()
  } catch (error) {
    ElMessage.error('刪除貼文失敗')
    console.error('Error deleting post:', error)
  }
}

onMounted(() => {
  fetchPosts()
})
const userStore = useUserStore()
const currentUserId = computed(() => Number(userStore.getUserId))
</script>

<template>
  <div class="home">
    <div class="post-create">
      <el-input
        v-model="newPostContent"
        type="textarea"
        :rows="3"
        placeholder="分享你的想法..."
        resize="none"
      />
      <div class="post-actions">
        <el-button type="primary" @click="createPost" :loading="posting"
          >發布</el-button
        >
      </div>
    </div>

    <div class="posts-container">
      <post-component
        v-for="post in posts"
        :key="post.postId"
        :post="post"
        :defaultAvatar="defaultAvatar"
        :currentUserId="currentUserId.value"
        @delete="handlePostDelete"
      />
    </div>

    <div v-if="loading" class="loading">
      <el-spinner />
    </div>

    <div v-if="!loading && posts && posts.length === 0" class="no-posts">
      目前還沒有任何貼文
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
}

.post-create {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.post-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}
</style>
