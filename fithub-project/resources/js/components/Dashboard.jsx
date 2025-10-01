import React, { useState } from 'react';
import GenderStep from './profile-setup/GenderStep';
import ObjectiveStep from './profile-setup/ObjectiveStep';
import ActivityLevelStep from './profile-setup/ActivityLevelStep';

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({});

  const handleNext = (data) => {
    setProfileData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GenderStep onNext={handleNext} />;
      case 2:
        return <ObjectiveStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ActivityLevelStep onBack={handleBack} />;
      default:
        return <div>Obrigado!</div>;
    }
  };

  return (
    <div className="w-full h-full bg-black">
      {renderStep()}
    </div>
  );
};

export default Dashboard;
