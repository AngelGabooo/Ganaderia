import React from 'react';

const Typography = ({ variant = 'p', children, className = '' }) => {
  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    p: 'text-base',
    span: 'text-sm',
  };

  const Tag = variant;

  return <Tag className={`${variants[variant]} ${className}`}>{children}</Tag>;
};

export default Typography;