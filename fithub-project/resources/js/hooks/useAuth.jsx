import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import MobileLayout from './layout/MobileLayout';

import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import Dashboard from './screens/Dashboard';
import ProfileSetupScreen from './profile-setup/ProfileSetupScreen';
import UserScreen from './user-dashboard/UserScreen';
import TelaPrincipal from './screens/TelaPrincipal';
import AgendamentoScreen from './screens/AgendamentoScreen';
import NotificacoesScreen from './screens/NotificacoesScreen';
import EventosScreen from './screens/EventosScreen';

const AppRoutes = () => {
  const { isAuthenticated, loading, hasProfile, updateProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black text-white">
        Carregando...
      </div>
    );
  }

  const RequireProfile = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;

    if (!hasProfile) {
        return <Navigate to="/profile-setup" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginScreen /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <RegisterScreen /> : <Navigate to="/" />}
      />

      {/* --- Rota Raiz --- */}
      <Route
        path="/"
        element={
            !isAuthenticated ? <Navigate to="/login" /> :
            !hasProfile ? <Navigate to="/profile-setup" /> :
            <Navigate to="/tela-principal" />
        }
      />

      {/* --- Rota de Configuração de Perfil --- */}
      <Route
        path="/profile-setup"
        element={
            isAuthenticated ?
            (hasProfile ? <Navigate to="/tela-principal" /> : <ProfileSetupScreen />)
            : <Navigate to="/login" />
        }
      />

      {/* --- Rotas Protegidas (Exigem Login + Perfil) --- */}
      <Route
        path="/tela-principal"
        element={<RequireProfile><TelaPrincipal /></RequireProfile>}
      />
      <Route
        path="/agendamento"
        element={<RequireProfile><AgendamentoScreen /></RequireProfile>}
      />
      <Route
        path="/notificacoes"
        element={<RequireProfile><NotificacoesScreen /></RequireProfile>}
      />
      <Route
        path="/cadastro-eventos"
        element={<RequireProfile><EventosScreen /></RequireProfile>}
      />

      {/* Rotas secundárias */}
      <Route
        path="/profile"
        element={<RequireProfile><UserScreen onSave={updateProfile} /></RequireProfile>}
      />
      <Route
        path="/dashboard"
        element={<RequireProfile><Dashboard /></RequireProfile>}
      />

      {/* Rota para qualquer URL desconhecida */}
      <Route path="*" element={<Navigate to="/" />} />
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
