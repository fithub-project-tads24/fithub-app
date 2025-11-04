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

  // Estado da seleção e dos agendamentos já feitos (simulado)
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [agendados, setAgendados] = useState([]); // array de ids agendados

  const handleConfirmar = async () => {
    if (!aulaSelecionada) {
      alert('Selecione uma aula para agendar.');
      return;
    }
    if (agendados.includes(aulaSelecionada.id)) {
      alert('Essa aula já está agendada.');
      return;
    }

    // Exemplo de chamada à API:
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

    // Exemplo de chamada à API:
    // await api.delete(`/schedules/${aulaSelecionada.id}`);

    setAgendados((prev) => prev.filter((id) => id !== aulaSelecionada.id));
    alert(`Agendamento de "${aulaSelecionada.titulo}" foi cancelado.`);
  };

  const handleLogout = () => {
    // lógica de logout (ex.: limpar token/estado)
    navigate('/login');
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
          AGENDAMENTO
        </h1>
      </div>

      {/* Lista de aulas / seleção */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm mx-auto mt-6 mb-28 space-y-4">
        <p className="text-white/90 text-sm mb-2">
          Selecione uma aula pré-definida para agendar ou cancelar:
        </p>

        {aulas.map((aula) => {
          const isSelected = aulaSelecionada?.id === aula.id;
          const isAgendada = agendados.includes(aula.id);
          return (
            <button
              key={aula.id}
              type="button"
              onClick={() => setAulaSelecionada(aula)}
              className={`w-full text-left p-4 rounded-lg border transition ${
                isSelected ? 'bg-white/20 border-white' : 'bg-white/10 border-transparent hover:bg-white/15'
              } text-white`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={aula.imagem}
                  alt={aula.titulo}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="font-bold flex items-center gap-2">
                    {aula.titulo}
                    {isAgendada && (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-600/60">
                        Agendada
                      </span>
                    )}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {aula.data} | {aula.horario}
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        {/* Ações */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <ButtonLoginRegister onClick={handleConfirmar} fullWidth>
            CONFIRMAR
          </ButtonLoginRegister>

          <ButtonLoginRegister
            onClick={handleCancelar}
            fullWidth
          >
            CANCELAR
          </ButtonLoginRegister>
        </div>
      </div>

      {/* Navbar inferior (igual ao padrão da TelaPrincipal) */}
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

export default AgendamentoScreen;
