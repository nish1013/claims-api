const API_URL = import.meta.env.VITE_API_URL

export const login = async (username: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/v1//auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await res.json()
    localStorage.setItem('user', username)
    localStorage.setItem('token', data.access_token)

    return { user: username, token: data.access_token }
  } catch (err) {
    return { error: 'Login failed' }
  }
}

export const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}
