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
    await AuthService.register(userData);
  };

  const logout = () => {
    AuthService.logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (payload) => {
    const updated = await AuthService.updateProfile(payload);
    if (updated && (updated.name || updated.email)) {
      setUser(prev => ({ ...prev, ...updated }));
    } else {
      try {
        const fresh = await AuthService.getProfile();
        setUser(fresh);
      } catch (e) {
        console.error('Failed to refresh profile after update', e);
      }
    }
    return true;
  };

  const deleteAccount = async () => {
    await AuthService.deleteAccount();
    localStorage.removeItem('token');
    setUser(null);
    return true;
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, updateProfile, deleteAccount }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
