<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PostComponent from '@/components/post/index.vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import axios from '@/api/request'

const router = useRouter()

const currentUser = ref(null)
const posts = ref([])
const loading = ref(false)
const page = ref(1)
const hasMorePosts = ref(true)

onMounted(async () => {
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
  await fetchPosts()
})

const fetchPosts = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:8080/api/posts', {
      withCredentials: true,
    })
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    // router.beforeEach 已處理未登入跳轉
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
    // 實現分頁加載（這裡需要後端支持）
  }
}

const handleDeletePost = async (postId) => {
  try {
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
