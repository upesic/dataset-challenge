import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/16/solid';
import TextField from './TextField';
import type { SearchInputProps } from '../types';

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchValue') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    localStorage.setItem('searchValue', val);

    if (val === "") {
      onSearch("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      localStorage.setItem('searchValue', searchTerm);
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    localStorage.setItem('searchValue', '');
    setSearchTerm("");
    onSearch("");
  };

  const triggerSearch = () => {
    localStorage.setItem('searchValue', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center bg-[#449ed8] rounded-[5px] px-2 py-1">
      <MagnifyingGlassIcon onClick={triggerSearch} className='cursor-pointer size-4 text-white' />
      <TextField
        name={'search'}
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fieldClassName='flex-1 outline-none ml-1 text-white'
      />
      {searchTerm && (
        <XMarkIcon onClick={handleClear} className='cursor-pointer size-4 text-white' />
      )}
    </div>
  );
};

export default SearchInput;