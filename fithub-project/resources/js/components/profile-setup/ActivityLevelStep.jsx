import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ButtonContinue from '../ui/ButtonContinue';

const options = [
  'Novato',
  'Iniciante',
  'Intermediário',
  'Avançado',
  'True Beast',
];

const ActivityLevelStep = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState('Intermediário');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full text-white p-6 justify-between">
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-2">Seu nível de atividade?</h2>
        <p className="text-sm text-gray-400">
          Isso nos ajuda a entender qual o melhor ponto de partida para você.
        </p>
      </div>
      <div className="flex-grow flex flex-col justify-center w-full text-center">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`py-3 text-2xl transition-all duration-200 ${
              selected === option ? 'text-white font-bold scale-110' : 'text-gray-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ◂ Voltar
        </button>
        <ButtonContinue
          onClick={() => onNext({ activity_level: selected })}
          className="px-6"
        >
          Start ▸
        </ButtonContinue>
      </div>

      <div className="text-center mt-4">
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500">
          Logout para Teste
        </button>
      </div>
    </div>
  );
};

export default ActivityLevelStep;
