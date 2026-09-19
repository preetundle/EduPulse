const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {

  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    if(response.status === 401){
      localStorage.removeItem('token')
      window.location.href = '/'
      return
    }
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'GET',
    }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'DELETE',
    }),
}