import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasProfile = !!user?.user_profiles_id;
  const isAdmin = user?.role?.name === 'Admin';

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await AuthService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Falha ao carregar perfil, deslogando...', error);
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
    if (updated) {
        const freshUser = await AuthService.getProfile();
        setUser(freshUser);
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
    <AuthContext.Provider value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
        deleteAccount,
        isAdmin,
        hasProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
