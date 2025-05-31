
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps): React.ReactNode => {
  // Ensure className is a string and trim whitespace, defaulting to an empty string if undefined/null
  const additionalClasses = typeof className === 'string' ? className.trim() : '';

  return (
    <div className={`custom-card ${additionalClasses || ''}`.trim()}>
      {children}
    </div>
  );
};
