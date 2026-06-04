import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminLogin() {
  const { isAuthed, login } = useAdmin()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthed) return <Navigate to="/admin/dashboard" replace />

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setTimeout(() => {
      const ok = login(password)
      if (ok) {
        navigate('/admin/dashboard', { replace: true })
      } else {
        setError(true)
        setPassword('')
        setLoading(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm card">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="text-accent text-2xl">&#9654;</span>
          <span className="font-orbitron font-black text-base text-text-primary">
            Anime1Point <span className="text-accent">Admin</span>
          </span>
        </div>
        <h2 className="font-orbitron text-center text-lg font-bold mb-1 text-text-primary">Admin Access</h2>
        <p className="text-text-secondary text-xs text-center mb-6">Restricted to Anime1Point team only.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              placeholder="Enter admin password"
              className="form-input"
              autoFocus
              required
            />
          </div>
          {error && (
            <p className="text-accent text-xs text-center mb-4">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Login to Admin Panel'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-text-secondary text-xs hover:text-text-primary transition-colors">
            &larr; Back to Site
          </a>
        </div>
      </div>
    </div>
  )
}
