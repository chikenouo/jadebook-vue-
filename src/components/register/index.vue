<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
<!-- src/views/Register.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { registerApi } from '@/api/api.js'

const router = useRouter()
<<<<<<< HEAD
=======
=======
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useStore()
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
<<<<<<< HEAD
    { required: true, message: 'Please enter your user name', trigger: 'blur' },
=======
<<<<<<< HEAD
    { required: true, message: 'Please enter your user name', trigger: 'blur' },
=======
    {
      required: true,
      message: 'Please enter your user name',
      trigger: 'blur',
    },
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
    {
      min: 2,
      message: 'User name must be at least 2 characters',
      trigger: 'blur',
    },
  ],
  email: [
<<<<<<< HEAD
    { required: true, message: 'Please enter your email', trigger: 'blur' },
=======
<<<<<<< HEAD
    { required: true, message: 'Please enter your email', trigger: 'blur' },
=======
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur',
    },
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: 'blur',
    },
  ],
  password: [
<<<<<<< HEAD
    { required: true, message: 'Please create a password', trigger: 'blur' },
=======
<<<<<<< HEAD
    { required: true, message: 'Please create a password', trigger: 'blur' },
=======
    {
      required: true,
      message: 'Please create a password',
      trigger: 'blur',
    },
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const error = computed(() => store.getters.error)
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1

const handleRegister = async () => {
  try {
    await registerForm.value.validate()
    loading.value = true
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
    // 直接調用 registerApi 發送資料
    await registerApi(registerData.value)
    ElMessage.success('註冊成功!')
    router.push('/login')
  } catch (error) {
    console.error('Registration error:', error)
    ElMessage.error(error.response?.data?.message || '還沒填完所有內容喔!')
<<<<<<< HEAD
=======
=======
    await store.dispatch('register', registerData.value)
    ElMessage.success('Registration successful!')
    router.push('/login')
  } catch (error) {
    console.error('Registration error:', error)
    ElMessage.error(
      error.response?.data?.message || 'Registration failed. Please try again.'
    )
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
<<<<<<< HEAD
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
        <h2 class="title">註冊新帳號</h2>
        <p class="subtitle">歡迎您的加入 !</p>
=======
<<<<<<< HEAD
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
        <h2 class="title">註冊新帳號</h2>
        <p class="subtitle">歡迎您的加入 !</p>
=======
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <h2 class="title">Create a new account</h2>
        <p class="subtitle">It's quick and easy.</p>
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
<<<<<<< HEAD
        <el-form-item prop="phoneNumber" label="電話號碼">
=======
<<<<<<< HEAD
        <el-form-item prop="phoneNumber" label="電話號碼">
=======
        <el-form-item prop="phoneNumber" label="Phone Number">
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          <el-input
            v-model="registerData.phoneNumber"
            placeholder="Phone Number"
            size="large"
          />
        </el-form-item>

<<<<<<< HEAD
        <el-form-item prop="userName" label="使用者名稱">
=======
<<<<<<< HEAD
        <el-form-item prop="userName" label="使用者名稱">
=======
        <el-form-item prop="userName" label="User Name">
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          <el-input
            v-model="registerData.userName"
            placeholder="Enter your user name"
            size="large"
          />
        </el-form-item>

<<<<<<< HEAD
        <el-form-item prop="email" label="電子信箱">
=======
<<<<<<< HEAD
        <el-form-item prop="email" label="電子信箱">
=======
        <el-form-item prop="email" label="Email">
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          <el-input
            v-model="registerData.email"
            placeholder="Email"
            size="large"
          />
        </el-form-item>

<<<<<<< HEAD
        <el-form-item prop="password" label="密碼">
=======
<<<<<<< HEAD
        <el-form-item prop="password" label="密碼">
=======
        <el-form-item prop="password" label="Password">
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          <el-input
            v-model="registerData.password"
            type="password"
            placeholder="Password"
            size="large"
            show-password
          />
        </el-form-item>

<<<<<<< HEAD
        <el-form-item prop="coverImage" label="圖片URL">
=======
<<<<<<< HEAD
        <el-form-item prop="coverImage" label="圖片URL">
=======
        <el-form-item prop="coverImage" label="Profile Photo URL">
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          <el-input
            v-model="registerData.coverImage"
            placeholder="Profile Photo URL"
            size="large"
          />
        </el-form-item>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
        <el-form-item prop="biography" label="自我介紹">
          <el-input
            v-model="registerData.biography"
            type="textarea"
            placeholder="你是怎麼樣的一個人..."
<<<<<<< HEAD
=======
=======
        <el-form-item prop="biography" label="About Me">
          <el-input
            v-model="registerData.biography"
            type="textarea"
            placeholder="Write something about yourself..."
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
<<<<<<< HEAD
            我好了!
=======
<<<<<<< HEAD
            我好了!
=======
            Sign Up
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          </el-button>
        </el-form-item>

        <div class="login-link">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
          已經有帳號了嗎?
          <router-link to="/login">點此登入</router-link>
        </div>
      </el-form>
<<<<<<< HEAD
=======
=======
          Already have an account?
          <router-link to="/login">Log in</router-link>
        </div>
      </el-form>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

.error-message {
  color: #f56c6c;
  text-align: center;
  margin-top: 10px;
}
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
</style>
