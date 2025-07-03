import React from 'react';
import Link from '../atoms/Link';

const NavItem = ({ children, href, mobile = false }) => {
  return (
    <li className="group relative">
      <Link href={href} mobile={mobile}>
        <span className={`relative inline-block ${
          mobile ? 'text-white text-xl' : 'text-white md:text-gray-800'
        }`}>
          {children}
          <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${
            mobile ? 'bg-white' : 'bg-blue-500'
          } transition-all duration-300 group-hover:w-full`}></span>
        </span>
      </Link>
    </li>
  );
};

export default NavItem;