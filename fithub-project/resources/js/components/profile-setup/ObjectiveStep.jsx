import React, { useState } from 'react';

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
    <div className="flex flex-col items-center justify-between h-full text-white p-4">
      <h2 className="text-2xl font-bold mt-8">Qual é o seu objetivo?</h2>

      <div className="flex-grow flex flex-col justify-center w-full text-center">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`py-2 text-2xl ${selected === option ? 'text-white font-bold' : 'text-gray-500'}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="w-12 h-12 bg-gray-700 rounded-full">◂</button>
        <button onClick={() => onNext({ objective: selected })} className="bg-red-600 text-white font-bold py-3 px-8 rounded-full">
          Next ▸
        </button>
      </div>
    </div>
  );
};

export default ObjectiveStep;
