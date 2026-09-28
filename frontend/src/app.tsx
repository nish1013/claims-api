import { useState, useEffect } from 'preact/hooks'
import { ClaimForm } from './components/ClaimForm'
import { ClaimList } from './components/ClaimList'
import LoginModal from './components/LoginModal'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import {
  fetchClaims,
  submitClaim,
  uploadClaimDocuments,
  fetchClaimsSummary,
  getPolicies,
} from './api/api'
import { logout } from './api/auth'
import { isTokenExpired } from './api/token'
import { Policy } from './api/interfaces/data'

export function App() {
  const [claims, setClaims] = useState([])
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'))
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [policies, setPolicies] = useState<Policy[]>([])

  useEffect(() => {
    if (isTokenExpired()) {
      logout()
      setUser(null)
      return
    }

    const load = user ? fetchClaims : fetchClaimsSummary
    load()
      .then((list) => {
        setClaims(list)
        setError(null)
      })
      .catch(() => setError('Could not load claims.'))
  }, [user])

  useEffect(() => {
    getPolicies().then(setPolicies)
  }, [])

  const handleClaimSubmit = async (
    userId: string,
    policyNumber: string,
    description: string,
    file: File
  ) => {
    if (!user || isTokenExpired()) {
      logout()
      setUser(null)
      setShowLogin(true)
      return
    }
    try {
      const { _id } = await submitClaim({ userId, policyNumber, description })
      await uploadClaimDocuments(_id, [file])
      setClaims(await fetchClaims())
      setError(null)
    } catch {
      setError('Could not submit the claim.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={(name) => setUser(name)} />
      )}

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
            <p className="text-muted">Submit a claim with a document, then track its status.</p>
          </div>
          {user ? (
            <button
              className="btn-ghost"
              onClick={() => {
                logout()
                setUser(null)
              }}
            >
              Sign out ({user})
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          )}
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-rejected/40 bg-rejected/10 px-4 py-3 text-sm text-rejected">
            {error}
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
          <ClaimForm onSubmit={handleClaimSubmit} policies={policies} disabled={!user} />
          <ClaimList claims={claims} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
