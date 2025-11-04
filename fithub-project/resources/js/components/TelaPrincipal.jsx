import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoginRegister from './ui/ButtonLoginRegister';

const TelaPrincipal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // lógica de logout
    console.log("Logout realizado");
    navigate('/login');
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col justify-between"
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
          PLANEJAMENTO DE EXERCÍCIOS
        </h1>
      </div>

      {/* Carrossel de imagens */}
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        <div className="min-w-[250px] bg-black/30 rounded-xl p-4 text-white flex-shrink-0">
          <img
            src="/img/yoga.jpg"
            alt="Yoga"
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <h2 className="font-bold">Dia 01 - Yoga</h2>
          <p>Seg 26 Abr | 07:00 - 08:00</p>
        </div>

        <div className="min-w-[250px] bg-black/30 rounded-xl p-4 text-white flex-shrink-0">
          <img
            src="/img/zumba.jpg"
            alt="Zumba"
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <h2 className="font-bold">Dia 02 - Zumba</h2>
          <p>Ter 27 Abr | 07:00 - 08:00</p>
        </div>

        {/* Você pode mapear dinamicamente os cards aqui */}
      </div>

      {/* Botão de agendamento */}
      <div className="px-6 mb-20">
        <ButtonLoginRegister fullWidth>
          AGENDAR NOVA AULA
        </ButtonLoginRegister>
      </div>

      {/* Navbar inferior */}
      <div className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-md flex justify-around py-3 text-white">
        <button onClick={handleLogout} className="flex flex-col items-center">
          <span className="material-icons">logout</span>
          <span className="text-xs">Logout</span>
        </button>

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

export default TelaPrincipal;
