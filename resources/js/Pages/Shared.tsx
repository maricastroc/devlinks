import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

import { notyf } from '@/libs/notyf';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LinkCard } from '@/Components/PhoneMockup';
import { LoadingComponent } from '@/Components/LoadingComponent';

import Logo from '/public/assets/images/logo-devlinks-large.svg';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import { Copy, Layout } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { DropdownTheme } from '@/Components/DropdownTheme';
import axios from 'axios';
import { TemplateStyles } from '@/types/template-styles';

type Props = {
  userLinks: UserLinkProps[];
  user: UserProps;
  authUser: UserProps | null;
};

type TemplateTypes = {
  [key: string]: TemplateStyles;
};

export const TEMPLATE_STYLES: TemplateTypes = {
  Default: {
    color: '#633CFF',
    header: 'bg-[#0000] md:bg-light-gray text-white',
    wrapper: 'bg-[#0000] text-dark-gray',
    detail: 'bg-medium-purple',
    card: 'bg-white',
    avatarBorder: 'border-medium-purple',
    primaryButton:
      'hover:bg-purple-hover border border-[#FAFAFA] md:border-[#633CFF] md:text-[#FAFAFA] md:bg-[#633CFF]',
    secondaryButton:
      'border text-[#633CFF] border-[#633CFF] bg-[#FAFAFA] hover:bg-purple-hover hover:bg-opacity-30',
    primaryText: 'text-dark-gray',
    secondaryText: 'text-medium-gray'
  },
  Coffee: {
    color: '#221003',
    header: 'bg-[#221003] md:bg-[#eee9de] text-white',
    wrapper: 'bg-[#eee9de] text-white',
    detail: 'bg-[#221003]',
    card: 'bg-[#f7f3ec]',
    avatarBorder: 'border-[#221003]',
    primaryButton:
      'hover:bg-opacity-70 border border-[#f7f3ec] bg-[#221003] md:border-[#221003] text-[#f7f3ec]',
    secondaryButton:
      'border hover:bg-opacity-70 bg-[#f7f3ec] md:bg-transparent border-[#221003] text-[#221003]',
    primaryText: 'text-[#221003]',
    secondaryText: 'text-[#221003]'
  },
  Midnight: {
    color: '#634777',
    header: 'bg-transparent md:bg-[#634777]',
    wrapper: 'bg-gradient-to-t from-[#462e5b] to-[#251b2d] text-white',
    detail: 'hidden',
    card: 'bg-[#634777]',
    avatarBorder: 'border-white',
    primaryButton:
      'hover:bg-opacity-70 bg-[#634777] md:bg-[#3d2b49] border-[#55356d] text-white',
    secondaryButton:
      'border hover:bg-[#55356d] hover:text-white bg-transparent border-white text-white',
    primaryText: 'text-white',
    secondaryText: 'text-white'
  },
  Dark: {
    color: '#292728',
    header: 'bg-transparent',
    wrapper: 'bg-[#191919]',
    detail: 'bg-[#141414]',
    card: 'bg-[#292728]',
    avatarBorder: 'border-[#e8e8e8]',
    primaryButton:
      'hover:bg-opacity-70 bg-[#292728] border-[#292728] text-[#e8e8e8]',
    secondaryButton:
      'border border-opacity-60 hover:bg-transparent hover:text-white bg-transparent border-[#e8e8e8] text-[#e8e8e8]',
    primaryText: 'text-[#e8e8e8]',
    secondaryText: 'text-[#e8e8e8]'
  },
  Ocean: {
    color: '#488587',
    header: 'bg-transparent md:bg-[#488587]',
    wrapper: 'bg-gradient-to-t from-[#207A7A] to-[#0C3133] text-white',
    detail: 'hidden',
    card: 'bg-[#488587]',
    avatarBorder: 'border-white',
    primaryButton:
      'hover:bg-opacity-70 bg-[#227882] md:bg-[#194C52] border-[#227882] text-white',
    secondaryButton:
      'border hover:bg-[#227882] hover:text-white bg-transparent border-white text-white',
    primaryText: 'text-white',
    secondaryText: 'text-white'
  },
  Gradient: {
    color: '#EAB560',
    header: 'bg-[#FFFFFF] text-[#2B3D40]',
    wrapper:
      'bg-gradient-to-l from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
    detail: 'hidden',
    card: 'bg-[#FFFFFF]',
    avatarBorder: 'border-[#2B3D40]',
    primaryButton:
      'hover:bg-opacity-80 bg-[#2B3D40] border-[#2B3D40] text-[#FFFFFF]',
    secondaryButton:
      'border border-[#2B3D40] bg-transparent text-[#2B3D40] hover:opacity-80',
    primaryText: 'text-[#2B3D40]',
    secondaryText: 'text-[#3E8E9C]'
  },
  Eclipse: {
    color: '#131928',
    header: 'bg-transparent d:bg-[#131928] text-[#F2DDCD] shadow-lg',
    wrapper: 'bg-[#0C101C] text-[#F2DDCD]',
    detail: 'hidden',
    card: 'bg-[#131928]',
    avatarBorder: 'border-[#F2DDCD]',
    primaryButton:
      'hover:bg-opacity-80 bg-[#F2DDCD] border-[#F2DDCD] text-[#0C101C]',
    secondaryButton:
      'border border-[#F2DDCD] bg-transparent text-[#F2DDCD] hover:opacity-80',
    primaryText: 'text-[#F2DDCD]',
    secondaryText: 'text-[#F2DDCD]'
  },
  Terracota: {
    color: '#A15E55',
    header: 'bg-[#A15E55] md:bg-[#eee9de] text-white',
    wrapper: 'bg-[#eee9de] text-white',
    detail: 'bg-[#A15E55]',
    card: 'bg-[#f7f3ec]',
    avatarBorder: 'border-[#633836]',
    primaryButton:
      'hover:bg-opacity-70 border border-[#f7f3ec] bg-[#633836] md:border-[#633836] text-[#f7f3ec]',
    secondaryButton:
      'border hover:bg-[#633836] hover:text-[#f7f3ec] bg-[#f7f3ec] md:bg-transparent border-[#633836] text-[#633836]',
    primaryText: 'text-[#633836]',
    secondaryText: 'text-[#633836]'
  }
};

