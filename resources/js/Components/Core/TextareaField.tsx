import InputError from './InputError';
import React, { useState, useEffect } from 'react';
import InputLabel from './InputLabel';

export function TextAreaField({
  id,
  placeholder,
  value = '',
  onChange,
  onBlur,
  error,
  disabled,
  name,
  rows = 4,
  className,
  textAreaRef,
  label,
  maxLength
}: {
  id: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  error?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  textAreaRef?: React.Ref<HTMLTextAreaElement>;
  label?: string;
  maxLength?: number;
}) {
  const [charCount, setCharCount] = useState(value?.length || 0);

  useEffect(() => {
    setCharCount(value?.length || 0);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange(e);
  };

  return (
    <div className="flex flex-col mt-3 md:flex-row md:items-center">
      <InputLabel className="md:hidden" htmlFor={id} value={label} />
      <p className="hidden md:w-[40%] md:block text-md text-medium-gray">
        {label}
      </p>
      <div className="flex flex-col w-full">
        <div className="relative">
          <textarea
            id={id}
            name={name || id}
            ref={textAreaRef}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            maxLength={maxLength}
            className={`block w-full mt-1 rounded-lg border border-transparent bg-gray-100 px-4 py-3 text-dark-grey placeholder:text-medium-gray shadow-sm focus-visible focus:border-medium-purple transition duration-150 ease-in-out resize-none ${
              error ? 'border-medium-red' : ''
            } ${className}`}
          />

          {maxLength && (
            <div className="absolute text-xs bottom-3 right-3 text-medium-gray">
              {charCount}/{maxLength}
            </div>
          )}
        </div>

        <InputError message={error} className="mt-1" />
      </div>
    </div>
  );
}
