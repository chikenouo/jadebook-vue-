// src/api/index.js
import request from './request'

// 獲取所有貼文，支援查詢參數（例如 includeComments）
export const getAllPostsApi = (params) => request.get('/api/posts', { params })

export const getAllCommentsApi = (postId) =>
  request.get(`/api/posts/${postId}/comments`)

// 註冊
export const registerApi = (registerData) =>
  request.post('/api/register', registerData)

// 發文
export const createPostApi = (postData) => request.post('/api/posts', postData)

// 新增留言
export const createCommentApi = (postId, commentData) =>
  request.post(`/api/posts/${postId}/comments`, commentData)
