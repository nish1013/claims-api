const API_URL = import.meta.env.VITE_API_URL

// Fetch all claims
export const fetchClaims = async () => {
  const res = await fetch(`${API_URL}/claims`)
  return res.json()
}

// Submit a new claim (JSON request)
export const submitClaim = async (claimData: {
  userId: string
  policyNumber: string
  description: string
}) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Not authenticated')
  }

  const res = await fetch(`${API_URL}/claims`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(claimData),
  })

  if (!res.ok) {
    throw new Error('Failed to create claim')
  }

  return res.json() // Expecting { claimId: "..." }
}

// Upload documents for a claim (Multipart FormData request)
export const uploadClaimDocuments = async (claimId: string, files: File[]) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')

  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  const res = await fetch(`${API_URL}/uploads/documents/${claimId}`, {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error('Failed to upload document')

  return res.json() // Expecting { documentUrls: ["..."] }
}
