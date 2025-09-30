// fithub-project/resources/js/components/Dashboard.jsx

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button'; // A importação agora vai funcionar

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8 text-black bg-white/50 rounded-lg flex flex-col items-center justify-center h-auto m-auto">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo!</h1>
      {user && (
        <p className="text-lg mb-8">
          Você está logado como <span className="font-semibold">{user.name}</span>.
        </p>
      )}
      <Button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white">
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
