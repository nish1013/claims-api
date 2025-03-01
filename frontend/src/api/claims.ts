const API_URL = import.meta.env.VITE_API_URL

export const fetchClaims = async () => {
  const res = await fetch(`${API_URL}/claims`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return res.json()
}

export const submitClaim = async (data: FormData) => {
  return fetch(`${API_URL}/claims`, {
    method: 'POST',
    body: data,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}
