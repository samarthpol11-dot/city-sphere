import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import api, { clearAuthData, setAuthData } from './api'

/* ============ Theme ============ */
const ThemeContext = createContext(null)

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('csphere_theme')
    if (saved) return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('csphere_theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme(){
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

/* ============ Auth (connected to SQLite & Prisma Backend) ============ */
const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('csphere_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // Validate session on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('csphere_token')
    if (token) {
      api.getMe()
        .then(res => {
          if (res?.user) {
            setUser(res.user)
            localStorage.setItem('csphere_user', JSON.stringify(res.user))
          }
        })
        .catch(() => {
          // Token invalid or expired
          clearAuthData()
          setUser(null)
        })
    }
  }, [])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const res = await api.login(credentials)
      setUser(res.user)
      return res
    } catch (err) {
      // Fallback for offline demo if server is not reachable
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        const fallbackProfile = { name: credentials.name || credentials.email.split('@')[0], email: credentials.email }
        setUser(fallbackProfile)
        setAuthData(fallbackProfile, 'demo_offline_token')
        return { user: fallbackProfile }
      }
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    setLoading(true)
    try {
      const res = await api.register(userData)
      setUser(res.user)
      return res
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    clearAuthData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

/* ============ Cart ============ */
const CartContext = createContext(null)

export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('csphere_cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('csphere_cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, badge: product.badge, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

/* ============ UI (login modal coordination) ============ */
const UIContext = createContext(null)

export function UIProvider({ children }){
  const [loginOpen, setLoginOpen] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null)
  return (
    <UIContext.Provider value={{ loginOpen, setLoginOpen, pendingProduct, setPendingProduct }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI(){
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside UIProvider')
  return ctx
}
