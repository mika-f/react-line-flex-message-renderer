import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  primary?: boolean;
}

export const Button = ({ label, onClick, primary }: ButtonProps) => {
  const mode = primary 
    ? 'bg-blue-600 text-white' 
    : 'bg-gray-200 text-gray-800';

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md font-medium transition-all active:scale-95 ${mode}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};