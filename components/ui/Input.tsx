
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = ({ label, id, icon, containerClassName, ...props }: InputProps): React.ReactNode => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          {...props}
          className={`block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md 
                      placeholder-slate-400 text-white 
                      focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 
                      sm:text-sm transition-colors duration-150 ease-in-out
                      ${icon ? 'pl-10' : ''} ${props.className || ''}`}
        />
      </div>
    </div>
  );
};
