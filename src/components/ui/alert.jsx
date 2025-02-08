import React from 'react';

const Alert = ({ title, message, type = 'info' }) => {
  const alertStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    success: 'bg-green-100 border-green-500 text-green-700',
  };

  return (
    <div className={`border-l-4 p-4 my-2 ${alertStyles[type]}`}>
      {title && <strong className="block">{title}</strong>}
      <p>{message}</p>
    </div>
  );
};

export default Alert;