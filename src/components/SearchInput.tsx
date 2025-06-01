import React from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/16/solid';
import type { SearchInputProps } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchValue } from '../store/slices/transformerSlice';
import { Input } from 'antd';

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = "Search..." }) => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(state => state.transformers);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    dispatch(setSearchValue(val));

    if (val === "") {
      onSearch("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchValue);
    }
  };

  const handleClear = () => {
    dispatch(setSearchValue(''))
    onSearch("");
  };

  const triggerSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="flex items-center bg-accent rounded-[5px] px-2 py-1">
      <MagnifyingGlassIcon onClick={triggerSearch} className='cursor-pointer size-4 text-primary' />
      <Input
        name='search'
        value={searchValue}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={'input-search'}
        autoComplete='off'
      />
      {searchValue && (
        <XMarkIcon onClick={handleClear} className='cursor-pointer size-4 text-primary' />
      )}
    </div>
  );
};

export default SearchInput;