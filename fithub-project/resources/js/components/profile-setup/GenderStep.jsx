import React from 'react';

const GenderStep = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center p-4">
      <h2 className="text-2xl font-bold mb-2">Fale-nos sobre você!</h2>
      <p className="text-sm text-gray-400 mb-12">Para lhe proporcionar uma melhor experiência, precisamos conhecer seu gênero.</p>

      {/* Botões de Gênero aqui - simplificado por enquanto */}
      <div className="space-y-4 mb-12">
        <button className="w-32 h-32 bg-red-600 rounded-full flex flex-col items-center justify-center">
          <span className="text-4xl">♂</span>
          <span>M</span>
        </button>
        <button className="w-32 h-32 bg-gray-700 rounded-full flex flex-col items-center justify-center">
          <span className="text-4xl">♀</span>
          <span>F</span>
        </button>
      </div>

      <button onClick={() => onNext({ sex: 'male' })} className="bg-red-600 text-white font-bold py-3 px-8 rounded-full">
        Next ▸
      </button>
    </div>
  );
};

export default GenderStep;
