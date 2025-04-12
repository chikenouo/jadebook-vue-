<template>
  <div class="test-page">
    <h1>测试页面</h1>
    
    <div class="test-section">
      <h2>导航测试</h2>
      <p>这个页面用于测试路由导航和各种功能</p>
      
      <div class="button-group">
        <el-button type="primary" @click="loginUser">模拟登录</el-button>
        <el-button type="warning" @click="logoutUser">登出</el-button>
        <el-button @click="goToLogin">前往登录页</el-button>
        <el-button @click="goToSettings">前往设置页</el-button>
        <el-button @click="goToHome">前往首页</el-button>
      </div>
    </div>
    
    <div class="test-section">
      <h2>当前用户信息</h2>
      <div v-if="currentUser">
        <p><strong>登录状态:</strong> 已登录</p>
        <p><strong>用户名:</strong> {{ currentUser.name }}</p>
        <p><strong>电子邮件:</strong> {{ currentUser.email }}</p>
        <p><strong>电话:</strong> {{ currentUser.phoneNumber }}</p>
        <div class="avatar-display">
          <strong>头像:</strong>
          <img :src="currentUser.photo || require('@/assets/defaultAvatar.svg')" class="test-avatar" />
        </div>
      </div>
      <p v-else><strong>登录状态:</strong> 未登录</p>
    </div>
    
    <div class="test-section">
      <h2>开发信息</h2>
      <p><strong>Vue 版本:</strong> {{ vueVersion }}</p>
      <p><strong>环境:</strong> {{ nodeEnv }}</p>
      <p><strong>API 模式:</strong> Mocked API</p>
    </div>
  </div>
</template>

<script>
import { version as vueVersion } from 'vue'

export default {
  name: 'TestPage',
  data() {
    return {
      vueVersion,
      nodeEnv: process.env.NODE_ENV
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    loginUser() {
      this.$store.dispatch('login', { 
        phoneNumber: '1234567890', 
        password: 'password123' 
      })
      .then(() => {
        this.$message.success('模拟登录成功')
      })
      .catch(error => {
        this.$message.error('登录失败: ' + error.message)
      })
    },
    logoutUser() {
      this.$store.dispatch('logout')
      this.$message.success('已登出')
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToHome() {
      this.$router.push('/')
    },
    goToSettings() {
      this.$router.push('/settings')
    }
  }
}
</script>

<style scoped>
.test-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #1877f2;
  margin-bottom: 24px;
}

.test-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 0;
  color: #1c1e21;
  font-size: 18px;
  margin-bottom: 16px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.test-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 10px;
  object-fit: cover;
  vertical-align: middle;
}

.avatar-display {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>