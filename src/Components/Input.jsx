import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  error, 
  id, 
  className = '', 
  fullWidth = false,
  description,
  ...props 
}) => {
  return (
    <div className={`ui-input-group ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && <label htmlFor={id} className="ui-label">{label}</label>}
      <div className="ui-input-wrapper">
        <input 
          id={id} 
          className={`ui-input ${error ? 'has-error' : ''}`} 
          {...props} 
        />
      </div>
      {description && !error && <span className="ui-description">{description}</span>}
      {error && <span className="ui-error-message">{error}</span>}
    </div>
  );
};

export default Input;
