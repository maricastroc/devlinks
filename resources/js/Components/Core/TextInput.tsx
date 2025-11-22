import {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  ReactNode,
  CSSProperties
} from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string | ReactNode | null;
  hasError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  prefix?: string;
};

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    type = 'text',
    className = '',
    icon = null,
    hasError = false,
    inputRef,
    prefix,
    ...props
  },
  ref
) {
  const prefixRef = useRef<HTMLSpanElement>(null);

  const [prefixWidth, setPrefixWidth] = useState(0);

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <img
          className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-[50%]"
          src={icon}
          alt=""
        />
      );
    }

    return (
      <div className="absolute transform -translate-y-1/2 left-3 top-[55%] text-[#737373]">
        {icon}
      </div>
    );
  };

  const getInputStyle = (): CSSProperties => {
    if (prefix) {
      return { paddingLeft: `${(icon ? 40 : 12) + prefixWidth}px` };
    }
    return icon ? { paddingLeft: '2.5rem' } : { paddingLeft: '0.75rem' };
  };

  useEffect(() => {
    if (prefixRef.current) {
      const width = prefixRef.current.getBoundingClientRect().width;
      setPrefixWidth(width);
    }
  }, [prefix]);

  return (
    <div className="relative w-full">
      {renderIcon()}

      {prefix && (
        <>
          <span
            ref={prefixRef}
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-md mt-[0.145rem] ${
              icon ? 'left-10' : 'left-3'
            }`}
            style={{ visibility: 'hidden', position: 'absolute' }}
          >
            {prefix}
          </span>
          <span
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-md mt-[0.145rem] ${
              icon ? 'left-10' : 'left-3'
            }`}
          >
            {prefix}
          </span>
        </>
      )}

      <input
        className={`
          w-full 
          ${icon ? 'pl-10' : ''} 
          pr-4 py-3 rounded-md border 
          ${hasError ? 'border-medium-red' : 'border-borders'} 
          shadow-sm focus:border-borders bg-white text-dark-gray 
          focus-visible:outline focus-visible:outline-medium-purple 
          focus-visible:outline-2 focus-visible:outline-offset-2 
          disabled:cursor-not-allowed disabled:text-gray-500 
          ${className}
        `}
        style={getInputStyle()}
        ref={inputRef || ref}
        type={type}
        {...props}
      />
    </div>
  );
});
