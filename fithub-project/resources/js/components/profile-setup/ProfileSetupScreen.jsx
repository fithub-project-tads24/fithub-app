import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import GenderStep from './GenderStep';
import ObjectiveStep from './ObjectiveStep';
import ActivityLevelStep from './ActivityLevelStep';
import HeightStep from './HeightStep';
import YearsOldStep from './YearsOldStep';
import WeightStep from './WeightStep';

const ProfileSetupScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { updateProfile } = useAuth();

  const handleNext = async (data) => {
    let formattedData = { ...data };

    if (data.age_years) formattedData = { age: data.age_years };
    if (data.weight_kg) formattedData = { weight: data.weight_kg };
    if (data.height_cm) formattedData = { height: data.height_cm };

    const updatedData = { ...formData, ...formattedData };
    setFormData(updatedData);

    if (step === 6) {
      console.log("ENVIANDO PARA API:", updatedData);

      try {
        await updateProfile(updatedData);
        alert("Perfil salvo com sucesso!");
        window.location.href = '/tela-principal';
      } catch (error) {
        console.error("Erro no envio:", error);
        alert("Erro ao salvar. Verifique o console.");
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  switch (step) {
    case 1: return <GenderStep onNext={handleNext} />;
    case 2: return <ObjectiveStep onNext={handleNext} onBack={handleBack} />;
    case 3: return <ActivityLevelStep onNext={handleNext} onBack={handleBack} />;
    case 4: return <HeightStep onNext={handleNext} onBack={handleBack} />;
    case 5: return <YearsOldStep onNext={handleNext} onBack={handleBack} />;
    case 6: return <WeightStep onNext={handleNext} onBack={handleBack} />;
    default: return null;
  }
};

export default ProfileSetupScreen;
