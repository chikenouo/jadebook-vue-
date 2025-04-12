<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/login'

const router = useRouter()
const formRef = ref(null)

const loginForm = ref({
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
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>
