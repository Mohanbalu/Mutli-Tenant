import { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [organizationId, setOrganizationId] = useState(localStorage.getItem('organizationId'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('organizationId', organizationId || '')
      localStorage.setItem('userId', userId || '')
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('organizationId')
      localStorage.removeItem('userId')
    }
  }, [token, organizationId, userId])

  const login = (token, userData) => {
    setToken(token)
    setUser(userData)
    setOrganizationId(userData.organizationId)
    setUserId(userData.userId)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setOrganizationId(null)
    setUserId(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, organizationId, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}