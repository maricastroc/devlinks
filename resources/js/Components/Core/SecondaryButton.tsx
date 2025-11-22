import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ThreeDots } from 'react-loading-icons';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

const SecondaryButton = forwardRef<HTMLButtonElement, Props>(
  (
    { className = '', isSubmitting = false, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={
          `disabled:cursor-not-allowed disabled:text-white justify-center h-[3rem] disabled:bg-purple-hover disabled:border-transparent w-full inline-flex items-center rounded-lg border px-4 py-3 text-md font-semibold text-medium-purple transition duration-150 ease-in-out focus:visible ${
            isSubmitting
              ? 'cursor-not-allowed bg-gray-300 border-transparent hover:bg-gray-300 hover:bg-opacity-100'
              : 'bg-transparent border-medium-purple hover:bg-purple-hover hover:bg-opacity-30'
          } ` + className
        }
        disabled={disabled}
      >
        {isSubmitting ? (
          <div style={{ display: 'flex', gap: 2 }}>
            <ThreeDots height={'8px'} />
          </div>
        ) : (
          <span className="w-full text-center">{children}</span>
        )}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';

export default SecondaryButton;
