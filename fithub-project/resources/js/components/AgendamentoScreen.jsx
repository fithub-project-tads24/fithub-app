import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoginRegister from './ui/ButtonLoginRegister';

const AgendamentoScreen = () => {
  const navigate = useNavigate();

  // Aulas pré-definidas
  const aulas = [
    { id: 1, titulo: 'Dia 01 - Yoga', data: 'Seg 26 Abr', horario: '07:00 - 08:00', imagem: '/img/yoga.jpg' },
    { id: 2, titulo: 'Dia 02 - Zumba', data: 'Ter 27 Abr', horario: '07:00 - 08:00', imagem: '/img/zumba.jpg' },
  ];

  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [agendados, setAgendados] = useState([]); // ids agendados (simulação)

  const handleConfirmar = async () => {
    if (!aulaSelecionada) {
      alert('Selecione uma aula para agendar.');
      return;
    }
    if (agendados.includes(aulaSelecionada.id)) {
      alert('Essa aula já está agendada.');
      return;
    }

    // Chamada API exemplo:
    // await api.post('/schedules', { classId: aulaSelecionada.id });

    setAgendados((prev) => [...prev, aulaSelecionada.id]);
    alert(`Aula "${aulaSelecionada.titulo}" agendada com sucesso!`);
  };

  const handleCancelar = async () => {
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
    // lógica de logout (ex.: limpar token/estado)
    navigate('/login');
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
        <h1 className="text-white text-xl font-bold text-center mt-3">AGENDAMENTO</h1>
      </header>

      {/* Conteúdo principal */}
      <main className="w-full max-w-md px-4 flex-1 mt-4 mb-28">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4">
          <p className="text-white/90 text-sm mb-3">Selecione uma aula pré-definida:</p>

          <div className="space-y-3">
            {aulas.map((aula) => {
              const isSelected = aulaSelecionada?.id === aula.id;
              const isAgendada = agendados.includes(aula.id);
              return (
                <button
                  key={aula.id}
                  type="button"
                  onClick={() => setAulaSelecionada(aula)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center gap-3 ${
                    isSelected ? 'bg-white/20 border-white' : 'bg-white/10 border-transparent hover:bg-white/15'
                  }`}
                >
                  <img src={aula.imagem} alt={aula.titulo} className="w-14 h-14 object-cover rounded-md" />
                  <div className="flex-1 text-white">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-sm">{aula.titulo}</h2>
                      {isAgendada && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-green-600/70">Agendada</span>
                      )}
                    </div>
                    <p className="text-white/90 text-xs mt-1">{aula.data} | {aula.horario}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Ações */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <ButtonLoginRegister onClick={handleConfirmar} fullWidth>
              CONFIRMAR
            </ButtonLoginRegister>

            <ButtonLoginRegister onClick={handleCancelar} fullWidth>
              CANCELAR
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

export default AgendamentoScreen;
