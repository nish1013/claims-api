import { useState, useEffect } from 'react'
import { ClaimForm } from './components/ClaimForm'
import { ClaimList } from './components/ClaimList'
import LoginModal from './components/LoginModal'
import { fetchClaims, submitClaim, uploadClaimDocuments } from './api/api'
import { logout } from './api/auth'
import { isTokenExpired } from './api/token'

export function App() {
  const [claims, setClaims] = useState([])
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'))
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isTokenExpired()) {
      logout()
      setUser(null)
      window.location.reload()
      return
    }

    fetchClaims()
      .then(setClaims)
      .catch(() => setError('Failed to load claims'))
  }, [])

  const handleClaimSubmit = async (
    userId: string,
    policyNumber: string,
    description: string,
    file: File
  ) => {
    if (!user) {
      setShowLogin(true)
      return
    }

    if (isTokenExpired()) {
      logout()
      setUser(null)
      setShowLogin(true)
      return
    }
    try {
      const { _id } = await submitClaim({ userId, policyNumber, description })
      await uploadClaimDocuments(_id, [file])
      setClaims(await fetchClaims()) // Refresh claims after upload
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
