import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './layout/MobileLayout';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MobileLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginScreen />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterScreen />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MobileLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;
