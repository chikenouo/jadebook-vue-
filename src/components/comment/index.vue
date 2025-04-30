<<<<<<< HEAD
<!-- src/components/comment/index.vue -->
=======
<<<<<<< HEAD
<!-- src/components/comment/index.vue -->
<template>
  <div class="comment">
    <img
      :src="comment.photo || defaultAvatar"
      alt="Profile"
      class="avatar"
      @click="goToUserProfile(comment.userId)"
    />
    <div class="comment-content">
      <div class="comment-bubble">
        <div class="comment-author" @click="goToUserProfile(comment.userId)">
          {{ comment.userName || 'Unknown User' }}
=======
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
<template>
  <div class="comment">
    <img
      :src="comment.photo || defaultAvatar"
      alt="Profile"
      class="avatar"
      @click="goToUserProfile(comment.userId)"
    />
    <div class="comment-content">
      <div class="comment-bubble">
<<<<<<< HEAD
        <div class="comment-author" @click="goToUserProfile(comment.userId)">
          {{ comment.userName || 'Unknown User' }}
=======
        <div class="comment-author" @click="goToUserProfile(comment.authorId)">
          {{ comment.author?.name || 'Unknown User' }}
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
        </div>
        <div class="comment-text">{{ comment.content }}</div>
      </div>
      <div class="comment-actions">
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        <span>Like</span>
        <span>Reply</span>
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
        <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
<<<<<<< HEAD
  },
  defaultAvatar: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const formatDate = (dateString) => {
  if (!dateString) return '未知時間'

  // 直接顯示後端返回的 createdAt 格式，例如 "2025-04-14 15:15"
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const goToUserProfile = (userId) => {
  if (userId) {
    router.push(`/user/${userId}`)
=======
  },
  defaultAvatar: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const formatDate = (dateString) => {
  if (!dateString) return '未知時間'

  // 直接顯示後端返回的 createdAt 格式，例如 "2025-04-14 15:15"
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const goToUserProfile = (userId) => {
  if (userId) {
    router.push(`/user/${userId}`)
=======
<script>
export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Unknown date'
      
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffMins < 60) {
        return diffMins === 0 ? 'Just now' : `${diffMins}m ago`
      } else if (diffHours < 24) {
        return `${diffHours}h ago`
      } else if (diffDays < 7) {
        return `${diffDays}d ago`
      } else {
        return date.toLocaleDateString()
      }
    },
    goToUserProfile(userId) {
      if (userId) {
        this.$router.push(`/user/${userId}`)
      }
    }
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  }
}
</script>

<style scoped>
<<<<<<< HEAD
/* 樣式保持不變 */
=======
<<<<<<< HEAD
/* 樣式保持不變 */
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
.comment {
  display: flex;
  margin-bottom: 12px;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.comment-content {
  flex: 1;
}

.comment-bubble {
  background-color: #f0f2f5;
  border-radius: 18px;
  padding: 8px 12px;
  display: inline-block;
  max-width: 100%;
}

.comment-author {
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 2px;
  cursor: pointer;
}

.comment-author:hover {
  text-decoration: underline;
}

.comment-text {
  font-size: 14px;
  word-wrap: break-word;
}

.comment-actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
  margin-left: 12px;
  font-size: 12px;
  color: #65676b;
}

.comment-actions span {
  cursor: pointer;
  font-weight: bold;
}

.comment-actions span:hover:not(.comment-time) {
  text-decoration: underline;
}

.comment-time {
  font-weight: normal;
  cursor: default;
}
</style>
