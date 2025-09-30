import React, { useState } from 'react';

const options = [
  'Novato',
  'Iniciante',
  'Intermediário',
  'Avançado',
  'True Beast',
];

const ActivityLevelStep = ({ onBack }) => {
  const [selected, setSelected] = useState('Intermediário');

  return (
    <div className="flex flex-col items-center justify-between h-full text-white p-4">
      <h2 className="text-2xl font-bold mt-8">Seu nível regular de atividade física?</h2>

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
        <button onClick={() => alert("Dados Salvos!")} className="bg-red-600 text-white font-bold py-3 px-8 rounded-full">
          Start ▸
        </button>
      </div>
    </div>
  );
};

export default ActivityLevelStep;
