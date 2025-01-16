import { InertiaLinkProps, Link, usePage } from '@inertiajs/react'

export default function ResponsiveNavLink({
  className = '',
  children,
  ...props
}: InertiaLinkProps) {
  const { url } = usePage()

  const isActive = props.href
    ? url === props.href ||
      url.startsWith(`${props.href}/`) ||
      url.startsWith(`${props.href}?`)
    : false

  return (
    <Link
      {...props}
      className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
        isActive
          ? 'border-accent-blue-mid  focus:border-indigo-700 hover:text-accent-blue-mid-hover text-accent-blue-mid font-black'
          : 'border-transparent  text-gray-200 hover:border-transparent  focus:border-transparent '
      } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
    >
      {children}
    </Link>
  )
}
