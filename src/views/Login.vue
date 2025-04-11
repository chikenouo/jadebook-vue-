<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo">
        <h2 class="title">Log in to Facebook</h2>
      </div>
      
      <el-form 
        ref="loginForm" 
        :model="loginForm" 
        :rules="rules" 
        @submit.prevent="handleLogin"
        class="login-form"
      >
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="loginForm.phoneNumber"
            placeholder="Phone number"
            prefix-icon="el-icon-mobile-phone"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="Password"
            type="password"
            prefix-icon="el-icon-lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            size="large"
            class="login-button"
          >
            Log In
          </el-button>
        </el-form-item>
        
        <div class="divider">
          <span>or</span>
        </div>
        
        <el-button
          class="register-button"
          @click="goToRegister"
          size="large"
        >
          Create New Account
        </el-button>
      </el-form>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loginForm: {
        phoneNumber: '',
        password: ''
      },
      rules: {
        phoneNumber: [
          { required: true, message: 'Please enter your phone number', trigger: 'blur' },
          { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        
        this.loading = true
        // Mock login with credentials
        await this.$store.dispatch('login', this.loginForm)
        // Redirect to home page
        this.$router.push('/')
      } catch (error) {
        console.error('Login error:', error)
        // Show error message (from store or generic)
        this.$message.error(this.$store.getters.error || 'Login failed. Please check your credentials.')
      } finally {
        this.loading = false
      }
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 240px;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: normal;
  color: #606266;
  margin-bottom: 20px;
}

.login-form {
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  background-color: #1877f2;
  border-color: #1877f2;
  font-weight: bold;
  font-size: 16px;
  height: 48px;
}

.login-button:hover {
  background-color: #166fe5;
  border-color: #166fe5;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #dadde1;
}

.divider span {
  padding: 0 10px;
  color: #606266;
  font-size: 14px;
}

.register-button {
  width: 100%;
  background-color: #42b72a;
  border-color: #42b72a;
  color: white;
  font-weight: bold;
  font-size: 16px;
  height: 48px;
}

.register-button:hover {
  background-color: #36a420;
  border-color: #36a420;
}

.error-message {
  color: #f56c6c;
  text-align: center;
  margin-top: 10px;
}
</style>
