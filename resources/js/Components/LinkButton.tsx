import { InertiaLinkProps, Link } from '@inertiajs/react'

export default function LinkButton({
  className = '',
  disabled,
  children,
  ...props
}: InertiaLinkProps) {
  return (
    <Link
      {...props}
      className={
        `inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-accent-blue-dark focus:bg-accent-blue-dark focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 bg-accent-blue-mid-darker focus:ring-offset-gray-800 active:bg-gray-300 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </Link>
  )
}
