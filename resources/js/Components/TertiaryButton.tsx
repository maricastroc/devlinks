import { ButtonHTMLAttributes } from 'react';

export default function TertiaryButton({
  className = '',
  disabled,
  children,
  isBigger = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isBigger?: boolean }) {
  return (
    <button
      {...props}
      className={
        `disabled:cursor-not-allowed ${isBigger ? 'py-3' : 'py-2'} inline-flex items-center justify-center rounded-md px-4 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:bg-accent-blue-dark focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 bg-accent-blue-mid-darker focus:ring-offset-gray-800 active:bg-gray-300 ${
          disabled
            ? 'opacity-25 cursor-not-allowed'
            : 'hover:bg-accent-blue-dark'
        } ` + className
      }
      disabled={disabled}
    >
      <p className="w-full text-center">{children}</p>
    </button>
  );
}
