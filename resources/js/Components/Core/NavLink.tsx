import { InertiaLinkProps, Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function NavLink({
  className = '',
  children,
  isActive = false,
  ...props
}: InertiaLinkProps & { isActive?: boolean }) {
  return (
    <Link
      {...props}
      className={clsx(
        'block w-full focus:outline-none focus-visible:outline focus-visible:outline-medium-purple focus-visible:outline-2',
        'flex items-center justify-start p-4 py-3 font-semibold rounded-md',
        isActive
          ? 'bg-purple-hover bg-opacity-25 text-medium-purple'
          : 'bg-transparent text-gray-600',

        className
      )}
    >
      {children}
    </Link>
  );
}
