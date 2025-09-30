import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const register = (userData) => {
  return apiClient.post('/register', userData).then(response => response.data);
};

const login = (credentials) => {
  return apiClient.post('/login', credentials).then(response => response.data);
};

const logout = () => {
  return Promise.resolve();
};

const getProfile = () => {
  return apiClient.get('/user').then(response => response.data);
}

export default {
  register,
  login,
  logout,
  getProfile
};
