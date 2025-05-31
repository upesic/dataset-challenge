import type { TextFieldProps } from '../types';

const TextField = ({ id, name, label = '', value, onChange, onKeyDown, labelClassName = '', fieldClassName = '', placeholder = '' }: TextFieldProps) => {
  const inputId = id || name.toLowerCase();

  return (
    <>
      {label && <label htmlFor={inputId} className={`${labelClassName}`}>
        {label}
      </label>}
      <input
        id={inputId}
        name={name}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={fieldClassName}
        value={value}
      />
    </>

  );
};

export default TextField;