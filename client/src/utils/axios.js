import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Fetch the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set the token in Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
