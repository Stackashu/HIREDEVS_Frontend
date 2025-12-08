import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  isLoading = false, 
  disabled, 
  ...props 
}) => {
  return (
    <button 
      className={`ui-button variant-${variant} size-${size} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="ui-button-loader"></span> : null}
      <span className="ui-button-content" style={{ opacity: isLoading ? 0 : 1 }}>
        {children}
      </span>
    </button>
  );
};

export default Button;
