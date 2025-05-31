import type { CheckboxFieldProps } from '../types';

const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { id, name, label = '', checked, onChange, labelClassName = '', fieldClassName = '' } = props;
  const inputId = id || name.toLowerCase();

  return (
    <>
      <input
        id={inputId}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`cursor-pointer ${fieldClassName}`}
      />
      <label htmlFor={inputId} className={`cursor-pointer ${labelClassName}`}>
        {label}
      </label>
    </>

  );
};

export default CheckboxField;