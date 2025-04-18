// src/api/index.js
import request from './request'

// 獲取所有貼文，支援查詢參數（例如 includeComments）
export const getAllPostsApi = (params) => request.get('/api/posts', { params })

export const getAllCommentsApi = (postId) =>
  request.get(`/api/posts/${postId}/comments`)

// 註冊
export const registerApi = (registerData) =>
  request.post('/api/register', registerData)
