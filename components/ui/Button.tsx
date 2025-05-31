
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps): React.ReactNode => {
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    danger: 'button-danger',
  };

  // Ensure className is a string and trim whitespace
  const additionalClasses = typeof className === 'string' ? className.trim() : '';

  return (
    <button
      {...props}
      // Apply base class, the selected variant class, and any additional classes passed via props
      className={`button ${variantClasses[variant]} ${additionalClasses || ''}`.trim()}
    >
      {children}
    </button>
  );
};
