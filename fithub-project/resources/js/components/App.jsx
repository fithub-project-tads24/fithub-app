import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import MobileLayout from './layout/MobileLayout';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import Dashboard from './Dashboard';
import ProfileSetupScreen from './profile-setup/ProfileSetupScreen';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black text-white">
        Carregando...
      </div>
    );
  }

  return (
    <Routes>
      {/* Rota Padrão */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      {/* Rotas Públicas */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginScreen /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <RegisterScreen /> : <Navigate to="/dashboard" />}
      />

      {/* Rotas Protegidas */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile-setup"
        element={isAuthenticated ? <ProfileSetupScreen /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MobileLayout>
          <AppRoutes />
        </MobileLayout>
      </AuthProvider>
    </Router>
  );
};

export default App;
