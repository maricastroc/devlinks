import InputError from './InputError';
import InputLabel from './InputLabel';
import TextInput from './TextInput';

export function InputField({
  label,
  id,
  placeholder,
  value,
  onChange,
  type = 'text',
  error
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
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
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className="block w-full mt-1"
          onChange={onChange}
          hasError={error !== undefined}
        />
        <InputError message={error} className="mt-1" />
      </div>
    </div>
  );
}
