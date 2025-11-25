import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoginRegister from '../ui/ButtonLoginRegister';

const AgendamentoScreen = () => {
  const navigate = useNavigate();

  const aulas = [
    { id: 1, titulo: 'Dia 01 - Yoga', data: 'Seg 26 Abr', horario: '07:00 - 08:00', imagem: '/img/yoga.jpg' },
    { id: 2, titulo: 'Dia 02 - Zumba', data: 'Ter 27 Abr', horario: '07:00 - 08:00', imagem: '/img/zumba.jpg' },
  ];

  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [agendados, setAgendados] = useState([]);

  const handleConfirmar = () => {
    if (!aulaSelecionada) {
      alert('Selecione uma aula para agendar.');
      return;
    }
    if (agendados.includes(aulaSelecionada.id)) {
      alert('Essa aula já está agendada.');
      return;
    }
    setAgendados((prev) => [...prev, aulaSelecionada.id]);
    alert(`Aula "${aulaSelecionada.titulo}" agendada com sucesso!`);
  };

  const handleCancelar = () => {
    if (!aulaSelecionada) {
      alert('Selecione uma aula para cancelar.');
      return;
    }
    if (!agendados.includes(aulaSelecionada.id)) {
      alert('Essa aula não está agendada.');
      return;
    }
    setAgendados((prev) => prev.filter((id) => id !== aulaSelecionada.id));
    alert(`Agendamento de "${aulaSelecionada.titulo}" foi cancelado.`);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-between"
      style={{ backgroundImage: "url('/img/exercise-bg.jpg')" }}
    >
      {/* Container principal simulando tela de celular */}
      <div className="relative w-[390px] h-[800px] bg-black/60 rounded-[30px] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="w-full px-4 pt-6 pb-2 text-center">
          <img
            src="/img/fithub-logo.png"
            alt="Fithub Logo"
            className="w-16 h-16 object-cover mx-auto mb-2"
          />
          <h1 className="text-white text-xl font-bold tracking-wide">AGENDAMENTO</h1>
        </header>

        {/* Conteúdo com scroll interno */}
        <main className="flex-1 overflow-y-auto px-5 pb-28">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4 shadow-lg">
            <p className="text-white/90 text-sm mb-3">
              Selecione uma aula pré-definida:
            </p>

            <div className="space-y-3">
              {aulas.map((aula) => {
                const isSelected = aulaSelecionada?.id === aula.id;
                const isAgendada = agendados.includes(aula.id);
                return (
                  <button
                    key={aula.id}
                    type="button"
                    onClick={() => setAulaSelecionada(aula)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-white/30 border-white shadow-md'
                        : 'bg-white/10 hover:bg-white/20 border-transparent'
                    }`}
                  >
                    <img
                      src={aula.imagem}
                      alt={aula.titulo}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div className="flex-1 text-white">
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-sm">{aula.titulo}</h2>
                        {isAgendada && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-green-600/70">
                            Agendada
                          </span>
                        )}
                      </div>
                      <p className="text-white/80 text-xs mt-1">
                        {aula.data} | {aula.horario}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Botões de ação */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleConfirmar}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl font-semibold shadow-md hover:scale-[1.03] transition-transform"
              >
                Confirmar
              </button>

              <button
                onClick={handleCancelar}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-xl font-semibold shadow-md hover:scale-[1.03] transition-transform"
              >
                Cancelar
              </button>
            </div>
          </div>
        </main>

        {/* Navbar inferior */}
{/* Navbar inferior estilizada */}
<nav className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-xl border-t border-white/10 shadow-[0_-2px_10px_rgba(0,0,0,0.4)]">
  <div className="flex justify-around items-center py-3 px-6 text-white text-center">
    {/* Logout */}
    <button
      onClick={handleLogout}
      className="flex flex-col items-center gap-1 hover:text-red-400 transition-all active:scale-95"
    >
      <span className="text-[11px] font-medium">logout</span>
    </button>

    {/* Início */}
    <Link
      to="/tela-principal"
      className="flex flex-col items-center gap-1 hover:text-blue-400 transition-all active:scale-95"
    >

      <span className="text-[11px] font-medium">Início</span>
    </Link>

    {/* Agendar (ativo) */}
    <Link
      to="/agendamento"
      className="flex flex-col items-center gap-1 text-emerald-400 drop-shadow-md scale-105"
    >
      <span className="text-[11px] font-semibold">Agendar</span>
    </Link>

    {/* Notificações */}
    <Link
      to="/notificacoes"
      className="flex flex-col items-center gap-1 hover:text-yellow-400 transition-all active:scale-95 relative"
    >
      <span className="text-[11px] font-medium">Notifications</span>
      <span className="absolute top-[2px] right-[12px] w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
    </Link>

          </div>
        </nav>
      </div>
    </div>
  );
};

export default AgendamentoScreen;
