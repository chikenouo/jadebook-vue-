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
        // Make sure to convert string IDs for comparison
        const post = posts.find(p => p.id === id.toString())
        if (post) {
          // Return a deep copy with all associated objects
          const postCopy = JSON.parse(JSON.stringify(post))
          
          // Ensure author data is populated
          if (postCopy.authorId) {
            const author = users.find(u => u.id === postCopy.authorId)
            if (author) {
              postCopy.author = { ...author }
              delete postCopy.author.password
            }
          }
          
          // Ensure comment authors are populated
          if (postCopy.comments && postCopy.comments.length > 0) {
            postCopy.comments.forEach(comment => {
              if (comment.authorId) {
                const commentAuthor = users.find(u => u.id === comment.authorId)
                if (commentAuthor) {
                  comment.author = { ...commentAuthor }
                  delete comment.author.password
                }
              }
            })
          }
          
          resolve({
            data: postCopy
          })
        } else {
          // Create an empty post if not found (for development only)
          const defaultPost = {
            id: id.toString(),
            authorId: '1',
            author: { ...users[0], password: undefined },
            content: 'This is a sample post created for demonstration purposes.',
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: []
          }
          
          // Add to posts array for future reference
          posts.push(defaultPost)
          
          resolve({
            data: defaultPost
          })
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
        let post = posts.find(p => p.id === postId.toString())
        
        // If post doesn't exist, create it (for development purposes only)
        if (!post) {
          post = {
            id: postId.toString(),
            authorId: '1', // Default to first user
            author: { ...users[0], password: undefined },
            content: 'This is a sample post created for demonstration purposes.',
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: []
          }
          posts.push(post)
        }
        
        // Create the new comment
        const newComment = {
          id: String(post.comments.length + 1),
          postId: postId.toString(),
          authorId: mockAuthService.currentUser.id,
          author: { ...mockAuthService.currentUser },
          content: commentData.content,
          createdAt: new Date().toISOString()
        }
        
        // Add the comment to the post
        post.comments.push(newComment)
        
        resolve({
          data: newComment
        })
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

// Mock users service
const mockUsersService = {
  update(userId, userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }
        
        // Update user data
        const updatedUser = {
          ...users[userIndex],
          ...userData,
          // Don't allow changing id or password via this method
          id: users[userIndex].id
        };
        
        // Update the user in the users array
        users[userIndex] = updatedUser;
        
        // Update the currentUser if this is the logged in user
        if (mockAuthService.currentUser && mockAuthService.currentUser.id === userId) {
          mockAuthService.currentUser = { ...updatedUser };
          delete mockAuthService.currentUser.password;
        }
        
        // Update author references in posts and comments
        posts.forEach(post => {
          if (post.authorId === userId) {
            post.author = {
              id: updatedUser.id,
              name: updatedUser.name,
              photo: updatedUser.photo
            };
          }
          
          post.comments.forEach(comment => {
            if (comment.authorId === userId) {
              comment.author = {
                id: updatedUser.id,
                name: updatedUser.name,
                photo: updatedUser.photo
              };
            }
          });
        });
        
        resolve({
          data: { ...updatedUser, password: undefined }
        });
      }, 500);
    });
  },
  
  updatePassword(currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!mockAuthService.currentUser) {
          reject(new Error('Not authenticated'));
          return;
        }
        
        const userIndex = users.findIndex(u => u.id === mockAuthService.currentUser.id);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }
        
        // Verify current password
        if (users[userIndex].password !== currentPassword) {
          reject(new Error('Current password is incorrect'));
          return;
        }
        
        // Update password
        users[userIndex].password = newPassword;
        
        resolve({
          data: { success: true }
        });
      }, 500);
    });
  },
  
  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.id === id);
        if (user) {
          const userCopy = { ...user };
          delete userCopy.password;
          resolve({
            data: userCopy
          });
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }
};

export const mockServices = {
  auth: mockAuthService,
  posts: mockPostsService,
  users: mockUsersService
}

export default mockServices