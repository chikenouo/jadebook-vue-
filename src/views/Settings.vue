<template>
  <div class="settings-container">
    <h1 class="settings-title">帳號設定</h1>
    
    <el-form 
      ref="settingsForm" 
      :model="form" 
      :rules="rules" 
      label-position="top"
      class="settings-form"
    >
      <!-- 頭像設定 -->
      <div class="avatar-section">
        <img 
          :src="form.photo || require('@/assets/defaultAvatar.svg')" 
          alt="Profile" 
          class="avatar"
        >
        <div class="avatar-actions">
          <el-button size="small" type="primary">更換頭像</el-button>
          <el-button v-if="form.photo" size="small" type="danger" @click="removeAvatar">移除頭像</el-button>
        </div>
      </div>
      
      <!-- 基本資料 -->
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="您的姓名" />
      </el-form-item>
      
      <el-form-item label="電話號碼">
        <el-input v-model="form.phoneNumber" placeholder="電話號碼" disabled />
        <div class="form-hint">電話號碼無法修改</div>
      </el-form-item>
      
      <el-form-item label="電子郵件" prop="email">
        <el-input v-model="form.email" placeholder="您的電子郵件" />
      </el-form-item>
      
      <el-form-item label="密碼">
        <el-button @click="showPasswordDialog = true">變更密碼</el-button>
      </el-form-item>
      
      <el-form-item label="自我介紹" prop="bio">
        <el-input 
          v-model="form.bio" 
          type="textarea" 
          :rows="4" 
          placeholder="介紹一下自己..."
        />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="saveSettings" :loading="loading">儲存變更</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
    
    <!-- 變更密碼對話框 -->
    <el-dialog
      title="變更密碼"
      v-model="showPasswordDialog"
      width="500px"
    >
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
        <el-form-item label="目前密碼" prop="currentPassword">
          <el-input 
            v-model="passwordForm.currentPassword" 
            type="password" 
            placeholder="輸入目前的密碼"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="新密碼" prop="newPassword">
          <el-input 
            v-model="passwordForm.newPassword" 
            type="password" 
            placeholder="輸入新密碼"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="確認新密碼" prop="confirmPassword">
          <el-input 
            v-model="passwordForm.confirmPassword" 
            type="password" 
            placeholder="再次輸入新密碼"
            show-password
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPasswordDialog = false">取消</el-button>
          <el-button type="primary" @click="changePassword" :loading="passwordLoading">確認變更</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SettingsView',
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('兩次輸入的密碼不一致'))
      } else {
        callback()
      }
    }
    
    return {
      form: {
        name: '',
        phoneNumber: '',
        email: '',
        bio: '',
        photo: ''
      },
      originalForm: {},
      rules: {
        name: [
          { required: true, message: '請輸入您的姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '長度需要在 2 到 20 個字元之間', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '請輸入您的電子郵件', trigger: 'blur' },
          { type: 'email', message: '請輸入正確的電子郵件格式', trigger: 'blur' }
        ],
        bio: [
          { max: 500, message: '自我介紹不能超過 500 個字元', trigger: 'blur' }
        ]
      },
      loading: false,
      showPasswordDialog: false,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        currentPassword: [
          { required: true, message: '請輸入目前的密碼', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '請輸入新密碼', trigger: 'blur' },
          { min: 6, message: '密碼長度不能少於 6 個字元', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '請再次輸入新密碼', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      passwordLoading: false
    }
  },
  created() {
    this.fetchUserData()
  },
  methods: {
    async fetchUserData() {
      try {
        const currentUser = this.$store.getters.currentUser
        
        if (!currentUser) {
          // 如果沒有用戶資料，嘗試獲取
          await this.$store.dispatch('fetchCurrentUser')
        }
        
        // 從 store 獲取當前用戶資料
        const user = this.$store.getters.currentUser
        
        if (user) {
          this.form = {
            name: user.name || '',
            phoneNumber: user.phoneNumber || '',
            email: user.email || '',
            bio: user.bio || '',
            photo: user.photo || null
          }
          
          // 保存原始資料以便重置
          this.originalForm = { ...this.form }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        this.$message.error('獲取用戶資料失敗')
      }
    },
    async saveSettings() {
      try {
        // 驗證表單
        await this.$refs.settingsForm.validate()
        
        this.loading = true
        
        // 更新用戶資料
        const userData = { ...this.form }
        const userId = this.$store.getters.currentUser.id
        
        // 呼叫 API 更新資料
        await this.$store.dispatch('updateUserProfile', {
          userId,
          userData
        })
        
        // 更新原始資料
        this.originalForm = { ...this.form }
        
        // 顯示成功訊息
        this.$message.success('個人資料已更新')
      } catch (error) {
        console.error('Error updating user profile:', error)
        this.$message.error('更新個人資料失敗')
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.form = { ...this.originalForm }
    },
    removeAvatar() {
      this.form.photo = null
    },
    async changePassword() {
      try {
        // 驗證表單
        await this.$refs.passwordFormRef.validate()
        
        this.passwordLoading = true
        
        // 呼叫 API 更改密碼
        await this.$store.dispatch('updatePassword', {
          currentPassword: this.passwordForm.currentPassword,
          newPassword: this.passwordForm.newPassword
        })
        
        // 重置密碼表單
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
        
        // 關閉對話框
        this.showPasswordDialog = false
        
        // 顯示成功訊息
        this.$message.success('密碼已成功更新')
      } catch (error) {
        console.error('Error changing password:', error)
        this.$message.error('密碼更新失敗')
      } finally {
        this.passwordLoading = false
      }
    }
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.settings-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1877f2;
}

.settings-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.avatar-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-hint {
  color: #8e8e8e;
  font-size: 12px;
  margin-top: 4px;
}
</style>