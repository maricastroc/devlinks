import { X } from 'phosphor-react';
import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react';

export default forwardRef(function SearchInput(
  {
    type = 'text',
    onReset,
    search = '',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    onReset?: () => void;
    search: string;
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
    <label
      className={
        `flex items-center justify-between h-10 text-sm text-gray-300 border-transparent rounded-lg shadow-sm input disabled::cursor-not-allowed bg-background-tertiary focus:border-gray-600 focus:ring-gray-600` +
        className
      }
    >
      <input
        {...props}
        type={type}
        className={
          'pl-0 grow disabled:cursor-not-allowed focus:border-transparent focus:ring-transparent border-transparent shadow-sm bg-background-tertiary text-gray-300' +
          className
        }
        ref={localRef}
      />
      {search !== '' && (
        <button onClick={onReset}>
          <X
            className="text-gray-300 transition-all duration-150 hover:text-gray-100"
            size={20}
          />
        </button>
      )}
    </label>
  );
});
