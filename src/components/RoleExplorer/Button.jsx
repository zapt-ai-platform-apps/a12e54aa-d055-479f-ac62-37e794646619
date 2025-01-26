import React from 'react';

export const Button = ({ children, type = 'button', onClick, disabled, className, variant = 'primary' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg transition-colors font-medium';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};