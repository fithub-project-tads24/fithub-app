import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  rightIcon,
  ...props
}) => {
  const inputClasses = `
    block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset 
    ${error 
      ? 'ring-red-300 focus:ring-red-500' 
      : 'ring-gray-300 focus:ring-blue-500'
    } 
    placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
    disabled:opacity-50 disabled:cursor-not-allowed
    ${rightIcon ? 'pr-10' : ''}
  `;

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;