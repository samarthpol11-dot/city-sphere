const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api'

export const getToken = () => localStorage.getItem('csphere_token')

export const setAuthData = (user, token) => {
  if (token) localStorage.setItem('csphere_token', token)
  if (user) localStorage.setItem('csphere_user', JSON.stringify(user))
}

export const clearAuthData = () => {
  localStorage.removeItem('csphere_token')
  localStorage.removeItem('csphere_user')
}

async function request(endpoint, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data.message || `Request failed (${res.status})`)
    }

    return data
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err)
    throw err
  }
}

export const api = {
  // Auth
  login: async (credentials) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    setAuthData(data.user, data.token)
    return data
  },

  register: async (userData) => {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    setAuthData(data.user, data.token)
    return data
  },

  getMe: async () => {
    return request('/auth/me')
  },

  // Products
  getProducts: async () => {
    return request('/products')
  },

  getProduct: async (id) => {
    return request(`/products/${id}`)
  },

  // Orders / Quotes
  createOrder: async (orderData) => {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  },

  getMyOrders: async () => {
    return request('/orders/my-orders')
  },

  // Contact
  submitContact: async (inquiryData) => {
    return request('/contact', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    })
  }
}

export default api
