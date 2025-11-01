import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ButtonLoginRegister from '../ui/ButtonLoginRegister';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password });

      navigate('/login');

    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorKey][0];
        setError(firstErrorMessage);
      } else {
        setError('Ocorreu um erro. Tente novamente mais tarde.');
      }
      console.error(err);
    }
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-start p-4"
      style={{ backgroundImage: "url('/img/register-bg.jpg')" }}
    >
      {/* Logo */}
      <div className="my-8">
        <img
          src="/img/fithub-logo.png"
          alt="Fithub Logo"
          className="w-30 h-30 object-cover"
        />
      </div>

      <h1 className="text-white text-4xl font-bold text-center mb-8">
          CADASTRE-SE
      </h1>

      {/* Card Translúcido */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 w-full max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="bg-red-500 text-white text-sm text-center p-2 rounded-md">{error}</p>}

          {/* Campo de Nome */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border border-white rounded-lg py-3 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Campo de Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-white rounded-lg py-3 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Campo de Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-white rounded-lg py-3 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Botão de Cadastro */}
          <div className="pt-6">
            <ButtonLoginRegister type="submit" fullWidth>
              CADASTRE-SE
            </ButtonLoginRegister>
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
