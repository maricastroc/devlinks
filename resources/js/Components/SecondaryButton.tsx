import { ButtonHTMLAttributes } from 'react'

export default function SecondaryButton({
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-25 border-gray-500 bg-background-secondary text-gray-300 hover:bg-gray-700 focus:ring-offset-gray-800 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}
