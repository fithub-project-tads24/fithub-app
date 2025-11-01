import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ButtonLoginRegister from '../ui/ButtonLoginRegister';
import Loader from '../ui/Loading';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await login({ email, password });
    } catch (err) {
      setError('E-mail ou senha incorretos. Tente novamente.');
      console.error(err);
      setIsLoading(false);
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

      {/* Card swap container */}
      <div className="w-full max-w-sm">
        {/* Form Card */}
        <div
          className={
            `bg-white/30 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 ease-out overflow-hidden ` +
            (isLoading
              ? 'opacity-0 scale-95 -translate-y-2 max-h-0 pointer-events-none'
              : 'opacity-100 scale-100 translate-y-0 max-h-[700px]')
          }
          aria-hidden={isLoading}
        >
          <h2 className="text-black text-2xl font-bold mb-8">Bem-vindo de volta</h2>

          <form className="space-y-6" onSubmit={handleSubmit} aria-busy={isLoading}>
            {error && <p className="bg-red-500 text-white text-sm text-center p-2 rounded-md">{error}</p>}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className={
                  `w-full bg-transparent border border-black rounded-lg py-3 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white ` +
                  (isLoading ? 'opacity-70 cursor-not-allowed' : '')
                }
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className={
                  `w-full bg-transparent border border-black rounded-lg py-3 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white ` +
                  (isLoading ? 'opacity-70 cursor-not-allowed' : '')
                }
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm font-medium text-black hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <div className="pt-4">
              <ButtonLoginRegister type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Entrando…' : 'Log in'}
              </ButtonLoginRegister>
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

        {/* Loader Card */}
        <div
          className={
            `bg-white/30 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 ease-out overflow-hidden ` +
            (isLoading
              ? 'opacity-100 scale-100 translate-y-0 max-h-[700px]'
              : 'opacity-0 scale-95 translate-y-2 max-h-0 pointer-events-none')
          }
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <Loader aria-label="Carregando" />
            <p className="text-black/150 text-sm font-medium tracking-wide">Preparando seu treino…</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
