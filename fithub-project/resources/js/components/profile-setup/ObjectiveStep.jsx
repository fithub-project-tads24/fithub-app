import React, { useState } from 'react';
import ButtonContinue from '../ui/ButtonContinue';

const options = [
  'Ganhar peso',
  'Perder peso',
  'Aprender o Básico',
  'Ficar em Forma',
  'Ganhar Flexibilidade',
];

const ObjectiveStep = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState('Aprender o Básico');

  return (
    <div className="flex flex-col h-full text-white p-6 justify-between">
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-2">Qual é o seu objetivo?</h2>
        <p className="text-sm text-gray-400">
          Isso nos ajudará a criar um plano personalizado para você.
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
          onClick={() => onNext({ objective: selected })}
          className="px-6"
        >
          Next ▸
        </ButtonContinue>
      </div>
    </div>
  );
};

export default ObjectiveStep;
