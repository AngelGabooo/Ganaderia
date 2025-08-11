import React from 'react';
import Typography from '../atoms/Typography';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false, 
  multiline = false, 
  rows = 1,
  className = ''
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <Typography variant="span" className="block mb-1 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Typography>
      )}
      
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
};

export default Input;