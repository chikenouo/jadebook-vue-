// Mock API service to provide sample data
import { setToken } from '../utils/auth';

// Sample user data
const currentUser = {
  id: '1',
  name: '王小明',
  email: 'wang@example.com',
  phoneNumber: '1234567890',
  photo: null,
  bio: '我是一個熱愛生活的人，喜歡旅行和美食。'
};

// Sample posts data
const posts = [
  {
    id: '1',
    content: '今天的天氣真好，出去走走放鬆一下心情！',
    authorId: '1',
    author: {
      id: '1',
      name: '王小明',
      photo: null
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likes: 15,
    comments: [
      {
        id: '1',
        content: '天氣確實不錯，享受陽光吧！',
        authorId: '2',
        author: {
          id: '2',
          name: '李小華',
          photo: null
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() // 25 minutes ago
      },
      {
        id: '2',
        content: '我也想出去走走，不過還有工作要做...',
        authorId: '3',
        author: {
          id: '3',
          name: '張大山',
          photo: null
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() // 20 minutes ago
      }
    ]
  },
  {
    id: '2',
    content: '分享一本最近看的好書：《思考，快與慢》，強烈推薦給大家！',
    authorId: '2',
    author: {
      id: '2',
      name: '李小華',
      photo: null
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    likes: 42,
    comments: [
      {
        id: '3',
        content: '我也看過這本書，確實很有啟發性！',
        authorId: '1',
        author: {
          id: '1',
          name: '王小明',
          photo: null
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 100).toISOString() // 100 minutes ago
      }
    ]
  },
  {
    id: '3',
    content: '剛學會一道新菜，香煎鮭魚配蘆筍，簡單又美味！下次分享詳細食譜。',
    authorId: '3',
    author: {
      id: '3',
      name: '張大山',
      photo: null
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    likes: 28,
    comments: [
      {
        id: '4',
        content: '看起來很美味！期待你的食譜。',
        authorId: '1',
        author: {
          id: '1',
          name: '王小明',
          photo: null
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 230).toISOString() // 230 minutes ago
      },
      {
        id: '5',
        content: '我也喜歡煎鮭魚，但總是煎得太老了，有什麼訣竅嗎？',
        authorId: '2',
        author: {
          id: '2',
          name: '李小華',
          photo: null
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 220).toISOString() // 220 minutes ago
      },
      {
        id: '6',
        content: '關鍵是溫度控制和時間，中高溫煎3分鐘，翻面再煎2分鐘就可以了。',
        authorId: '3',
        author: {
          id: '3',
          name: '張大山',
          photo: null
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 210).toISOString() // 210 minutes ago
      }
    ]
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
const mockApi = {
  // Auth endpoints
  auth: {
    login: async () => {
      await delay(800);
      const token = 'mock-jwt-token-' + Date.now();
      setToken(token);
      return {
        data: {
          token,
          user: currentUser
        }
      };
    },
    register: async (userData) => {
      await delay(1000);
      const token = 'mock-jwt-token-' + Date.now();
      setToken(token);
      return {
        data: {
          token,
          user: { ...currentUser, ...userData }
        }
      };
    },
    getCurrentUser: async () => {
      await delay(500);
      return {
        data: currentUser
      };
    }
  },
  
  // Posts endpoints
  posts: {
    getAll: async () => {
      await delay(700);
      return {
        data: posts
      };
    },
    getById: async (id) => {
      await delay(600);
      const post = posts.find(p => p.id === id);
      if (!post) {
        throw new Error('Post not found');
      }
      return {
        data: post
      };
    },
    create: async (postData) => {
      await delay(900);
      const newPost = {
        id: String(posts.length + 1),
        content: postData.content,
        authorId: currentUser.id,
        author: {
          id: currentUser.id,
          name: currentUser.name,
          photo: currentUser.photo
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      posts.unshift(newPost);
      return {
        data: newPost
      };
    },
    update: async (id, postData) => {
      await delay(800);
      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      const updatedPost = {
        ...posts[postIndex],
        content: postData.content
      };
      posts[postIndex] = updatedPost;
      return {
        data: updatedPost
      };
    },
    delete: async (id) => {
      await delay(700);
      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      posts.splice(postIndex, 1);
      return {
        data: { success: true }
      };
    }
  },
  
  // Comments endpoints
  comments: {
    create: async (postId, commentData) => {
      await delay(800);
      const post = posts.find(p => p.id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
      
      const newComment = {
        id: String(Math.floor(Math.random() * 1000)),
        content: commentData.content,
        authorId: currentUser.id,
        author: {
          id: currentUser.id,
          name: currentUser.name,
          photo: currentUser.photo
        },
        createdAt: new Date().toISOString()
      };
      
      post.comments.push(newComment);
      
      return {
        data: newComment
      };
    }
  }
};

export default mockApi;