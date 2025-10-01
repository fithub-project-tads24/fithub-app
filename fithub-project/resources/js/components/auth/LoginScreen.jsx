import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError('E-mail ou senha incorretos. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-between p-4"
      style={{ backgroundImage: "url('/img/login-bg.jpg')" }}
    >
      <div className="w-full" style={{ height: '25%' }}>
        <h1 className="text-white text-5xl font-bold text-center mt-16 font-serif">
          Login
        </h1>
      </div>

      <div
        className="bg-white/30 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm"
        style={{ height: 'auto' }}
      >
        <h2 className="text-black text-2xl font-bold mb-8">Bem-vindo de volta</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="bg-red-500 text-white text-sm text-center p-2 rounded-md">{error}</p>}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-black rounded-lg py-3 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-black rounded-lg py-3 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm font-medium text-black hover:underline">
              Esqueceu a senha?
            </a>
          </div>

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
