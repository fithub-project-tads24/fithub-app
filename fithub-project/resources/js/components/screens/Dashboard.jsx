import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenderStep from '../profile-setup/GenderStep';
import ObjectiveStep from '../profile-setup/ObjectiveStep';
import ActivityLevelStep from '../profile-setup/ActivityLevelStep';
import HeightStep from '../profile-setup/HeightStep';
import YearsOldStep from '../profile-setup/YearsOldStep';
import WeightStep from '../profile-setup/WeightStep';

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  const handleNext = (data) => {
    setProfileData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  useEffect(() => {
    if (step > 6) {
      navigate('/profile');
    }
  }, [step, navigate]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GenderStep onNext={handleNext} />;
      case 2:
        return <ObjectiveStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ActivityLevelStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <HeightStep onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <YearsOldStep onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <WeightStep onNext={handleNext} onBack={handleBack} />;
      default:
        return <div className="text-white p-6">Obrigado!</div>;
    }
  };

  return (
    <div className="w-full h-full bg-black text-white">
      {renderStep()}
    </div>
  );
};

export default Dashboard;
