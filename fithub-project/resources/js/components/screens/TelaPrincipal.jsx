import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TelaPrincipal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout realizado');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Moldura do "celular" */}
      <div className="w-[320px] h-[700px] bg-black/40 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden relative border border-white/10 flex flex-col text-white">

        {/* Cabeçalho */}
        <header className="px-4 pt-6 pb-2">
          <div className="flex justify-center">
            <img
              src="/img/fithub-logo.png"
              alt="Fithub Logo"
              className="w-16 h-16 object-cover"
            />
          </div>
          <h1 className="text-lg font-bold text-center mt-2 text-white">
            PLANEJAMENTO DE EXERCÍCIOS
          </h1>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto px-4">
          {/* Cards horizontais */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <article className="min-w-[220px] w-[220px] bg-white/10 rounded-xl p-3 flex-shrink-0 shadow-md backdrop-blur-md border border-white/10">
              <h2 className="font-semibold text-md">Yoga</h2>
              <p className="text-sm mt-1 text-white/90">Seg 26 Abr | 07:00 - 08:00</p>
            </article>

            <article className="min-w-[220px] w-[220px] bg-white/10 rounded-xl p-3 flex-shrink-0 shadow-md backdrop-blur-md border border-white/10">
              <h2 className="font-semibold text-md">Zumba</h2>
              <p className="text-sm mt-1 text-white/90">Ter 27 Abr | 07:00 - 08:00</p>
            </article>
          </div>

          {/* Botão */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/agendamento')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-full w-full shadow-lg hover:opacity-90 transition"
            >
              AGENDAR NOVA AULA
            </button>
          </div>
        </main>

        {/* Navbar inferior */}
        <nav className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10 py-2">
          <div className="flex justify-around text-white text-sm">
            <button onClick={handleLogout} className="flex flex-col items-center hover:opacity-80">
              <span className="text-[10px] mt-1">Logout</span>
            </button>
            <Link to="/agendamento" className="flex flex-col items-center hover:opacity-80">
              <span className="text-[10px] mt-1">Agendar</span>
            </Link>
            <Link to="/notificacoes" className="flex flex-col items-center hover:opacity-80">
              <span className="text-[10px] mt-1">Notifications</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TelaPrincipal;
