import NavLink from '@/Components/Core/NavLink';
import {
  faArrowRightFromBracket,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type Props = {
  currentRoute: string;
};

export const DropdownProfile = ({ currentRoute }: Props) => {
  return (
    <div
      role="menu"
      id="profile-menu"
      className={`w-[170px] items-start absolute z-[9998] py-1 max-h-[16rem] flex flex-col overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-md top-[3.5rem] right-[0rem]`}
    >
      <NavLink
        role="menuitem"
        href={route('web.profile.index')}
        className={clsx(
          'gap-2 px-4 py-2 hover:bg-gray-100 hover:text-medium-purple',
          currentRoute === 'web.profile.index' && 'pointer-events-none'
        )}
      >
        <FontAwesomeIcon aria-hidden="true" icon={faPenToSquare} />
        <span className="font-medium">Details</span>
      </NavLink>

      <hr className="w-full border-gray-200 my-1" />

      <NavLink
        role="menuitem"
        href={route('logout')}
        method="post"
        className="flex items-center gap-2 px-4 py-1 md:px-[0.9rem] hover:text-medium-purple"
      >
        <FontAwesomeIcon aria-hidden="true" icon={faArrowRightFromBracket} />
        <span className="font-medium">Logout</span>
      </NavLink>
    </div>
  );
};
