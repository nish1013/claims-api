import { useEffect, useState } from 'preact/hooks'
import { login } from '../api/auth'

interface LoginModalProps {
  onClose: () => void
  onLogin: (user: string) => void
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const result = await login(username, password)
    if (result.error) return setError(result.error)
    if (result.user) {
      onLogin(result.user)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="card w-full max-w-sm p-6"
      >
        <h2 id="login-title" className="mb-4 text-lg font-semibold">
          Sign in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="field"
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
            autoFocus
          />
          <input
            className="field"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
          {error && <p className="text-sm text-rejected">{error}</p>}
          <button className="btn-primary w-full">Sign in</button>
          <button type="button" className="btn-ghost w-full" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
