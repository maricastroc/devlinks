import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Navbar } from './Partials/Navbar';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';

export default function Authenticated({
  children
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

      <main className={`items-center flex justify-center flex-grow`}>
        {isLoading && <LoadingComponent hasOverlay />}
        {children}
      </main>
    </div>
  );
}
