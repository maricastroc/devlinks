import { ButtonHTMLAttributes } from 'react';

interface StepButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive: boolean;
  disabled?: boolean;
  currentStep: number;
  step: number;
}

export function StepButton({
  label,
  currentStep,
  step,
  isActive,
  disabled = false,
  ...rest
}: StepButtonProps) {
  return (
    <button
      className={`step w-full text-sm font-bold transition-all duration-150 ${
        isActive ? 'text-white' : 'text-gray-300'
      } ${step <= currentStep && 'hover:text-white step-accent'}`}
      type='button'
      disabled={disabled}
      {...rest}
    >
      <p className="mt-1">{label}</p>
    </button>
  );
}
