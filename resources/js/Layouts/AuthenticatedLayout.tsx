import { ReactNode, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Navbar } from './Partials/Navbar';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';

interface Props {
  children: ReactNode;
}

export default function Authenticated({ children }: Props) {
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
