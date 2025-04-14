import ApplicationLogo from '@/Components/Core/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { ReactNode, useEffect, useState } from 'react';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';

type GuestProps = {
  children: ReactNode;
  showLogo?: boolean;
};

export default function Guest({ children, showLogo = true }: GuestProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Inertia.on('start', start);
    Inertia.on('finish', end);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-light-gray sm:justify-center sm:pt-0">
      {showLogo && (
        <div className="mb-2">
          <Link href="/">
            <ApplicationLogo />
          </Link>
        </div>
      )}

      <div className="w-full px-6 py-4 overflow-hidden md:mt-6 md:shadow-md bg-light-gray md:bg-white sm:max-w-lg sm:rounded-lg dark:bg-background-secondary">
        {isLoading && <LoadingComponent hasOverlay />}
        {children}
      </div>
    </div>
  );
}
