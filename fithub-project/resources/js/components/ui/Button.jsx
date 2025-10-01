// fithub-project/resources/js/components/ui/Button.jsx

import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
  const baseClasses = 'font-semibold py-2 px-4 rounded-full shadow-lg transition-colors focus:outline-none';

  // Combina as classes base com quaisquer classes personalizadas passadas via props
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;
