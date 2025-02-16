import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import Preview from '/public/assets/images/icon-preview-header.svg';
import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { UserCircle } from 'phosphor-react';

export const Navbar = () => {
  const { currentRoute, auth } = usePage().props;

  const user = auth.user;
  
  return (
    <nav className="flex items-center justify-between w-full p-6 py-4 pl-2 bg-white md:w-auto md:m-6 md:rounded-md md:p-5">
      <Link
        href={route('dashboard')}
        className="flex items-center justify-center p-3 py-2 md:p-0"
      >
        <img className="md:hidden" src={SmallLogo} alt="Small Logo" />
        <img
          width={150}
          className="hidden md:block"
          src={Logo}
          alt="Large Logo"
        />
      </Link>

      <div className="flex items-center gap-2">
        <NavLink
          className="flex items-center transition-all duration-150 md:gap-2 hover:text-medium-purple"
          href={route('dashboard')}
          isActive={currentRoute === 'dashboard'}
        >
          <FontAwesomeIcon icon={faLink} />
          <p className="hidden md:block">Links</p>
        </NavLink>

        <NavLink
          className="flex items-center transition-all duration-150 md:gap-2 hover:text-medium-purple"
          href={route('profile')}
          isActive={currentRoute === 'profile'}
        >
          <UserCircle size={26} />
          <p className="hidden md:block">Profile Details</p>
        </NavLink>
      </div>

      <Link
        href={route('shared', { user: user.id })}
        className="flex items-center justify-center p-3 py-2 border rounded-md md:px-5 md:py-3 border-medium-purple"
      >
        <img src={Preview} alt="" className="md:hidden" />
        <p className="hidden font-semibold md:block text-medium-purple">
          Preview
        </p>
      </Link>
    </nav>
  );
};
