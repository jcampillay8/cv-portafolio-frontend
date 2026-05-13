const BASE_URL = '/api/v1'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 204) return null

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.detail || 'API Error')
    error.status = response.status
    throw error
  }

  return data
}

export const api = {
  // Auth
  login(username, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },
  me() {
    return request('/auth/me')
  },

  // Proyectos
  getProyectos(params = '') {
    return request(`/proyectos/${params}`)
  },
  getProyecto(id) {
    return request(`/proyectos/${id}`)
  },
  createProyecto(data) {
    return request('/proyectos/', { method: 'POST', body: JSON.stringify(data) })
  },
  updateProyecto(id, data) {
    return request(`/proyectos/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  },
  deleteProyecto(id) {
    return request(`/proyectos/${id}`, { method: 'DELETE' })
  },

  // Experiencias
  getExperiencias(params = '') {
    return request(`/experiencias/${params}`)
  },
  getExperiencia(id) {
    return request(`/experiencias/${id}`)
  },
  createExperiencia(data) {
    return request('/experiencias/', { method: 'POST', body: JSON.stringify(data) })
  },
  updateExperiencia(id, data) {
    return request(`/experiencias/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  },
  deleteExperiencia(id) {
    return request(`/experiencias/${id}`, { method: 'DELETE' })
  },

  // Estudios
  getEstudios() {
    return request('/estudios/')
  },
  getEstudio(id) {
    return request(`/estudios/${id}`)
  },
  createEstudio(data) {
    return request('/estudios/', { method: 'POST', body: JSON.stringify(data) })
  },
  updateEstudio(id, data) {
    return request(`/estudios/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  },
  deleteEstudio(id) {
    return request(`/estudios/${id}`, { method: 'DELETE' })
  },
}
