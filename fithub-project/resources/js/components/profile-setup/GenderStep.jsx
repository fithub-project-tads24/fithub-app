import React, { useState } from 'react';
import { FaMars, FaVenus } from 'react-icons/fa';
import ButtonContinue from '../ui/ButtonContinue';

const GenderStep = ({ onNext }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <div className="flex flex-col h-full text-white p-6 justify-between">
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-2">Fale-nos sobre você!</h2>
        <p className="text-sm text-gray-400">
          Para lhe proporcionar uma melhor experiência, precisamos conhecer seu gênero.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => setSelectedGender('M')}
          className={`flex flex-col items-center justify-center w-36 h-36 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
            selectedGender === 'M' ? 'bg-red-500 shadow-lg' : 'bg-gray-700 hover:bg-red-400'
          }`}
        >
          <FaMars className="text-6xl mb-1" />
          <span className="text-2xl font-bold">M</span>
        </button>
        <button
          onClick={() => setSelectedGender('F')}
          className={`flex flex-col items-center justify-center w-36 h-36 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
            selectedGender === 'F' ? 'bg-red-500 shadow-lg' : 'bg-gray-700 hover:bg-red-400'
          }`}
        >
          <FaVenus className="text-6xl mb-1" />
          <span className="text-2xl font-bold">F</span>
        </button>
      </div>
      <div className="flex justify-end">
        <ButtonContinue
          onClick={() => onNext({ sex: selectedGender })}
          disabled={!selectedGender}
          className="px-6"
        >
          Next ▸
        </ButtonContinue>
      </div>
    </div>
  );
};

export default GenderStep;
