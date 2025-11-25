import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CadastroEvento = () => {
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
    local: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evento cadastrado:', evento);
    alert('Evento cadastrado com sucesso!');
    navigate('/inicio');
  };

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
            CADASTRAR EVENTO
          </h1>
        </header>

        {/* Formulário */}
        <main className="flex-1 overflow-y-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-white/80">
                Título
              </label>
              <input
                type="text"
                name="titulo"
                value={evento.titulo}
                onChange={handleChange}
                required
                placeholder="Ex: Aula Especial"
                className="w-full p-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-white/80">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={evento.descricao}
                onChange={handleChange}
                rows="3"
                placeholder="Ex: Aula comemorativa de aniversário da academia."
                required
                className="w-full p-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-white/80">
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  value={evento.data}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-white/80">
                  Hora
                </label>
                <input
                  type="time"
                  name="hora"
                  value={evento.hora}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-white/80">
                Local
              </label>
              <input
                type="text"
                name="local"
                value={evento.local}
                onChange={handleChange}
                placeholder="Ex: Sala 2 ou Área Externa"
                required
                className="w-full p-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              CADASTRAR EVENTO
            </button>
          </form>
        </main>

        {/* Navbar inferior */}
        <nav className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10 py-2">
          <div className="flex justify-around text-white text-sm">
            <Link to="/tela-principal" className="flex flex-col items-center hover:opacity-80">
              <span className="text-[10px] mt-1">Início</span>
            </Link>
            <button onClick={handleLogout} className="flex flex-col items-center hover:opacity-80">
              <span className="text-[10px] mt-1">Sair</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CadastroEvento; 
