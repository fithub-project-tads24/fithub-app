import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import MobileLayout from './layout/MobileLayout';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import Dashboard from './Dashboard';
import ProfileSetupScreen from './profile-setup/ProfileSetupScreen';
import UserScreen from './user-dashboard/UserScreen';
import TelaPrincipal from './TelaPrincipal';
import AgendamentoScreen from './AgendamentoScreen';
import NotificacoesScreen from './NotificacoesScreen';

const AppRoutes = () => {
  const { isAuthenticated, loading, updateProfile } = useAuth();

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

    <Route
        path="/"
        element={isAuthenticated ? <TelaPrincipal /> : <Navigate to="/login" />}
    />
    <Route
        path="/tela-principal"
        element={isAuthenticated ? <TelaPrincipal /> : <Navigate to="/login" />}
    />
    <Route
        path="/agendamento"
        element={isAuthenticated ? <AgendamentoScreen /> : <Navigate to="/login" />}
        />
    <Route
        path="/notificacoes"
        element={isAuthenticated ? <NotificacoesScreen /> : <Navigate to="/login" />}
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
      <Route
        path="/profile"
        element={isAuthenticated ? <UserScreen onSave={updateProfile} /> : <Navigate to="/login" />}
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
