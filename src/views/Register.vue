<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo">
        <h2 class="title">Create a new account</h2>
        <p class="subtitle">It's quick and easy.</p>
      </div>
      
      <el-divider />
      
      <el-form 
        ref="registerForm" 
        :model="registerForm" 
        :rules="rules" 
        @submit.prevent="handleRegister"
        label-position="top"
        class="register-form"
      >
        <el-form-item prop="phoneNumber" label="Phone Number">
          <el-input 
            v-model="registerForm.phoneNumber" 
            placeholder="Phone Number"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="name" label="Full Name">
          <el-input 
            v-model="registerForm.name" 
            placeholder="Full Name"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="email" label="Email">
          <el-input 
            v-model="registerForm.email" 
            placeholder="Email"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password" label="Password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="Password"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="photo" label="Profile Photo URL">
          <el-input
            v-model="registerForm.photo"
            placeholder="Profile Photo URL"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="bio" label="About Me">
          <el-input
            v-model="registerForm.bio"
            type="textarea"
            placeholder="Write something about yourself..."
            :rows="3"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            size="large"
            class="register-button"
          >
            Sign Up
          </el-button>
        </el-form-item>
        
        <div class="login-link">
          Already have an account? 
          <router-link to="/login">Log in</router-link>
        </div>
      </el-form>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      registerForm: {
        phoneNumber: '',
        name: '',
        email: '',
        password: '',
        photo: '',
        bio: ''
      },
      rules: {
        phoneNumber: [
          { required: true, message: 'Please enter your phone number', trigger: 'blur' },
          { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Please enter your full name', trigger: 'blur' },
          { min: 2, max: 50, message: 'Name must be between 2 and 50 characters', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please create a password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
        ],
        bio: [
          { max: 200, message: 'Bio cannot exceed 200 characters', trigger: 'blur' }
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
    async handleRegister() {
      try {
        await this.$refs.registerForm.validate()
        
        this.loading = true
        
        // If no photo provided, use default avatar
        if (!this.registerForm.photo) {
          this.registerForm.photo = '/assets/defaultAvatar.svg'
        }
        
        await this.$store.dispatch('register', this.registerForm)
        this.$router.push('/')
      } catch (error) {
        console.error('Registration error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.register-box {
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.register-header {
  text-align: center;
  margin-bottom: 10px;
}

.logo {
  width: 200px;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  color: #606266;
  margin-bottom: 20px;
}

.register-form {
  margin-top: 20px;
}

.register-button {
  width: 100%;
  background-color: #42b72a;
  border-color: #42b72a;
  font-weight: bold;
  font-size: 16px;
  height: 48px;
}

.register-button:hover {
  background-color: #36a420;
  border-color: #36a420;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #606266;
}

.login-link a {
  color: #1877f2;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #f56c6c;
  text-align: center;
  margin-top: 15px;
}
</style>
