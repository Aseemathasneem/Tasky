import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Set your base URL here
});

// Set the Authorization header dynamically for all requests
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
