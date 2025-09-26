import axios from 'axios';

class AuthService {
  constructor() {
    this.apiUrl = '/api/auth';
    
    // Set up axios defaults
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.headers.common['Accept'] = 'application/json';
    
    // Set up request interceptor to include CSRF token
    axios.interceptors.request.use((config) => {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
      }
      return config;
    });
  }

  async login(credentials) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, credentials);
      
      // Store authentication token if provided
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, userData);
      
      // Store authentication token if provided
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    try {
      await axios.post(`${this.apiUrl}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clean up local storage and headers
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No token found');
      }
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${this.apiUrl}/user`);
      return response.data;
    } catch (error) {
      // Clean up invalid token
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
      throw error;
    }
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data.message || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
}

export default new AuthService();