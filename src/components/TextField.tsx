import type { TextFieldProps } from '../types';

const TextField: React.FC<TextFieldProps> = (props) => {
  const { id, name, label = '', value, onChange, onKeyDown, labelClassName = '', fieldClassName = '', placeholder = '' } = props
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
        autoComplete='off'
      />
    </>

  );
};

export default TextField;