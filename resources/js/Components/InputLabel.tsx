import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
  value,
  className = '',
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
  return (
    <label
      {...props}
      className={
        `block text-xs text-dark-gray dark:text-content` + className
      }
    >
      {value || children}
    </label>
  );
}