export default function Shared({ userLinks, user, authUser }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOwner = authUser?.id === user.id;

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [currentTheme, setCurrentTheme] = useState(user.template || 'default');

  const styles = TEMPLATE_STYLES[currentTheme];

  const themes = Object.keys(TEMPLATE_STYLES).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    color: TEMPLATE_STYLES[key]?.color || '#633CFF',
    label: key.charAt(0).toUpperCase() + key.slice(1)
  }));

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      notyf?.success('Copied to clipboard!');
    } catch (err) {
      notyf?.success('An unexpected error ocurred.');
    }
  };

  const handleThemeSelect = async (themeName: string) => {
    try {
      setIsLoading(true);
      setCurrentTheme(themeName);

      const formData = new FormData();

      formData.append('template', themeName);

      formData.append('_method', 'PATCH');

      const response = await axios.post(
        route('profile.theme.update'),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (response.status === 200) {
        notyf?.success(response.data.message);
      }
    } catch (error) {
      notyf?.error('Failed to update theme');

      setCurrentTheme(user.template || 'default');

      console.error('Error updating theme:', error);
    } finally {
      setIsLoading(false);

      setShowThemeDropdown(false);
    }
  };

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Inertia.on('start', start);
    Inertia.on('finish', end);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowThemeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderLogo = () => (
    <div className="z-50 block mt-12 mb-0">
      <Link href="/">
        <img
          style={{ filter: 'saturate(0%) brightness(518%)' }}
          className="mb-6 scale-75 md:mt-0 md:mb-0"
          src={Logo}
          alt=""
        />
      </Link>
    </div>
  );

  const renderOwnerHeader = () => (
    <header className="z-50 w-full h-[78px] md:p-4 mb-16">
      <div
        className={`md:text-md text-sm flex min-550:flex-nowrap items-center justify-between gap-3 p-4 md:rounded-xl ${styles.header}`}
      >
        <button
          onClick={() => router.get(route('dashboard'))}
          className={`gap-2 h-[3rem] text-center max-w-[3rem] md:max-w-[8rem] disabled:cursor-not-allowed w-full inline-flex items-center justify-center rounded-lg px-4 py-3 text-md font-semibold transition duration-150 ease-in-out focus:outline-none ${styles.secondaryButton}`}
        >
          <FontAwesomeIcon icon={faBackward} />
          <p className="hidden text-center md:block">Go Back</p>
        </button>

        <div className="flex items-center justify-end w-full gap-3">
          <div className="relative z-[9999]" ref={dropdownRef}>
            <button
              onClick={() => setShowThemeDropdown(true)}
              className={`relative gap-2 text-center h-[3rem] max-w-[8rem] disabled:cursor-not-allowed w-full flex items-center justify-center rounded-lg px-4 py-3 text-md font-semibold transition duration-150 ease-in-out focus:outline-none ${styles.primaryButton}`}
            >
              <Layout size={24} />
              <p className="text-center">Theme</p>
            </button>
            {showThemeDropdown && (
              <DropdownTheme
                themes={themes}
                handleSelect={(themeName: string) =>
                  handleThemeSelect(themeName)
                }
              />
            )}
          </div>
          <button
            onClick={handleCopyLink}
            className={`gap-2 text-center h-[3rem] max-w-[8rem] disabled:cursor-not-allowed w-full inline-flex items-center justify-center rounded-lg px-4 py-3 text-md font-semibold transition duration-150 ease-in-out focus:outline-none ${styles.primaryButton}`}
          >
            <Copy size={24} />
            <p className="text-center">Share</p>
          </button>
        </div>
      </div>
    </header>
  );

  const renderAvatar = () =>
    user.avatar_url ? (
      <img
        className={`border-[3px] h-[7rem] rounded-full w-[7rem] ${styles.avatarBorder}`}
        src={`${user.avatar_url}`}
        alt=""
      />
    ) : (
      <div
        className={`flex items-center justify-center h-[7rem] w-[7rem] rounded-full border-4 ${styles.avatarBorder}`}
      >
        <img src={SmallLogo} />
      </div>
    );

  const renderLinks = () =>
    userLinks?.length > 0 ? (
      <div className={`w-[15rem] mt-10 overflow-y-auto flex flex-col gap-4`}>
        {userLinks?.map((link) => <LinkCard key={link.id} link={link} />)}
      </div>
    ) : (
      <div
        className={`w-[15rem] mt-10 justify-center items-center overflow-y-auto flex flex-col gap-4 ${styles.wrapper}`}
      >
        <p>There are no links yet.</p>
      </div>
    );

  return (
    <div
      className={`relative flex flex-col items-center min-h-screen md:pt-0 md:mt-0 sm:justify-center md:justify-start ${styles.wrapper}`}
    >
      <Head title="Shared" />
      {isLoading && <LoadingComponent hasOverlay />}

      {!isOwner && <>{renderLogo()}</>}

      {isOwner && renderOwnerHeader()}

      <div
        className={`block absolute top-0 right-0 w-full h-[18rem] md:h-[20rem] md:rounded-bl-3xl md:rounded-br-3xl z-10 ${styles.detail}`}
      />

      <div
        className={`z-[12] p-6 md:p-12 mb-20 shadow-lg sm:max-w-md md:w-[24rem] rounded-xl md:flex md:items-center md:justify-center md:mt-20 lg:mt-10 md:pb-20 ${styles.card}`}
      >
        <div className="flex flex-col items-center justify-center w-auto">
          {renderAvatar()}
          <h2 className={`text-[1.75rem] mt-4 font-bold ${styles.primaryText}`}>
            {user?.first_name} {user?.last_name}
          </h2>
          <p className={`text-md ${styles.secondaryText}`}>
            {user?.public_email}
          </p>
          {renderLinks()}
        </div>
      </div>
    </div>
  );
}
