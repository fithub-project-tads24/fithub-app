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
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/img/exercise-bg.jpg')" }}
    >
      {/* Header mobile */}
      <header className="w-full max-w-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-center">
          <img src="/img/fithub-logo.png" alt="Fithub Logo" className="w-16 h-16 object-cover" />
        </div>
        <h1 className="text-white text-xl font-bold text-center mt-3">NOTIFICAÇÕES</h1>
      </header>

      {/* Conteúdo principal */}
      <main className="w-full max-w-md px-4 flex-1 mt-4 mb-28">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
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
              <div className="text-white/90 text-center py-6">Sem notificações no momento.</div>
            ) : (
              notificacoes.map((n) => (
                <div
                  key={n.id}
                  className={`rounded-lg p-3 border transition-colors ${
                    n.lida ? 'bg-white/5 border-white/10' : 'bg-white/15 border-white/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-white flex-1">
                      <h2 className="font-semibold text-sm">{n.titulo}</h2>
                      <p className="text-white/90 text-sm mt-1">{n.mensagem}</p>
                      <p className="text-white/70 text-xs mt-2">{n.hora}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {!n.lida && (
                        <button
                          onClick={() => marcarComoLida(n.id)}
                          className="text-xs text-white/90 hover:text-white underline"
                        >
                          Marcar
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

          <div className="pt-4">
            <ButtonLoginRegister fullWidth onClick={() => navigate('/agendamento')}>
              IR PARA AGENDAMENTO
            </ButtonLoginRegister>
          </div>
        </div>
      </main>

      {/* Navbar inferior mobile (mesmo padrão das outras telas) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-white focus:outline-none"
            aria-label="Logout"
          >
            <span className="material-icons text-xl">logout</span>
            <span className="text-[10px] mt-1">Sair</span>
          </button>

          <Link to="/inicio" className="flex flex-col items-center text-white" aria-label="Início">
            <span className="material-icons text-xl">home</span>
            <span className="text-[10px] mt-1">Início</span>
          </Link>

          <Link to="/agendamento" className="flex flex-col items-center text-white" aria-label="Agendamento">
            <span className="material-icons text-xl">calendar_today</span>
            <span className="text-[10px] mt-1">Agendar</span>
          </Link>

          <Link to="/notificacoes" className="flex flex-col items-center text-white relative" aria-label="Notificações">
            <span className="material-icons text-xl">notifications</span>
            <span className="text-[10px] mt-1">Notifs</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NotificacoesScreen;
