import { useState } from 'react'

interface ClaimFormProps {
  onSubmit: (userId: string, policyNumber: string, description: string, file: File) => Promise<void>
}

export function ClaimForm({ onSubmit }: ClaimFormProps) {
  const [userId, setUserId] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file before submitting.')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(userId, policyNumber, description, file)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="p-6 bg-gray-900 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      <input
        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="User ID e.g f47ac10b-58cc-4372-a567-0e02b2c3d479 (UUID)"
        value={userId}
        onChange={(e) => setUserId((e.target as HTMLInputElement).value)}
        required
      />
      <input
        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Policy Number e.g INS-ABC123"
        value={policyNumber}
        onChange={(e) => setPolicyNumber((e.target as HTMLInputElement).value)}
        required
      />
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
