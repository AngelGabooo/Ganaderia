import React from 'react';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

const SearchBar = ({ value, onChange, placeholder = 'Buscar...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pr-10"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <Button variant="ghost" className="p-1">
          <Icon name="search" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;