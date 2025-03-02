import { Policy } from './interfaces/data'

const API_URL = import.meta.env.VITE_API_URL

// Fetch all claims
export const fetchClaims = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Not authenticated')
  }
  const res = await fetch(`${API_URL}/v1/claims`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

// Fetch all claims summary (public)
export const fetchClaimsSummary = async () => {
  const res = await fetch(`${API_URL}/v1/claims/summary`)
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

  const res = await fetch(`${API_URL}/v1/claims`, {
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
  if (!token) {
    throw new Error('Not authenticated')
  }

  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  const res = await fetch(`${API_URL}/v1/uploads/documents/${claimId}`, {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    throw new Error('Failed to upload document')
  }

  return res.json() // Expecting { documentUrls: ["..."] }
}

//TODO: use policy api
export const getPolicies = async () => {
  const policies: Policy[] = [
    { userId: '65d4f1c3-b12a-4e9b-9d6f-7e2af2ab1234', policyNumber: 'INS-7856' },
    { userId: '95d4f1c3-b12a-4e9b-9d6f-7e2af2ab1234', policyNumber: 'INS-4509' },
    { userId: '10d4f1c3-b12a-4e9b-9d6f-7e2af2ab1234', policyNumber: 'INS-6700' },
    { userId: '65d4f1c3-b12a-4e9b-9d6f-7e2af2ab1234', policyNumber: 'INS-9520' },
  ]

  return policies
}
