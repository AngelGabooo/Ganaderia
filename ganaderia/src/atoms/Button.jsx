import React from 'react';

const Button = ({ onClick, isOpen }) => {
  return (
    <button 
      onClick={onClick} 
      className="relative w-10 h-10 focus:outline-none md:hidden"
      aria-label="Menu"
    >
      <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
        isOpen ? 'rotate-45 top-1/2' : 'top-1/3'
      }`}></span>
      <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 top-1/2 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}></span>
      <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
        isOpen ? '-rotate-45 top-1/2' : 'top-2/3'
      }`}></span>
    </button>
  );
};

export default Button;