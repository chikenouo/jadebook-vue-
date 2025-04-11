import { createStore } from 'vuex'
import apiService from '@/api'

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    posts: [],
    currentPost: null,
    loading: false,
    error: null
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    currentUser(state) {
      return state.user
    },
    allPosts(state) {
      return state.posts
    },
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id)
    },
    isLoading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    ADD_POST(state, post) {
      state.posts.unshift(post)
    },
    UPDATE_POST(state, updatedPost) {
      const index = state.posts.findIndex(post => post.id === updatedPost.id)
      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost)
      }
    },
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId)
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post
    },
    ADD_COMMENT(state, { postId, comment }) {
      if (state.currentPost && state.currentPost.id === postId) {
        state.currentPost.comments.push(comment)
      }
      
      const postIndex = state.posts.findIndex(post => post.id === postId)
      if (postIndex !== -1) {
        if (!state.posts[postIndex].comments) {
          state.posts[postIndex].comments = []
        }
        state.posts[postIndex].comments.push(comment)
      }
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    // Auto login for demo purposes
    async autoLogin({ commit, dispatch }) {
      try {
        // For demonstration only - automatically log in with mock data
        if (process.env.NODE_ENV === 'development') {
          commit('SET_LOADING', true)
          commit('SET_ERROR', null)
          
          // Using default test credentials
          const response = await apiService.auth.login({
            phoneNumber: '1234567890',
            password: 'password123'
          })
          
          if (response && response.data) {
            const { token, user } = response.data
            
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            
            // Fetch posts after login
            await dispatch('fetchPosts')
          }
        }
      } catch (error) {
        console.error('Auto login failed:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // Authentication actions
    async register({ commit, dispatch }, userData) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.auth.register(userData)
        const { token, user } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Registration failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async login({ commit, dispatch }, credentials) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.auth.login(credentials)
        const { token, user } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        
        // Fetch posts after login
        await dispatch('fetchPosts')
        
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Login failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchCurrentUser({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await apiService.auth.getCurrentUser()
        commit('SET_USER', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch user data')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    logout({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
      commit('SET_POSTS', [])
      commit('SET_CURRENT_POST', null)
    },
    
    // Post actions
    async fetchPosts({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.posts.getAll()
        commit('SET_POSTS', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch posts')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchPostById({ commit }, postId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.posts.getById(postId)
        commit('SET_CURRENT_POST', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch post')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async createPost({ commit }, postData) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.posts.create(postData)
        commit('ADD_POST', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to create post')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async updatePost({ commit }, { postId, postData }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.posts.update(postId, postData)
        commit('UPDATE_POST', response.data)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update post')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async deletePost({ commit }, postId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        await apiService.posts.delete(postId)
        commit('DELETE_POST', postId)
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to delete post')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async addComment({ commit, dispatch }, { postId, commentData }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        console.log('Adding comment to post ID:', postId, 'with data:', commentData)
        const response = await apiService.comments.create(postId, commentData)
        commit('ADD_COMMENT', { postId, comment: response.data })
        
        // 重新获取帖子以确保评论列表是最新的
        await dispatch('fetchPostById', postId)
        return response
      } catch (error) {
        console.error('Failed to add comment:', error)
        commit('SET_ERROR', error.response?.data?.message || 'Failed to add comment')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchUserPosts({ commit }, userId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await apiService.posts.getAll() // Using all posts since we're mocking
        const userPosts = response.data.filter(post => post.authorId === userId)
        commit('SET_POSTS', userPosts)
        return { data: userPosts }
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch user posts')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // User profile actions
    async updateUserProfile({ commit }, { userId, userData }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        // Call API to update user profile
        const response = await apiService.users.update(userId, userData)
        
        // Update user in state
        commit('SET_USER', response.data)
        
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update user profile')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async updatePassword({ commit }, { currentPassword, newPassword }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        // Call API to update password
        const response = await apiService.users.updatePassword(currentPassword, newPassword)
        
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update password')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})
