import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `disabled:cursor-not-allowed disabled:bg-purple-hover w-full inline-flex items-center rounded-lg bg-medium-purple px-4 py-3 text-md font-semibold text-white transition duration-150 ease-in-out hover:bg-purple-hover focus:outline-none ` + className
      }
      disabled={disabled}
    >
      <p className="w-full text-center">{children}</p>
    </button>
  );
}
