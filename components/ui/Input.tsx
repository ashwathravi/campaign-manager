
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = ({ label, id, icon, containerClassName, ...props }: InputProps): React.ReactNode => {
  // Combine base input classes with conditional class for icon padding and any additional classes from props
  const inputClasses = [
    'custom-input',
    icon ? 'custom-input-with-icon' : '',
    props.className || '' // Include className passed from parent
  ].filter(Boolean).join(' '); // Filter out empty strings and join

  return (
    <div className={containerClassName || ''}> {/* Ensure containerClassName is at least an empty string */}
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-field-wrapper">
        {icon && (
          <div className="input-icon-container">
            {/* Icon is passed as a child, its own styling (size, color) is handled by the class it's given when created */}
            {icon}
          </div>
        )}
        <input
          id={id}
          {...props} // Spread remaining props (value, onChange, type, placeholder, disabled, etc.)
          className={inputClasses} // Apply combined classes
        />
      </div>
    </div>
  );
};
