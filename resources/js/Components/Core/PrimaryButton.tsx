import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ThreeDots } from 'react-loading-icons';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(
  (
    { className = '', isSubmitting = false, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={
          `disabled:cursor-not-allowed justify-center disabled:bg-purple-hover w-full inline-flex items-center rounded-lg bg-medium-purple px-4 py-3 text-md font-semibold text-white transition duration-150 ease-in-out hover:bg-purple-hover ${
            isSubmitting &&
            'cursor-not-allowed h-[3rem] bg-purple-hover border-transparent'
          } ` + className
        }
        disabled={disabled}
      >
        {isSubmitting ? (
          <div style={{ display: 'flex', gap: 2 }}>
            <ThreeDots height="8px" />
          </div>
        ) : (
          <span className="w-full text-center">{children}</span>
        )}
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
