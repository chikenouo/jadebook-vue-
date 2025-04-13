<<<<<<< HEAD
<!-- src/views/Home.vue -->
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PostComponent from '@/components/post/index.vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
<<<<<<< HEAD
import { getAllPostsApi } from '@/api/api.js'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
=======
import axios from '@/api/request'

const router = useRouter()
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e

const currentUser = ref(null)
const posts = ref([])
const loading = ref(false)
const page = ref(1)
const hasMorePosts = ref(true)

onMounted(async () => {
<<<<<<< HEAD
  userStore.initialize()
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  try {
    const response = await getAllPostsApi({ url: '/user/me' })
    currentUser.value = response
  } catch (error) {
    console.error('Error fetching current user:', error)
    router.push('/login')
  }

=======
  // 調用 /api/user/me 獲取用戶資料
  try {
    const response = await axios.get('http://localhost:8080/api/user/me', {
      withCredentials: true,
    })
    currentUser.value = response.data
  } catch (error) {
    console.error('Error fetching current user:', error)
    // router.beforeEach 已處理未登入跳轉，這裡不需要重複處理
  }

  // 獲取帖子
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
  await fetchPosts()
})

const fetchPosts = async () => {
  try {
    loading.value = true
<<<<<<< HEAD
    const response = await getAllPostsApi({ url: '/posts' })
    console.log('Posts response:', response)

    if (Array.isArray(response)) {
      posts.value = response
    } else {
      console.error('Expected an array, but got:', response)
      posts.value = []
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    posts.value = []
    ElMessage.error(error.message || '無法獲取貼文')
=======
    const response = await axios.get('http://localhost:8080/api/posts', {
      withCredentials: true,
    })
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    // router.beforeEach 已處理未登入跳轉
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
  } finally {
    loading.value = false
  }
}

const goToCreatePost = () => {
  router.push('/post/create')
}

const loadMorePosts = () => {
  if (hasMorePosts.value && !loading.value) {
    page.value += 1
<<<<<<< HEAD
    fetchPosts()
=======
    // 實現分頁加載（這裡需要後端支持）
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
  }
}

const handleDeletePost = async (postId) => {
  try {
<<<<<<< HEAD
    await getAllPostsApi({ url: `/posts/${postId}`, method: 'delete' })
    posts.value = posts.value.filter((post) => post.postId !== postId)
    ElMessage.success('貼文已成功刪除')
  } catch (error) {
    ElMessage.error('無法刪除貼文')
    console.error('Error deleting post:', error)
  }
}
</script>

<template>
  <div class="home-container">
    <!-- Create Post Card -->
    <div class="create-post-card">
      <div class="create-post-header">
        <img
          :src="currentUser?.photo || defaultAvatar"
          alt="Profile"
          class="avatar"
        />
        <el-button class="create-post-button" @click="goToCreatePost">
          在想些什麼，{{ currentUser?.userName?.split(' ')[0] || '朋友' }}？
        </el-button>
      </div>

      <el-divider />

      <div class="create-post-actions">
        <div class="action">
          <i class="fas fa-images"></i>
          <span>照片/影片</span>
        </div>
        <div class="action">
          <i class="fas fa-smile"></i>
          <span>心情/活動</span>
        </div>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading">
      <el-skeleton :rows="3" animated />
      <el-divider />
      <el-skeleton :rows="3" animated />
    </div>

    <!-- Posts List -->
    <div v-else-if="posts && posts.length > 0">
      <div v-for="post in posts" :key="post.postId" class="post-container">
        <PostComponent
          :post="post"
          :default-avatar="defaultAvatar"
          @delete="handleDeletePost"
        />
      </div>
    </div>

    <!-- No Posts Message -->
    <div v-else class="no-posts">
      <i class="el-icon-document"></i>
      <h3>尚未有貼文</h3>
      <p>成為第一個與社群分享的人吧！</p>
      <el-button type="primary" @click="goToCreatePost">創建貼文</el-button>
    </div>

    <!-- Infinite Scroll Loader -->
    <div
      class="load-more-container"
      v-if="posts && posts.length > 0 && !loading"
    >
      <el-button plain @click="loadMorePosts">加載更多</el-button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 680px;
  margin: 0 auto;
  overflow-y: auto;
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
  margin-bottom: 10px;
}

.avatar {
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

.create-post-actions {
  display: flex;
  justify-content: space-around;
}

.action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.action:hover {
  background-color: #f0f2f5;
}

.action i {
  color: #45bd62;
  font-size: 18px;
}

.action span {
  font-size: 14px;
  color: #65676b;
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

.load-more-container {
  text-align: center;
  margin: 20px 0;
}

.post-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 16px;
}
</style>
=======
    await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
      withCredentials: true,
    })
    posts.value = posts.value.filter((post) => post.id !== postId)
    ElMessage.success('Post deleted successfully')
  } catch (error) {
    ElMessage.error('Failed to delete post')
    console.error('Error deleting post:', error)
    // router.beforeEach 已處理未登入跳轉
  }
}
</script>
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
