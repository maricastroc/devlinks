import { InputHTMLAttributes } from 'react';

export default function Checkbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        'rounded shadow-sm border-gray-700 bg-background-primary focus-visible focus:outline-medium-purple' +
        className
      }
    />
  );
}
