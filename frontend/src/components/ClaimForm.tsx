import { useState, useEffect } from 'preact/hooks'
import { Policy } from '../api/interfaces/data'

interface ClaimFormProps {
  onSubmit: (userId: string, policyNumber: string, description: string, file: File) => Promise<void>
  policies: Policy[]
  disabled: boolean
}

export function ClaimForm({ onSubmit, policies, disabled }: ClaimFormProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(policies[0] ?? null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSelectedPolicy(policies[0] ?? null)
  }, [policies])

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!selectedPolicy) return setError('Choose a policy.')
    if (!file) return setError('Attach a supporting document.')
    setError(null)
    try {
      setIsSubmitting(true)
      await onSubmit(selectedPolicy.userId, selectedPolicy.policyNumber, description, file)
      setDescription('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="card space-y-4 p-5" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold">New claim</h2>
      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Policy</span>
        <select
          className="field"
          value={selectedPolicy?.policyNumber ?? ''}
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value
            setSelectedPolicy(policies.find((p) => p.policyNumber === value) ?? null)
          }}
          required
        >
          {policies.map((policy) => (
            <option key={policy.policyNumber} value={policy.policyNumber}>
              {policy.policyNumber}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm text-muted">What happened</span>
        <textarea
          className="field min-h-24"
          value={description}
          onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
          required
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Supporting document (PNG, JPEG or PDF)</span>
        <input
          type="file"
          className="field file:mr-3 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-1 file:text-ink"
          onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] ?? null)}
          accept="image/png, image/jpeg, application/pdf"
        />
      </label>
      {error && <p className="text-sm text-rejected">{error}</p>}
      <button type="submit" disabled={disabled || isSubmitting} className="btn-primary w-full">
        {isSubmitting ? 'Submitting…' : 'Submit claim'}
      </button>
      {disabled && <p className="text-center text-sm text-muted">Sign in to submit a claim.</p>}
    </form>
  )
}
