import React, { useState } from 'react';
import Ruler from '../ui/Ruler';
import ButtonContinue from '../ui/ButtonContinue';

const WeightStep = ({ onNext, onBack, defaultValue = 70 }) => {
    const [weight, setWeight] = useState(defaultValue);

    return (
        <div className="flex flex-col h-full text-white p-6">
            {/* Título*/}
            <div className="text-center mt-4">
                <h2 className="text-2xl font-bold uppercase tracking-wider">Qual é o seu peso?</h2>
                <p className="text-gray-400 text-sm mt-2">Isso nos ajuda a calcular seu consumo diário.</p>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8">
                {/* Valor Numérico */}
                <div className="flex items-end">
                    <span className="text-7xl font-bold text-white">{weight}</span>
                    <span className="text-2xl font-medium text-purple-500 mb-2 ml-2">kg</span>
                </div>

                {/* Régua de Seleção */}
                <div className="w-full">
                    <Ruler
                        min={30}
                        max={200}
                        value={weight}
                        onChange={setWeight}
                    />
                </div>
            </div>

            {/* Botões de Navegação  */}
            <div className="w-full flex justify-between items-center mb-4">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <span className="text-2xl mr-2">‹</span> Voltar
                </button>

                <ButtonContinue onClick={() => onNext({ weight_kg: weight })}>
                    Próximo
                </ButtonContinue>
            </div>
        </div>
    );
};

export default WeightStep;
