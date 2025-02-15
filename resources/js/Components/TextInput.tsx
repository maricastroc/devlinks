import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react';

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    icon = null,
    isFocused = false,
    hasError = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    icon?: string | null;
    hasError?: boolean;
  },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative w-full">
      {icon && (
        <img
          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-[55%]"
          src={icon}
          alt=""
        />
      )}

      <input
        className={
          `w-full pl-10 pr-4 py-3 rounded-md border ${hasError ? 'border-medium-red' : 'border-borders'} shadow-sm bg-white text-dark-gray focus:border-medium-purple focus:ring-medium-purple disabled:cursor-not-allowed disabled:text-gray-500` +
          className
        }
        ref={localRef}
        {...props}
        type={type}
      />
    </div>
  );
});
