
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps): React.ReactNode => {
  return (
    <div className={`bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg ${className || ''}`}>
      {children}
    </div>
  );
};
