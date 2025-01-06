import { InertiaLinkProps, Link, usePage } from '@inertiajs/react'

export default function NavLink({
  className = '',
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  const { url } = usePage();

  const isActive = url === props.href;

  return (
    <Link
      {...props}
      className={
        'inline-flex items-center px-1 pt-1 text-large leading-5 transition duration-150 ease-in-out focus:outline-none ' +
        (isActive
          ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 dark:hover:text-accent-blue-mid-hover dark:text-accent-blue-mid font-black'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-content dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300') +
        className
      }
    >
      {children}
    </Link>
  )
}
