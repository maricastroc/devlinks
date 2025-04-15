import { ButtonHTMLAttributes } from 'react';
import { ThreeDots } from 'react-loading-icons';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

export default function SecondaryButton({
  className = '',
  isSubmitting = false,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={
        `disabled:cursor-not-allowed disabled:text-white justify-center h-[3rem] disabled:bg-purple-hover disabled:border-transparent w-full inline-flex items-center rounded-lg bg-transparent border border-medium-purple px-4 py-3 text-md font-semibold text-medium-purple transition duration-150 ease-in-out hover:bg-purple-hover hover:bg-opacity-30 focus:outline-none ${isSubmitting && 'cursor-not-allowed bg-gray-300 border-transparent'} ` +
        className
      }
      disabled={disabled}
    >
      {isSubmitting ? (
        <div style={{ display: 'flex', gap: 2 }}>
          <ThreeDots height={'8px'} />
        </div>
      ) : (
        <p className="w-full text-center">{children}</p>
      )}
    </button>
  );
}
