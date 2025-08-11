import React from 'react';
import Typography from '../atoms/Typography';

const NavItem = ({ children, isActive = false, onClick }) => {
  return (
    <li 
      className={`px-4 py-2 cursor-pointer ${isActive ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
      onClick={onClick}
    >
      <Typography variant="span" className="font-medium">{children}</Typography>
    </li>
  );
};

export default NavItem;