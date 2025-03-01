import { useEffect, useState } from 'react'
import { fetchClaims, submitClaim } from './api/claims'
import { ClaimForm } from './components/ClaimForm'
import { ClaimList } from './components/ClaimList'

export function App() {
  const [claims, setClaims] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadClaims = async () => {
      try {
        const data = await fetchClaims()
        setClaims(data)
      } catch (err) {
        setError('Failed to load claims')
      }
    }
    loadClaims()
  }, [])

  const handleClaimSubmit = async (formData: FormData) => {
    try {
      await submitClaim(formData)
      const updatedClaims = await fetchClaims()
      setClaims(updatedClaims)
    } catch (err) {
      setError('Failed to submit claim')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 w-full">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Insurance Claims</h1>
        {error && <p className="text-red-400">{error}</p>}
        <ClaimForm onSubmit={handleClaimSubmit} />
        <ClaimList claims={claims} />
      </div>
    </div>
  )
   
}
