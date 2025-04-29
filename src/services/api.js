import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  signIn: (credentials) => api.post('/auth/signin', credentials),
  signUp: (userData) => api.post('/auth/signup', userData),
  signOut: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Forum endpoints
export const forum = {
  // Get all entries
  getEntries: (page = 1, limit = 10) => 
    api.get(`/entries?page=${page}&limit=${limit}`),
  
  // Get single entry
  getEntry: (id) => api.get(`/entries/${id}`),
  
  // Create new entry
  createEntry: (entryData) => api.post('/entries', entryData),
  
  // Update entry
  updateEntry: (id, entryData) => api.put(`/entries/${id}`, entryData),
  
  // Delete entry
  deleteEntry: (id) => api.delete(`/entries/${id}`),
  
  // Get comments for an entry
  getComments: (entryId) => api.get(`/entries/${entryId}/comments`),
  
  // Add comment to an entry
  addComment: (entryId, commentData) => 
    api.post(`/entries/${entryId}/comments`, commentData),
  
  // Update comment
  updateComment: (entryId, commentId, commentData) => 
    api.put(`/entries/${entryId}/comments/${commentId}`, commentData),
  
  // Delete comment
  deleteComment: (entryId, commentId) => 
    api.delete(`/entries/${entryId}/comments/${commentId}`),
};

// User endpoints
export const user = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  getEntries: (userId) => api.get(`/user/${userId}/entries`),
  getComments: (userId) => api.get(`/user/${userId}/comments`),
};

export default api; 