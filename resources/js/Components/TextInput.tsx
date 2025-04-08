import { forwardRef, InputHTMLAttributes } from 'react';

export default forwardRef(function TextInput({
  type = 'text',
  className = '',
  icon = null,
  isFocused = false,
  hasError = false,
  inputRef,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  isFocused?: boolean;
  icon?: string | null;
  hasError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <img
          className="absolute text-gray-400 active:bg-white transform -translate-y-1/2 left-3 top-[55%]"
          src={icon}
          alt=""
        />
      )}

      <input
        className={
          `w-full ${icon ? 'pl-10' : ''} hover:shadow-lg pr-4 active:bg-white py-3 rounded-md border ${hasError ? 'border-medium-red' : 'border-borders'} shadow-sm bg-white text-dark-gray focus:border-medium-purple focus:ring-medium-purple disabled:cursor-not-allowed disabled:text-gray-500` +
          className
        }
        ref={inputRef}
        {...props}
        type={type}
      />
    </div>
  );
});
