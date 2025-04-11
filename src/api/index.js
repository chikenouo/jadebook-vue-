import axios from 'axios'

// Base API service with axios
const apiService = {
  // Auth endpoints
  auth: {
    register: (userData) => axios.post('/auth/register', userData),
    login: (phoneNumber) => axios.post('/auth/login', { phoneNumber }),
    me: () => axios.get('/user/me')
  },
  
  // Posts endpoints
  posts: {
    getAll: () => axios.get('/posts'),
    getById: (id) => axios.get(`/posts/${id}`),
    create: (postData) => axios.post('/posts', postData),
    update: (id, postData) => axios.put(`/posts/${id}`, postData),
    delete: (id) => axios.delete(`/posts/${id}`),
    getUserPosts: (userId) => axios.get(`/user/${userId}/posts`)
  },
  
  // Comments endpoints
  comments: {
    create: (postId, commentData) => axios.post(`/posts/${postId}/comments`, commentData),
    getByPostId: (postId) => axios.get(`/posts/${postId}/comments`)
  },
  
  // User endpoints
  users: {
    getById: (id) => axios.get(`/user/${id}`),
    update: (id, userData) => axios.put(`/user/${id}`, userData)
  }
}

export default apiService
