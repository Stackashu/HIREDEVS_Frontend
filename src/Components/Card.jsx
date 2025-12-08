import React from 'react';
import './Card.css';

const Card = ({ children, className = '', padding = 'medium', ...props }) => {
  return (
    <div className={`ui-card padding-${padding} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
