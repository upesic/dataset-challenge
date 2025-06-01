import React from "react";
import type { SelectProps } from '../types';


const SelectField: React.FC<SelectProps> = (props) => {
  const { id, name, value, label, onSelectChange, options, labelClassName = "", fieldClassName = "" } = props;
  const inputId = id || name.toLowerCase();
  return (
    <>
      <label htmlFor={inputId} className={labelClassName}>
        {label}
      </label>
      <select
        id={inputId}
        value={value}
        name={name}
        onChange={onSelectChange}
        className={`bg-accent p-1 rounded-[5px] text-sm text-primary font-semibold focus:outline-none ${fieldClassName}`}
      >
        {options.length === 0 ? (
          <option disabled>No options</option>
        ) :
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </>

  );
};

export default SelectField;