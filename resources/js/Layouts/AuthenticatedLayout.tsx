import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import Preview from '/public/assets/images/icon-preview-header.svg';
import { Link as LinkIcon, UserCircle } from 'phosphor-react';
import NavLink from '@/Components/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './Partials/Navbar';

export default function Authenticated({
  children
}: PropsWithChildren<{ header?: ReactNode }>) {
  const { currentRoute } = usePage().props;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-light-gray">
      <Navbar />

      <main className="flex items-start justify-center flex-grow">
        {children}
      </main>
    </div>
  );
}
