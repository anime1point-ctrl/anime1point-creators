import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'anime1point2026'

export function AdminProvider({ children }) {
    const [isAuthed, setIsAuthed] = useState(
          () => sessionStorage.getItem('adminAuthed') === 'true'
        )
    const login = useCallback((pw) => {
          if (pw === ADMIN_PASSWORD) {
                  sessionStorage.setItem('adminAuthed', 'true')
                  setIsAuthed(true)
                  return true
          }
          return false
    }, [])
    const logout = useCallback(() => {
          sessionStorage.removeItem('adminAuthed')
          setIsAuthed(false)
    }, [])
    return (
          <AdminContext.Provider value={{ isAuthed, login, logout }}>
            {children}
          </AdminContext.Provider>AdminContext.Provider>
        )
}

export function useAdmin() {
    const ctx = useContext(AdminContext)
    if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
    return ctx
}
