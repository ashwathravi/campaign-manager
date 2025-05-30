
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps): React.ReactNode => {
  const baseStyle = "font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out";
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400';
      break;
    case 'secondary':
      variantStyle = 'bg-slate-600 hover:bg-slate-700 text-slate-100 focus:ring-slate-500';
      break;
    case 'danger':
      variantStyle = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400';
      break;
  }

  return (
    <button
      {...props}
      className={`${baseStyle} ${variantStyle} ${className || ''}`}
    >
      {children}
    </button>
  );
};
