import React from 'react';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-start p-4"
      style={{ backgroundImage: "url('/img/register-bg.jpg')" }}
    >
        {/* Logo */}
        <div className="my-8">
            {/* Você pode substituir por sua tag <img> do logo */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-xs">LOGO</span>
            </div>
        </div>

        <h1 className="text-white text-4xl font-bold text-center mb-8">
            CADASTRE-SE
        </h1>

      {/* Card Translúcido */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 w-full max-w-sm">
        <form className="space-y-6">
          {/* Campo de Nome */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nome"
              className="w-full bg-transparent border-b border-white/50 py-2 px-1 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Campo de Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-white/50 py-2 px-1 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Campo de Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border-b border-white/50 py-2 px-1 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Botão de Cadastro */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 px-4 rounded-full shadow-lg hover:bg-gray-200 transition-colors text-lg"
            >
              CADASTRE-SE
            </button>
          </div>
        </form>
      </div>

      <div className="text-center mt-12">
        <Link to="/login" className="text-sm text-white hover:underline">
          Já tem uma conta? <strong>Faça login</strong>
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
