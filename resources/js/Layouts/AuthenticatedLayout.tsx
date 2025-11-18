import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Navbar } from './Partials/Navbar';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';

export default function Authenticated({
  children,
  header
}: PropsWithChildren<{ header?: ReactNode }>) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Inertia.on('start', start);
    Inertia.on('finish', end);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-light-gray">
      <Navbar />

      {header && (
        <header className="w-full px-6 py-4" role="banner">
          <h1 className="text-xl font-semibold text-gray-800">{header}</h1>
        </header>
      )}

      <main
        className="flex flex-col flex-grow items-center justify-center"
        role="main"
      >
        {isLoading && <LoadingComponent hasOverlay />}
        {children}
      </main>
    </div>
  );
}
