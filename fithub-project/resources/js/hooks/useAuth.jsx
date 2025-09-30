import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await AuthService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile, logging out.');
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    localStorage.setItem('token', data.token);
    const userData = await AuthService.getProfile();
    setUser(userData);
  };

  const register = async (userData) => {
    const data = await AuthService.register(userData);
    localStorage.setItem('token', data.token);
    const profileData = await AuthService.getProfile();
    setUser(profileData);
  };

  const logout = () => {
    AuthService.logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
