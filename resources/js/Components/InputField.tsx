import InputError from './InputError';
import InputLabel from './InputLabel';
import TextInput from './TextInput';

export function InputField({
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  type = 'text',
  error,
  disabled,
  autoComplete,
  name,
  inputRef
}: {
  label: string;
  id: string;
  name?: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col mt-3 md:flex-row md:items-center">
      <InputLabel className="md:hidden" htmlFor={id} value={label} />
      <p className="hidden md:w-[40%] md:block text-md text-medium-gray">
        {label}
      </p>
      <div className="flex flex-col w-full">
        <TextInput
          id={id}
          name={name || id}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={`block w-full mt-1 ${error ? 'border border-medium-red' : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <InputError message={error} className="mt-1" />
      </div>
    </div>
  );
}
