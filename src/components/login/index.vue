<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
<!-- src/views/Login.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/login'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const loginForm = ref(null)

const form = ref({
<<<<<<< HEAD
=======
=======
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/login'

const router = useRouter()
const formRef = ref(null)

const loginForm = ref({
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  phoneNumber: '',
  password: '',
})

const rules = {
  phoneNumber: [
    { required: true, message: '請輸入您的手機號碼', trigger: 'blur' },
    {
      pattern: /^[0-9]{10}$/,
      message: '請輸入有效的10位數手機號碼',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '請輸入您的密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度不能少於6個字符', trigger: 'blur' },
  ],
}

const loading = ref(false)

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
onMounted(() => {
  userStore.initialize()
  if (userStore.isLoggedIn) {
    router.push('/home')
  }
})

const handleLogin = async () => {
  // 檢查手機號碼和密碼是否都為空
  if (!form.value.phoneNumber.trim() && !form.value.password.trim()) {
    ElMessage.error('請輸入手機號碼和密碼')
    return // 直接返回，不進行後續操作
  }

  try {
    await loginForm.value.validate()
    loading.value = true
    const result = await loginApi(form.value)

    userStore.login({
      token: result.token,
      userData: result.data,
    })
    ElMessage.success('登入成功')
    router.push('/home')
  } catch (error) {
    console.error('Login error:', error.message)
    ElMessage.error(error.message)
<<<<<<< HEAD
=======
=======
const handleLogin = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    const result = await loginApi(loginForm.value)
    console.log('Login API result:', result)

    if (result.message === '登入成功') {
      ElMessage.success('登入成功')
      router.push('/home')
    } else {
      console.log('Login failed with message:', result.message)
      ElMessage.error('登入失敗，請檢查您的帳號密碼')
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message)
    ElMessage.error('登入失敗，請檢查您的帳號密碼')
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/mountain.png" alt="Logo" class="logo" />
        <h2 class="title">登入玉書</h2>
      </div>

      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        @submit.prevent="handleLogin"
        class="login-form"
      >
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="form.phoneNumber"
            placeholder="請輸入手機號碼"
            prefix-icon="el-icon-mobile-phone"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="請輸入密碼"
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
            @click="handleLogin"
          >
            登入
          </el-button>
        </el-form-item>

        <div class="divider">
          <span>或</span>
        </div>

        <el-button class="register-button" @click="goToRegister" size="large">
          註冊新帳號
        </el-button>
      </el-form>
    </div>
  </div>
</template>

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
  background-color: var(--esun-green);
  border-color: var(--esun-green);
  font-weight: bold;
  font-size: 16px;
  height: 48px;
}

.login-button:hover {
  background-color: var(--esun-green-light);
  border-color: var(--esun-green-light);
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
<<<<<<< HEAD
=======
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
