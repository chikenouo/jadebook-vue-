/**
 * Check if user is authenticated by checking token in localStorage
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}

/**
 * Get current user token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token')
}

/**
 * Store token in localStorage
 * @param {string} token
 */
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  }
}

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token')
}

/**
 * Decode JWT token to get expiration time
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token) return true
  
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    
    const { exp } = JSON.parse(jsonPayload)
    const now = Date.now() / 1000
    
    return exp < now
  } catch (error) {
    console.error('Error decoding token', error)
    return true
  }
}
