<template>
  <div class="comment">
    <img 
      :src="comment.author?.photo || require('@/assets/defaultAvatar.svg')" 
      alt="Profile" 
      class="avatar"
      @click="goToUserProfile(comment.authorId)"
    >
    <div class="comment-content">
      <div class="comment-bubble">
        <div class="comment-author" @click="goToUserProfile(comment.authorId)">
          {{ comment.author?.name || 'Unknown User' }}
        </div>
        <div class="comment-text">{{ comment.content }}</div>
      </div>
      <div class="comment-actions">
        <span>Like</span>
        <span>Reply</span>
        <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

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
  }
}
</script>

<style scoped>
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
