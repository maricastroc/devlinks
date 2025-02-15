import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

type GuestProps = {
  children: ReactNode;
};

export default function Guest({ children }: GuestProps) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-light-gray sm:justify-center sm:pt-0">
      <div className="mb-6">
        <Link href="/">
          <ApplicationLogo />
        </Link>
      </div>

      <div className="w-full px-6 py-4 overflow-hidden md:mt-6 md:shadow-md bg-light-gray md:bg-white sm:max-w-lg sm:rounded-lg dark:bg-background-secondary">
        {children}
      </div>
    </div>
  );
}
