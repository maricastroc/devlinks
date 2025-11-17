import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import Preview from '/public/assets/images/icon-preview-header.svg';
import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/Core/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { UserCircle } from 'phosphor-react';
import { RefObject, useState } from 'react';
import { DropdownProfile } from './DropdownProfile';
import { useClickOutside } from '@/utils/useClickOutside';

export const Navbar = () => {
  const { auth } = usePage().props;

  const currentPath = window.location.pathname;

  const routeMap = {
    '/dashboard': 'web.dashboard.index',
    '/profile': 'web.profile.index',
    '/themes': 'web.themes.index'
  };

  const currentRoute =
    routeMap[currentPath as keyof typeof routeMap] || currentPath;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  });

  const user = auth.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-6 py-4 pl-2 bg-white md:shadow-sm md:relative md:top-auto md:left-auto md:right-auto md:w-auto md:m-6 md:rounded-md md:p-5">
      <Link
        href={route('web.dashboard.index')}
        className="flex items-center justify-center p-3 py-2 md:p-0"
      >
        <img className="md:hidden" src={SmallLogo} alt="Small Logo" />
        <img
          width={150}
          className="hidden md:block"
          src={Logo}
          alt="Devlinks application logo"
        />
      </Link>

      <div className="flex items-center gap-1 md:gap-2">
        <NavLink
          className="flex items-center transition-all duration-150 md:gap-2 hover:text-medium-purple"
          href={route('web.dashboard.index')}
          isActive={currentRoute === '/'}
        >
          <FontAwesomeIcon icon={faLink} />
          <p className="hidden md:block">Links</p>
        </NavLink>

        <button
          type="button"
          className={`
            relative transition-all duration-150 cursor-pointer
            md:gap-2 hover:text-medium-purple flex items-center
            justify-center md:px-6 p-4 py-3 font-semibold rounded-md
            ${
              currentRoute === 'web.profile.index' || isDropdownOpen
                ? 'bg-purple-hover bg-opacity-25 text-medium-purple'
                : 'bg-transparent text-gray-600'
            }
          `}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          ref={dropdownRef as RefObject<HTMLButtonElement>}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsDropdownOpen(false);
          }}
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-controls="profile-menu"
        >
          <UserCircle aria-hidden="true" size={26} />
          <p className="hidden md:block">Profile</p>
          {isDropdownOpen && (
            <DropdownProfile currentRoute={currentRoute as string} />
          )}
        </button>
      </div>

      <Link
        href={route('shared', {
          user: user.username
        })}
        className="flex items-center justify-center p-3 py-2 transition-all duration-150 border rounded-md md:px-5 md:py-3 border-medium-purple hover:bg-purple-hover hover:bg-opacity-30"
      >
        <img src={Preview} alt="Preview button" className="md:hidden" />
        <p className="hidden font-semibold md:block text-medium-purple">
          Preview
        </p>
      </Link>
    </nav>
  );
};
