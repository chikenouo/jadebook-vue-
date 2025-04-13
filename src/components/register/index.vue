<!-- src/views/Register.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { registerApi } from '@/api/api.js'

const router = useRouter()
const registerForm = ref(null)

const registerData = ref({
  phoneNumber: '',
  userName: '',
  email: '',
  password: '',
  coverImage: '',
  biography: '',
})

const rules = {
  phoneNumber: [
    {
      required: true,
      message: 'Please enter your phone number',
      trigger: 'blur',
    },
    {
      pattern: /^[0-9]{10}$/,
      message: 'Please enter a valid 10-digit phone number',
      trigger: 'blur',
    },
  ],
  userName: [
    { required: true, message: 'Please enter your user name', trigger: 'blur' },
    {
      min: 2,
      message: 'User name must be at least 2 characters',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Please create a password', trigger: 'blur' },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
      trigger: 'blur',
    },
  ],
  biography: [
    { required: false },
    {
      max: 500,
      message: 'Biography cannot exceed 500 characters',
      trigger: 'blur',
    },
  ],
}

const loading = ref(false)

const handleRegister = async () => {
  try {
    await registerForm.value.validate()
    loading.value = true
    // 直接調用 registerApi 發送資料
    await registerApi(registerData.value)
    ElMessage.success('註冊成功!')
    router.push('/login')
  } catch (error) {
    console.error('Registration error:', error)
    ElMessage.error(error.response?.data?.message || '還沒填完所有內容喔!')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
        <h2 class="title">註冊新帳號</h2>
        <p class="subtitle">歡迎您的加入 !</p>
      </div>

      <el-divider />

      <el-form
        ref="registerForm"
        :model="registerData"
        :rules="rules"
        @submit.prevent="handleRegister"
        label-position="top"
        class="register-form"
      >
        <el-form-item prop="phoneNumber" label="電話號碼">
          <el-input
            v-model="registerData.phoneNumber"
            placeholder="Phone Number"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="userName" label="使用者名稱">
          <el-input
            v-model="registerData.userName"
            placeholder="Enter your user name"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="email" label="電子信箱">
          <el-input
            v-model="registerData.email"
            placeholder="Email"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password" label="密碼">
          <el-input
            v-model="registerData.password"
            type="password"
            placeholder="Password"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item prop="coverImage" label="圖片URL">
          <el-input
            v-model="registerData.coverImage"
            placeholder="Profile Photo URL"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="biography" label="自我介紹">
          <el-input
            v-model="registerData.biography"
            type="textarea"
            placeholder="你是怎麼樣的一個人..."
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
            我好了!
          </el-button>
        </el-form-item>

        <div class="login-link">
          已經有帳號了嗎?
          <router-link to="/login">點此登入</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

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
  margin-bottom: 20px;
}

.logo {
  width: 120px;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #1c1e21;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: #606266;
  margin-bottom: 0;
}

.register-form {
  margin-top: 20px;
}

.register-button {
  width: 100%;
  background-color: var(--esun-green);
  border-color: var(--esun-green);
  font-weight: bold;
  font-size: 16px;
  height: 48px;
}

.register-button:hover {
  background-color: var(--esun-green-light);
  border-color: var(--esun-green-light);
}

.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #606266;
}

.login-link a {
  color: var(--esun-green);
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
