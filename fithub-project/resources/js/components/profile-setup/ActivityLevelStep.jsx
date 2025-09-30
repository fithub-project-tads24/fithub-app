import React, { useState } from 'react';
import Button from '../ui/Button';

const options = [
  'Novato',
  'Iniciante',
  'Intermediário',
  'Avançado',
  'True Beast',
];

const ActivityLevelStep = ({ onBack, onNext }) => {
  const [selected, setSelected] = useState('Intermediário');

  return (
    <div className="flex flex-col h-full text-white p-6 justify-between">
      {/* Seção do Título */}
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-2">Seu nível de atividade?</h2>
        <p className="text-sm text-gray-400">
          Isso nos ajuda a entender qual o melhor ponto de partida para você.
        </p>
      </div>

      {/* Seção de Opções */}
      <div className="flex-grow flex flex-col justify-center w-full text-center">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`py-3 text-2xl transition-colors duration-200 ${
              selected === option ? 'text-white font-bold scale-110' : 'text-gray-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Seção dos Botões de Navegação */}
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ◂ Voltar
        </button>
        <Button
          onClick={() => onNext({ activity_level: selected })}
          className="px-10 py-3 text-lg bg-red-500 hover:bg-red-600"
        >
          Start ▸
        </Button>
      </div>
    </div>
  );
};

export default ActivityLevelStep;
