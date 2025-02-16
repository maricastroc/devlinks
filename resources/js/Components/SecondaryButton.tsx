import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `disabled:cursor-not-allowed disabled:bg-purple-hover w-full inline-flex items-center rounded-lg bg-transparent border border-medium-purple px-4 py-3 text-md font-semibold text-medium-purple transition duration-150 ease-in-out hover:bg-purple-hover hover:bg-opacity-30 focus:outline-none ` +
        className
      }
      disabled={disabled}
    >
      <p className="w-full text-center">{children}</p>
    </button>
  );
}
