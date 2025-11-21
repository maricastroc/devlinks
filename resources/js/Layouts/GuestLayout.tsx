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

  const [announceLoading, setAnnounceLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
      setAnnounceLoading(true);
    };

    const end = () => {
      setIsLoading(false);
      setTimeout(() => setAnnounceLoading(false), 1000);
    };

    Inertia.on('start', start);
    Inertia.on('finish', end);

    return () => {
      setIsLoading(false);
      setAnnounceLoading(false);
    };
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen pt-6 bg-light-gray sm:justify-center sm:pt-0">
      {announceLoading && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Loading content...
        </div>
      )}

      {showLogo && (
        <header className="mb-2">
          <Link href="/" aria-label="Back to main page">
            <ApplicationLogo />
          </Link>
        </header>
      )}

      <section
        className="w-full px-6 py-4 overflow-hidden md:mt-6 md:shadow-md bg-light-gray md:bg-white sm:max-w-lg sm:rounded-lg dark:bg-background-secondary"
        aria-labelledby="guest-content-title"
      >
        {isLoading && <LoadingComponent hasOverlay />}
        {children}
      </section>
    </main>
  );
}
