import React from 'react';

const Link = ({ children, href, mobile = false }) => {
  return (
    <a href={href} className={`inline-block ${
      mobile ? 'px-4 py-2' : 'px-2 py-1'
    } font-medium hover:text-blue-600 transition-colors duration-300`}>
      {children}
    </a>
  );
};

export default Link;