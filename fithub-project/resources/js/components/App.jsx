import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import MobileLayout from './layout/MobileLayout';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import ProfileSetupScreen from './profile-setup/ProfileSetupScreen';
import UserScreen from './user-dashboard/UserScreen';
import TelaPrincipal from './screens/TelaPrincipal';
import AgendamentoScreen from './screens/AgendamentoScreen';
import NotificacoesScreen from './screens/NotificacoesScreen';
import EventosScreen from './screens/EventosScreen';

const AppRoutes = () => {
  const { isAuthenticated, loading, hasProfile, isAdmin, updateProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black text-white">
        Carregando...
      </div>
    );
  }

  const RequireProfile = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!hasProfile) return <Navigate to="/profile-setup" />;
    return children;
  };

  const RequireAdmin = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!hasProfile) return <Navigate to="/profile-setup" />;

    if (!isAdmin) {
        return <Navigate to="/tela-principal" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginScreen /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterScreen /> : <Navigate to="/" />} />

      <Route path="/" element={
            !isAuthenticated ? <Navigate to="/login" /> :
            !hasProfile ? <Navigate to="/profile-setup" /> :
            <Navigate to="/tela-principal" />
      } />

      <Route path="/profile-setup" element={
            isAuthenticated ? (hasProfile ? <Navigate to="/tela-principal" /> : <ProfileSetupScreen />) : <Navigate to="/login" />
      } />

      {/* Rotas Comuns (Alunos e Admins) */}
      <Route path="/tela-principal" element={<RequireProfile><TelaPrincipal /></RequireProfile>} />
      <Route path="/agendamento" element={<RequireProfile><AgendamentoScreen /></RequireProfile>} />
      <Route path="/notificacoes" element={<RequireProfile><NotificacoesScreen /></RequireProfile>} />
      <Route path="/profile" element={<RequireProfile><UserScreen onSave={updateProfile} /></RequireProfile>} />

      {/* Rota Exclusiva de Admin (PROTEGIDA) */}
      <Route
        path="/cadastro-eventos"
        element={
            <RequireAdmin>
                <EventosScreen />
            </RequireAdmin>
        }
      />

      <Route path="/dashboard" element={<RequireProfile><TelaPrincipal /></RequireProfile>} />
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
