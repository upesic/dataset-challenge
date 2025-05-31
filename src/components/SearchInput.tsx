import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/16/solid';

type SearchInputProps = {
  onSearch: (term: string) => void;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);

    if (val === "") {
      onSearch("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const triggerSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center bg-[#449ed8] rounded-[5px] px-2 py-1">
      <MagnifyingGlassIcon onClick={triggerSearch} className='cursor-pointer size-4 text-white' />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 outline-none ml-1 text-white"
      />
      {searchTerm && (
        <XMarkIcon onClick={handleClear} className='cursor-pointer size-4 ' />
      )}
    </div>
  );
};

export default SearchInput;