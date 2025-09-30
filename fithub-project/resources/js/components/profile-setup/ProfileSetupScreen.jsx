import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenderStep from './GenderStep';
import ObjectiveStep from './ObjectiveStep';
import ActivityLevelStep from './ActivityLevelStep';

const ProfileSetupScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (step === 3) {
      const finalData = { ...formData, ...data };
      console.log("Dados completos do perfil:", finalData);
      alert("Dados salvos com sucesso!");
      navigate('/dashboard');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  switch (step) {
    case 1:
      return <GenderStep onNext={handleNext} />;
    case 2:
      return <ObjectiveStep onNext={handleNext} onBack={handleBack} />;
    case 3:
      return <ActivityLevelStep onNext={handleNext} onBack={handleBack} />;
    default:
      navigate('/dashboard');
      return null;
  }
};

export default ProfileSetupScreen;
