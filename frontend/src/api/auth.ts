const API_URL = import.meta.env.VITE_API_URL

export const login = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'user', password: 'password' }),
    })
    if (!res.ok) throw new Error('Invalid credentials')

    const data = await res.json()
    localStorage.setItem('user', 'user')
    localStorage.setItem('token', data.access_token)
    return { user: 'user', token: data.access_token }
  } catch (err) {
    return { error: 'Login failed' }
  }
}

export const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}
