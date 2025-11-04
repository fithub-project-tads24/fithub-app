import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoginRegister from '../ui/ButtonLoginRegister';

const TelaPrincipal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout realizado');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/img/exercise-bg.jpg')" }}
    >
      {/* Safe area / Header mobile */}
      <header className="w-full max-w-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-center">
          <img
            src="/img/fithub-logo.png"
            alt="Fithub Logo"
            className="w-16 h-16 object-cover"
          />
        </div>
        <h1 className="text-white text-xl font-bold text-center mt-3">
          PLANEJAMENTO DE EXERCÍCIOS
        </h1>
      </header>

      {/* Conteúdo principal centralizado com largura móvel */}
      <main className="w-full max-w-md px-4 flex-1 mt-4 mb-28">
        {/* Carrossel horizontal (scroll) */}
        <div className="flex gap-4 overflow-x-auto pb-2 -ml-1 scrollbar-hide">
          <article className="min-w-[220px] w-[220px] bg-black/30 rounded-xl p-3 text-white flex-shrink-0">
            <img
              src="/img/yoga.jpg"
              alt="Yoga"
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <h2 className="font-semibold text-md">Dia 01 - Yoga</h2>
            <p className="text-sm text-white/90 mt-1">Seg 26 Abr | 07:00 - 08:00</p>
          </article>

          <article className="min-w-[220px] w-[220px] bg-black/30 rounded-xl p-3 text-white flex-shrink-0">
            <img
              src="/img/zumba.jpg"
              alt="Zumba"
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <h2 className="font-semibold text-md">Dia 02 - Zumba</h2>
            <p className="text-sm text-white/90 mt-1">Ter 27 Abr | 07:00 - 08:00</p>
          </article>

          {/* Espaço para mais cards dinamicamente */}
        </div>

        {/* CTA fixo com espaçamento para navbar */}
        <div className="mt-5">
          <ButtonLoginRegister fullWidth onClick={() => navigate('/agendamento')}>
            AGENDAR NOVA AULA
          </ButtonLoginRegister>
        </div>
      </main>

      {/* Navbar inferior mobile (fixa) */}
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

          <Link
            to="/inicio"
            className="flex flex-col items-center text-white"
            aria-label="Início"
          >
            <span className="material-icons text-xl">home</span>
            <span className="text-[10px] mt-1">Início</span>
          </Link>

          <Link
            to="/agendamento"
            className="flex flex-col items-center text-white"
            aria-label="Agendamento"
          >
            <span className="material-icons text-xl">calendar_today</span>
            <span className="text-[10px] mt-1">Agendar</span>
          </Link>

          <Link
            to="/notificacoes"
            className="flex flex-col items-center text-white relative"
            aria-label="Notificações"
          >
            <span className="material-icons text-xl">notifications</span>
            <span className="text-[10px] mt-1">Notifs</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TelaPrincipal;
