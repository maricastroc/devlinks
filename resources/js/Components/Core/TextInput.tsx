import {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState
} from 'react';

export default forwardRef(function TextInput({
  type = 'text',
  className = '',
  icon = null,
  isFocused = false,
  hasError = false,
  inputRef,
  prefix,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  isFocused?: boolean;
  icon?: string | null;
  hasError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  prefix?: string;
}) {
  const prefixRef = useRef<HTMLSpanElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (prefixRef.current) {
      const width = prefixRef.current.getBoundingClientRect().width;
      setPrefixWidth(width);
    }
  }, [prefix]);

  return (
    <div className="relative w-full">
      {icon && (
        <img
          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-[55%]"
          src={icon}
          alt=""
        />
      )}

      {prefix && (
        <span
          ref={prefixRef}
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-md mt-[0.145rem] ${
            icon ? 'left-10' : 'left-3'
          }`}
          style={{ visibility: 'hidden', position: 'absolute' }} // Esconde o span de medida
        >
          {prefix}
        </span>
      )}

      {/* Span visível */}
      {prefix && (
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-md mt-[0.145rem] ${
            icon ? 'left-10' : 'left-3'
          }`}
        >
          {prefix}
        </span>
      )}

      <input
        className={
          `w-full ${icon ? 'pl-10' : ''} pr-4 py-3 rounded-md border ${
            hasError ? 'border-medium-red' : 'border-borders'
          } shadow-sm bg-white text-dark-gray focus:border-medium-purple focus:ring-medium-purple disabled:cursor-not-allowed disabled:text-gray-500` +
          className
        }
        style={{
          paddingLeft: prefix
            ? `${(icon ? 40 : 12) + prefixWidth}px`
            : icon
              ? '2.5rem'
              : '0.75rem'
        }}
        ref={inputRef}
        type={type}
        {...props}
      />
    </div>
  );
});
