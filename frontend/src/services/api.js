import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api';

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const organizationId = localStorage.getItem('organizationId')
  const userId = localStorage.getItem('userId')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (organizationId) {
    config.headers['X-Organization-Id'] = organizationId
  }
  if (userId) {
    config.headers['X-User-Id'] = userId
  }
  return config
})

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
}

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  getMembers: (id) => api.get(`/projects/${id}/members`),
  addMember: (id, data) => api.post(`/projects/${id}/members`, data),
  removeMember: (projectId, userId) => api.delete(`/projects/${projectId}/members/${userId}`),
}

export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  getByProject: (projectId) => api.get(`/tasks/project/${projectId}`),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
}

export const commentsAPI = {
  getByTask: (taskId) => api.get(`/comments/task/${taskId}`),
  create: (taskId, data) => api.post(`/comments/task/${taskId}`, data),
  delete: (id) => api.delete(`/comments/${id}`),
}

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}

export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
}

export default api
