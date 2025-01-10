import { ButtonHTMLAttributes } from 'react'

export default function PaginationButton({
  className = '',
  disabled,
  children,
  isActive = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isActive: boolean }) {
  return (
    <button
      {...props}
      className={`disabled:hover:bg-transparent disabled:cursor-not-allowed px-3 py-1 rounded ${
        isActive
          ? 'bg-accent-blue-mid-darker text-white'
          : 'bg-background-secondary border hover:bg-gray-700 border-gray-500 text-gray-300'
      }` + className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
