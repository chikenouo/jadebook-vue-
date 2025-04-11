<template>
  <div class="home-container">
    <!-- Create Post Card -->
    <div class="create-post-card" v-if="isAuthenticated">
      <div class="create-post-header">
        <img 
          :src="currentUser?.photo || require('@/assets/defaultAvatar.svg')" 
          alt="Profile" 
          class="avatar"
        >
        <el-button 
          class="create-post-button" 
          @click="goToCreatePost"
        >
          What's on your mind, {{ currentUser?.name?.split(' ')[0] || 'there' }}?
        </el-button>
      </div>
      
      <el-divider />
      
      <div class="create-post-actions">
        <div class="action">
          <i class="fas fa-images"></i>
          <span>Photo/Video</span>
        </div>
        <div class="action">
          <i class="fas fa-smile"></i>
          <span>Feeling/Activity</span>
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
    <div v-else-if="posts.length > 0">
      <PostComponent 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
        @delete="handleDeletePost"
      />
    </div>
    
    <!-- No Posts Message -->
    <div v-else class="no-posts">
      <i class="el-icon-document"></i>
      <h3>No posts yet</h3>
      <p>Be the first to share something with the community!</p>
      <el-button type="primary" @click="goToCreatePost">Create Post</el-button>
    </div>
    
    <!-- Infinite Scroll Loader -->
    <div class="load-more-container" v-if="posts.length > 0 && !loading">
      <el-button plain @click="loadMorePosts">Load More</el-button>
    </div>
  </div>
</template>

<script>
import PostComponent from '@/components/post/index.vue'

export default {
  name: 'HomeView',
  components: {
    PostComponent
  },
  data() {
    return {
      page: 1,
      hasMorePosts: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    posts() {
      return this.$store.getters.allPosts
    },
    loading() {
      return this.$store.getters.isLoading
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        await this.$store.dispatch('fetchPosts')
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
    goToCreatePost() {
      this.$router.push('/post/create')
    },
    loadMorePosts() {
      if (this.hasMorePosts && !this.loading) {
        this.page += 1
        // Implement pagination loading here
        // This would typically call an API with a page parameter
      }
    },
    async handleDeletePost(postId) {
      try {
        await this.$store.dispatch('deletePost', postId)
        this.$message.success('Post deleted successfully')
      } catch (error) {
        this.$message.error('Failed to delete post')
        console.error('Error deleting post:', error)
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 680px;
  margin: 0 auto;
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
</style>
