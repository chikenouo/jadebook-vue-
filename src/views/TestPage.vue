<template>
  <div class="test-container">
    <h1>Test Page</h1>
    <p>If you can see this, routing is working correctly!</p>
    <el-button type="primary" @click="goHome">Go to Home</el-button>
    <el-button @click="goLogin">Go to Login</el-button>
  </div>
</template>

<script>
export default {
  name: 'TestPage',
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.test-container {
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: #1877f2;
}

p {
  margin-bottom: 30px;
  font-size: 18px;
}

.el-button {
  margin: 0 10px;
}
</style>