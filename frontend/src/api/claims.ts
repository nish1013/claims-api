const API_URL = import.meta.env.VITE_API_URL

export const fetchClaims = async () => {
  const res = await fetch(`${API_URL}/claims`)
  return res.json()
}

export const submitClaim = async (data: FormData) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')

  return fetch(`${API_URL}/claims`, {
    method: 'POST',
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  })
}
