<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <!-- Header -->
    <el-header height="60px" style="padding: 0;">
      <HeaderComponent />
    </el-header>
    
    <el-container>
      <!-- Sidebar -->
      <el-aside width="260px" class="desktop-only">
        <SidebarComponent />
      </el-aside>
      
      <!-- Main Content -->
      <el-main style="padding: 20px; overflow-y: auto; background-color: #f0f2f5;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from '@/components/header/index.vue'
import SidebarComponent from '@/components/sidebar/index.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderComponent,
    SidebarComponent
  },
  created() {
    // Fetch current user data if needed
    if (this.$store.getters.isAuthenticated && !this.$store.getters.currentUser) {
      this.$store.dispatch('fetchCurrentUser')
    }
    
    // Fetch posts for home page
    this.$store.dispatch('fetchPosts')
  }
}
</script>

<style scoped>
.el-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  position: sticky;
  top: 0;
}

.el-aside {
  background-color: #ffffff;
  border-right: 1px solid #e3e6e9;
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .el-aside {
    display: none;
  }
}
</style>
