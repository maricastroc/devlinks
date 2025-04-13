import NavLink from '@/Components/NavLink';
import {
  faArrowRightFromBracket,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  currentRoute: string;
};

export const DropdownProfile = ({ currentRoute }: Props) => {
  return (
    <div
      className={`w-[170px] items-start absolute z-[9998] py-1 max-h-[16rem] flex flex-col overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-md top-[3.5rem] right-[0rem]`}
    >
      <NavLink
        href={route('profile')}
        className={`${currentRoute === 'profile' && 'text-medium-purple pointer-events-none'} flex items-center gap-2 px-4 py-1 md:px-[0.9rem] hover:text-medium-purple`}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        <span className="font-medium">Details</span>
      </NavLink>
      <hr className="w-[150px] mx-2 text-dark-gray" />
      <NavLink
        href={route('logout')}
        method="post"
        className="flex items-center gap-2 px-4 py-1 md:px-[0.9rem] hover:text-medium-purple"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <span className="font-medium">Logout</span>
      </NavLink>
    </div>
  );
};
