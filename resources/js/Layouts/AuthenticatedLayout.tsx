import { PropsWithChildren, ReactNode } from 'react';
import { Navbar } from './Partials/Navbar';

export default function Authenticated({
  children
}: PropsWithChildren<{ header?: ReactNode }>) {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-light-gray">
      <Navbar />

      <main className="flex items-start justify-center flex-grow">
        {children}
      </main>
    </div>
  );
}
