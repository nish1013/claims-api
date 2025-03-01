import { useState, useEffect } from 'react'
import { ClaimForm } from './components/ClaimForm'
import { ClaimList } from './components/ClaimList'
import LoginModal from './components/LoginModal'
import { fetchClaims, submitClaim } from './api/claims'
import { logout } from './api/auth'

export function App() {
  const [claims, setClaims] = useState([])
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'))
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClaims()
      .then(setClaims)
      .catch(() => setError('Failed to load claims'))
  }, [])

  const handleClaimSubmit = async (data: FormData) => {
    if (!user) {
      setShowLogin(true)
      return
    }
    try {
      await submitClaim(data)
      setClaims(await fetchClaims()) // Refresh claims
    } catch {
      setError('Failed to submit claim')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 w-full">
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={(user) => setUser(user)} />
      )}

      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Claims Admin Portal</h1>
        {user ? (
          <button
            onClick={() => {
              logout()
              setUser(null)
            }}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout ({user})
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)} className="bg-blue-600 px-4 py-2 rounded">
            Login
          </button>
        )}
      </div>

      {!user && <p className="text-gray-400 mb-4">Login to submit a claim.</p>}
      <ClaimForm onSubmit={handleClaimSubmit} />
      <ClaimList claims={claims} />
    </div>
  )
}
