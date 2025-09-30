import React from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-between p-4"
      style={{ backgroundImage: "url('/img/login-bg.jpg')" }}
    >
      {/* Espaçador para empurrar o conteúdo para baixo */}
      <div className="w-full" style={{ height: '25%' }}>
        <h1 className="text-white text-5xl font-bold text-center mt-16 font-serif">
          Login
        </h1>
      </div>

      {/* Card Translúcido */}
      <div
        className="bg-white/30 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm"
        style={{ height: '470px' }}
      >
        <h2 className="text-black text-2xl font-bold mb-8">Bem-vindo de volta</h2>

        <form className="space-y-6">
          {/* Campo de Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border border-black rounded-lg py-3 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Campo de Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              className="w-full bg-transparent border border-black rounded-lg py-3 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm font-medium text-black hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão de Login */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 px-4 rounded-full shadow-lg hover:bg-gray-200 transition-colors text-lg"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center mt-12">
            <Link to="/register" className="text-xs text-black hover:underline">
                Não tem uma conta? <strong>Cadastre-se!</strong>
            </Link>
            <a href="#" className="block text-xs text-black hover:underline mt-2">
                Precisa de ajuda?
            </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
