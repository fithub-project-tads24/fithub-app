import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoginRegister from '../ui/ButtonLoginRegister';

const NotificacoesScreen = () => {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([
    { id: 1, titulo: 'Aula confirmada', mensagem: 'Seu agendamento de Yoga (Dia 01) foi confirmado.', lida: false, hora: 'Hoje, 07:10' },
    { id: 2, titulo: 'Lembrete de aula', mensagem: 'Zumba (Dia 02) começa amanhã às 07:00.', lida: false, hora: 'Ontem, 18:30' },
    { id: 3, titulo: 'Novas turmas', mensagem: 'Novas turmas disponíveis na próxima semana.', lida: true, hora: 'Seg, 10:05' },
  ]);

  const handleLogout = () => navigate('/login');
  const marcarComoLida = (id) =>
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  const marcarTodasComoLidas = () =>
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  const excluirNotificacao = (id) =>
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-[#3f3f3f] text-white relative">
      {/* Header */}
      <header className="w-full max-w-md px-4 pt-6 pb-2 flex flex-col items-center">
        <img
          src="/img/fithub-logo.png"
          alt="Fithub Logo"
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-lg font-bold mt-2">NOTIFICAÇÕES</h1>
      </header>

      {/* Conteúdo principal */}
      <main className="w-full max-w-md px-4 flex-1 mt-3 mb-24">
        <div className="bg-[#5b5b5b] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/90">
              {notificacoes.filter((n) => !n.lida).length} não lidas
            </span>
            <button
              onClick={marcarTodasComoLidas}
              className="text-xs text-emerald-300 hover:text-emerald-200 underline"
            >
              Marcar todas como lidas
            </button>
          </div>

          {notificacoes.length === 0 ? (
            <div className="text-center text-white/80 py-6">
              Sem notificações no momento.
            </div>
          ) : (
            <div className="space-y-3">
              {notificacoes.map((n) => (
                <div
                  key={n.id}
                  className={`rounded-lg p-3 border shadow-sm ${
                    n.lida
                      ? 'bg-white/10 border-white/10'
                      : 'bg-white/20 border-white/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h2 className="font-semibold text-sm">{n.titulo}</h2>
                      <p className="text-white/90 text-sm mt-1">{n.mensagem}</p>
                      <p className="text-white/70 text-xs mt-2">{n.hora}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {!n.lida && (
                        <button
                          onClick={() => marcarComoLida(n.id)}
                          className="text-xs text-emerald-300 hover:text-emerald-200 underline"
                        >
                          Marcar
                        </button>
                      )}
                      <button
                        onClick={() => excluirNotificacao(n.id)}
                        className="text-xs text-red-400 hover:text-red-300 underline"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4">
            <ButtonLoginRegister
              fullWidth
              onClick={() => navigate('/agendamento')}
            >
              IR PARA AGENDAMENTO
            </ButtonLoginRegister>
          </div>
        </div>
      </main>

      {/* Navbar (igual à da tela de Agendamento) */}
      <nav className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/10">
        <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-white text-xs hover:text-red-400 transition-all"
          >
            <span className="text-[10px] mt-1">logout</span>
          </button>

          <Link
            to="/tela-principal"
            className="flex flex-col items-center text-white text-xs hover:text-emerald-300 transition-all"
          >
            <span className="text-[10px] mt-1">Início</span>
          </Link>

          <Link
            to="/agendamento"
            className="flex flex-col items-center text-white text-xs hover:text-emerald-300 transition-all"
          >
            <span className="text-[10px] mt-1">Agendar</span>
          </Link>

          <Link
            to="/notificacoes"
            className="flex flex-col items-center text-emerald-300 text-xs transition-all"
          >
            <span className="text-[10px] mt-1 font-semibold">Notifs</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NotificacoesScreen;
