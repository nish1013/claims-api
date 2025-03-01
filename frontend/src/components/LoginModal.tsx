import { useState } from 'react'
import { login } from '../api/auth'

export default function LoginModal({
  onClose,
  onLogin,
}: {
  onClose: () => void
  onLogin: (user: string) => void
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await login(username, password)
    if (result.error) return setError(result.error)
    onLogin(result.user)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 bg-gray-700 rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-3 bg-gray-700 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 p-3 rounded text-white">Login</button>
        </form>
        <button className="mt-4 text-gray-400" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
