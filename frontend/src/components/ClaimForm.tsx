import { useState, useEffect } from 'react'

interface Policy {
  userId: string
  policyNumber: string
}

interface ClaimFormProps {
  onSubmit: (userId: string, policyNumber: string, description: string, file: File) => Promise<void>
  policies: Policy[]
}

export function ClaimForm({ onSubmit, policies }: ClaimFormProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(
    policies.length > 0 ? policies[0] : null
  )
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update selectedPolicy when policies prop changes
  useEffect(() => {
    if (policies.length > 0) {
      setSelectedPolicy(policies[0])
    }
  }, [policies])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file before submitting.')
      return
    }
    if (!selectedPolicy) {
      alert('Please select a policy.')
      return
    }
    try {
      setIsSubmitting(true)
      await onSubmit(selectedPolicy.userId, selectedPolicy.policyNumber, description, file)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="p-6 bg-gray-900 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2">Select Policy</label>
        <select
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={selectedPolicy ? selectedPolicy.policyNumber : ''}
          onChange={(e) => {
            const policy = policies.find(
              (p) => p.policyNumber === (e.target as HTMLInputElement).value
            )
            setSelectedPolicy(policy || null)
          }}
          required
        >
          {policies.map((policy) => (
            <option key={policy.policyNumber} value={policy.policyNumber}>
              {policy.policyNumber} ({policy.userId})
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription((e.target as HTMLInputElement).value)}
        required
      ></textarea>
      <input
        type="file"
        className="w-full p-3 bg-gray-800 text-white border border-gray-600"
        onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)}
        accept="image/png, image/jpeg, application/pdf"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 rounded text-white ${
          isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Claim'}
      </button>
    </form>
  )
}
