// Mock data for development
import { v4 as uuidv4 } from 'uuid'

const currentDate = new Date()
const yesterday = new Date(currentDate)
yesterday.setDate(currentDate.getDate() - 1)
const twoDaysAgo = new Date(currentDate)
twoDaysAgo.setDate(currentDate.getDate() - 2)

// Mock users
export const users = [
  {
    id: '1',
    name: '王小明',
    phoneNumber: '1234567890',
    email: 'xiaoming@example.com',
    password: 'password123',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: '喜欢编程和旅行的软件工程师'
  },
  {
    id: '2',
    name: '李小花',
    phoneNumber: '0987654321',
    email: 'xiaohua@example.com',
    password: 'password123',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: '热爱生活，享受每一刻'
  },
  {
    id: '3',
    name: '张大山',
    phoneNumber: '1357924680',
    email: 'dashan@example.com',
    password: 'password123',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: '摄影爱好者，记录美好生活'
  }
]

// Mock posts
export const posts = [
  {
    id: '1',
    authorId: '1',
    author: users.find(u => u.id === '1'),
    content: '今天是个好天气，出去走走吧！',
    createdAt: currentDate.toISOString(),
    likes: 15,
    comments: [
      {
        id: '1',
        postId: '1',
        authorId: '2',
        author: users.find(u => u.id === '2'),
        content: '确实是个好天气！',
        createdAt: currentDate.toISOString()
      },
      {
        id: '2',
        postId: '1',
        authorId: '3',
        author: users.find(u => u.id === '3'),
        content: '我刚好有空，一起吧！',
        createdAt: currentDate.toISOString()
      }
    ]
  },
  {
    id: '2',
    authorId: '2',
    author: users.find(u => u.id === '2'),
    content: '分享一个我最近学到的编程技巧，希望对大家有帮助！\n\n1. 始终保持代码简洁\n2. 写好注释\n3. 定期重构\n4. 学习新技术',
    createdAt: yesterday.toISOString(),
    likes: 25,
    comments: [
      {
        id: '3',
        postId: '2',
        authorId: '1',
        author: users.find(u => u.id === '1'),
        content: '谢谢分享，非常有用！',
        createdAt: yesterday.toISOString()
      }
    ]
  },
  {
    id: '3',
    authorId: '3',
    author: users.find(u => u.id === '3'),
    content: '刚拍的照片，想和大家分享一下。',
    createdAt: twoDaysAgo.toISOString(),
    likes: 42,
    comments: []
  }
]

// Mock authentication service
const mockAuthService = {
  currentUser: null,
  token: null,

  login(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Support both direct params and credentials object
        const phoneNumber = credentials?.phoneNumber || null;
        const password = credentials?.password || null;
        
        if (!phoneNumber || !password) {
          reject(new Error('Phone number and password are required'))
          return
        }
        
        const user = users.find(u => u.phoneNumber === phoneNumber && u.password === password)
        if (user) {
          this.currentUser = { ...user }
          delete this.currentUser.password
          this.token = 'mock-jwt-token-' + uuidv4()
          
          resolve({
            data: {
              token: this.token,
              user: this.currentUser
            }
          })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  },

  register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(
          u => u.phoneNumber === userData.phoneNumber || u.email === userData.email
        )
        
        if (existingUser) {
          reject(new Error('User already exists'))
          return
        }
        
        const newUser = {
          id: String(users.length + 1),
          ...userData
        }
        
        users.push(newUser)
        
        this.currentUser = { ...newUser }
        delete this.currentUser.password
        this.token = 'mock-jwt-token-' + uuidv4()
        
        resolve({
          data: {
            token: this.token,
            user: this.currentUser
          }
        })
      }, 500)
    })
  },

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.currentUser) {
          resolve({
            data: this.currentUser
          })
        } else {
          reject(new Error('Not authenticated'))
        }
      }, 300)
    })
  }
}

// Mock posts service
const mockPostsService = {
  getAllPosts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [...posts]
        })
      }, 500)
    })
  },

  getPostById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.id === id)
        if (post) {
          resolve({
            data: { ...post }
          })
        } else {
          reject(new Error('Post not found'))
        }
      }, 300)
    })
  },

  createPost(postData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          id: String(posts.length + 1),
          authorId: mockAuthService.currentUser.id,
          author: { ...mockAuthService.currentUser },
          content: postData.content,
          createdAt: new Date().toISOString(),
          likes: 0,
          comments: []
        }
        
        posts.unshift(newPost)
        resolve({
          data: newPost
        })
      }, 500)
    })
  },

  updatePost(id, postData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = posts.findIndex(p => p.id === id)
        if (index !== -1) {
          posts[index] = {
            ...posts[index],
            content: postData.content
          }
          resolve({
            data: posts[index]
          })
        } else {
          reject(new Error('Post not found'))
        }
      }, 300)
    })
  },

  deletePost(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = posts.findIndex(p => p.id === id)
        if (index !== -1) {
          posts.splice(index, 1)
          resolve({
            data: { success: true }
          })
        } else {
          reject(new Error('Post not found'))
        }
      }, 300)
    })
  },

  addComment(postId, commentData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.id === postId)
        if (post) {
          const newComment = {
            id: String(post.comments.length + 1),
            postId,
            authorId: mockAuthService.currentUser.id,
            author: { ...mockAuthService.currentUser },
            content: commentData.content,
            createdAt: new Date().toISOString()
          }
          
          post.comments.push(newComment)
          resolve({
            data: newComment
          })
        } else {
          reject(new Error('Post not found'))
        }
      }, 300)
    })
  },

  getUserPosts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userPosts = posts.filter(p => p.authorId === userId)
        resolve({
          data: [...userPosts]
        })
      }, 500)
    })
  }
}

export const mockServices = {
  auth: mockAuthService,
  posts: mockPostsService
}

export default mockServices