import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoginRegister from '../ui/ButtonLoginRegister';

const NotificacoesScreen = () => {
  const navigate = useNavigate();

  // Lista simulada de notificações (substituir por chamada à API quando disponível)
  const [notificacoes, setNotificacoes] = useState([
    { id: 1, titulo: 'Aula confirmada', mensagem: 'Seu agendamento de Yoga (Dia 01) foi confirmado.', lida: false, hora: 'Hoje, 07:10' },
    { id: 2, titulo: 'Lembrete de aula', mensagem: 'Zumba (Dia 02) começa amanhã às 07:00.', lida: false, hora: 'Ontem, 18:30' },
    { id: 3, titulo: 'Novas turmas', mensagem: 'Novas turmas disponíveis na próxima semana.', lida: true, hora: 'Seg, 10:05' },
  ]);

  const handleLogout = () => {
    // lógica de logout (ex.: limpar token/session)
    navigate('/login');
  };

  const marcarComoLida = (id) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const excluirNotificacao = (id) => {
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      className="w-full h-full min-h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: "url('/img/exercise-bg.jpg')" }}
    >
      {/* Header */}
      <div className="text-center mt-8">
        <img
          src="/img/fithub-logo.png"
          alt="Fithub Logo"
          className="w-24 h-24 mx-auto object-cover"
        />
        <h1 className="text-white text-3xl font-bold mt-4">
          NOTIFICAÇÕES
        </h1>
      </div>

      {/* Conteúdo de notificações */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm mx-auto mt-6 mb-28">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/90 text-sm">
            {notificacoes.filter((n) => !n.lida).length} não lidas
          </span>
          <button
            onClick={marcarTodasComoLidas}
            className="text-white/90 text-xs hover:text-white underline"
          >
            Marcar todas como lidas
          </button>
        </div>

        <div className="space-y-3">
          {notificacoes.length === 0 ? (
            <div className="text-white/90 text-center py-6">
              Sem notificações no momento.
            </div>
          ) : (
            notificacoes.map((n) => (
              <div
                key={n.id}
                className={`rounded-lg p-4 border transition-colors ${
                  n.lida ? 'bg-white/5 border-white/10' : 'bg-white/15 border-white/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-white">
                    <h2 className="font-bold">{n.titulo}</h2>
                    <p className="text-white/90 text-sm mt-1">{n.mensagem}</p>
                    <p className="text-white/70 text-xs mt-2">{n.hora}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {!n.lida && (
                      <button
                        onClick={() => marcarComoLida(n.id)}
                        className="text-xs text-white/90 hover:text-white underline"
                      >
                        Marcar como lida
                      </button>
                    )}
                    <button
                      onClick={() => excluirNotificacao(n.id)}
                      className="text-xs text-red-300 hover:text-red-200 underline"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-5">
          <ButtonLoginRegister
            fullWidth
            onClick={() => navigate('/agendamento')}
          >
            IR PARA AGENDAMENTO
          </ButtonLoginRegister>
        </div>
      </div>

      {/* Navbar inferior (mesmo padrão da TelaPrincipal) */}
      <div className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-md flex justify-around py-3 text-white">
        <button onClick={handleLogout} className="flex flex-col items-center">
          <span className="material-icons">logout</span>
          <span className="text-xs">Logout</span>
        </button>

        <Link to="/" className="flex flex-col items-center">
          <span className="material-icons">home</span>
          <span className="text-xs">Início</span>
        </Link>

        <Link to="/agendamento" className="flex flex-col items-center">
          <span className="material-icons">calendar_today</span>
          <span className="text-xs">Agendamento</span>
        </Link>

        <Link to="/notificacoes" className="flex flex-col items-center">
          <span className="material-icons">notifications</span>
          <span className="text-xs">Notificações</span>
        </Link>
      </div>
    </div>
  );
};

export default NotificacoesScreen;
