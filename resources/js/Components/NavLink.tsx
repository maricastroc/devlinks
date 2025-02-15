import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
  className = '',
  children,
  isActive = false,
  ...props
}: InertiaLinkProps & { isActive?: boolean }) {
  return (
    <Link
      {...props}
      className={`flex items-center justify-center md:px-6 p-4 py-3 font-semibold rounded-md ${isActive ? 'bg-purple-hover bg-opacity-25 text-medium-purple' : 'bg-transparent text-gray-600'} ${className}`}
    >
      {children}
    </Link>
  );
}
