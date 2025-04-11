import axios from 'axios'
import mockServices from './mock'

// Use mock services in development
const USE_MOCK = true

// Base API service
const apiService = {
  // Auth endpoints
  auth: {
    register: (userData) => {
      if (USE_MOCK) {
        return mockServices.auth.register(userData)
      }
      return axios.post('/auth/register', userData)
    },
    login: (credentials) => {
      if (USE_MOCK) {
        return mockServices.auth.login(credentials)
      }
      return axios.post('/auth/login', credentials)
    },
    getCurrentUser: () => {
      if (USE_MOCK) {
        return mockServices.auth.getCurrentUser()
      }
      return axios.get('/user/me')
    },
    me: () => {
      if (USE_MOCK) {
        return mockServices.auth.getCurrentUser()
      }
      return axios.get('/user/me')
    }
  },
  
  // Posts endpoints
  posts: {
    getAll: () => {
      if (USE_MOCK) {
        return mockServices.posts.getAllPosts()
      }
      return axios.get('/posts')
    },
    getById: (id) => {
      if (USE_MOCK) {
        return mockServices.posts.getPostById(id)
      }
      return axios.get(`/posts/${id}`)
    },
    create: (postData) => {
      if (USE_MOCK) {
        return mockServices.posts.createPost(postData)
      }
      return axios.post('/posts', postData)
    },
    update: (id, postData) => {
      if (USE_MOCK) {
        return mockServices.posts.updatePost(id, postData)
      }
      return axios.put(`/posts/${id}`, postData)
    },
    delete: (id) => {
      if (USE_MOCK) {
        return mockServices.posts.deletePost(id)
      }
      return axios.delete(`/posts/${id}`)
    },
    getUserPosts: (userId) => {
      if (USE_MOCK) {
        return mockServices.posts.getUserPosts(userId)
      }
      return axios.get(`/user/${userId}/posts`)
    }
  },
  
  // Comments endpoints
  comments: {
    create: (postId, commentData) => {
      if (USE_MOCK) {
        return mockServices.posts.addComment(postId, commentData)
      }
      return axios.post(`/posts/${postId}/comments`, commentData)
    },
    getByPostId: (postId) => {
      if (USE_MOCK) {
        const post = mockServices.posts.getPostById(postId)
        return post.then(data => data.comments)
      }
      return axios.get(`/posts/${postId}/comments`)
    }
  },
  
  // User endpoints
  users: {
    getById: (id) => {
      if (USE_MOCK) {
        const user = mockServices.auth.users?.find(u => u.id === id)
        return Promise.resolve(user)
      }
      return axios.get(`/user/${id}`)
    },
    update: (id, userData) => {
      // Not implemented in mock yet
      return axios.put(`/user/${id}`, userData)
    }
  }
}

export default apiService
