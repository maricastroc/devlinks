import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LoadingComponent } from '@/Components/LoadingComponent';

import Logo from '/public/assets/images/logo-devlinks-large.svg';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import { Layout, Share } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { DropdownTheme } from '@/Components/DropdownTheme';
import axios from 'axios';
import { TemplateStyles } from '@/types/template-styles';
import { HeaderButton } from '@/Components/HeaderButton';
import toast from 'react-hot-toast';
import { LinkCard } from '@/Components/LinkCard';

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
    card: 'shadow-lg lg:shadow-xl bg-white',
    avatarBorder: 'border-medium-purple',
    primaryButton:
      'hover:bg-purple-hover border border-[#FAFAFA] md:border-[#633CFF] md:text-[#FAFAFA] md:bg-[#633CFF]',
    secondaryButton:
      'border text-[#633CFF] border-[#633CFF] bg-[#FAFAFA] hover:bg-purple-hover hover:bg-opacity-30',
    primaryText: 'text-dark-gray',
    secondaryText: 'text-medium-gray'
  },
  Lavender: {
    color: '#72659B',
    header: 'bg-transparent md:bg-[#FFFFFF] text-[#FFFFFF] md:bg-opacity-70',
    wrapper: 'bg-gradient-to-b from-[#72659B] to-[#EBA3AC] text-[#342B51]',
    detail: 'hidden',
    card: 'bg-transparent',
    avatarBorder: 'border-[#FFFFFF]',
    primaryButton:
      'bg-[#342B51] border-[#342B51] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:border-[#ffffff] hover:text-[#342B51]',
    secondaryButton:
      'border border-[#342B51] bg-transparent text-[#342B51] hover:bg-[#342B51] hover:border-[#342B51] hover:text-[#ffffff]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    backgroundLink: '#342B51'
  },
  Midnight: {
    color: '#C54D48',
    header: 'bg-transparent md:bg-[#FFFFFF] text-[#FFFFFF] md:bg-opacity-70',
    wrapper:
      'bg-gradient-to-b from-[#C54D48] via-[#383952] to-[#21303D] text-[#1C2431]',
    detail: 'hidden',
    card: 'bg-transparent',
    avatarBorder: '#FFFFFF',
    primaryButton:
      'border hover:bg-opacity-80 border-[#21303D] bg-[#21303D] text-[#FFFFFF] hover:text-[#21303D] hover:border-[#FFFFFF] hover:bg-[#FFFFFF]',
    secondaryButton:
      'border hover:bg-opacity-80 border-[#21303D] bg-[#21303D] text-[#FFFFFF] hover:text-[#21303D] hover:border-[#FFFFFF] hover:bg-[#FFFFFF]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    backgroundLink: '#C74C48'
  },
  Serenity: {
    color: '#C57248',
    header: 'bg-transparent md:bg-[#FFFFFF] text-[#FFFFFF] md:bg-opacity-70',
    wrapper:
      'bg-gradient-to-b from-[#C57248] via-[#4E4848] to-[#2D2D37] text-[#1C2431]',
    detail: 'hidden',
    card: 'bg-transparent',
    avatarBorder: 'border-[#FFFFFF]',
    primaryButton:
      'bg-[#1C2431] border-[#1C2431] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:border-[#ffffff] hover:text-[#1C2431]',
    secondaryButton:
      'border border-[#1C2431] bg-transparent text-[#1C2431] hover:bg-[#1C2431] hover:border-[#1C2431] hover:text-[#ffffff]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    backgroundLink: 'transparent',
    borderLink: '#ffffff'
  },
  Ocean: {
    color: '#478EA9',
    header: 'bg-transparent md:bg-[#FFFFFF] text-[#FFFFFF] md:bg-opacity-70',
    wrapper:
      'bg-gradient-to-b from-[#478EA9] via-[#C99F9A] to-[#E29042] text-[#1C2431]',
    detail: 'hidden',
    card: 'bg-transparent',
    avatarBorder: 'border-[#FFFFFF] border-opacity-70',
    primaryButton:
      'bg-[#1C2431] border-[#1C2431] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:border-[#ffffff] hover:text-[#1C2431]',
    secondaryButton:
      'border border-[#1C2431] bg-transparent text-[#1C2431] hover:bg-[#1C2431] hover:border-[#1C2431] hover:text-[#ffffff]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]',
    backgroundLink: '#1C2431'
  },
  Gradient: {
    color: '#EAB560',
    header: 'bg-transparent md:bg-[#FFFFFF] text-[#FFFFFF] md:bg-opacity-70',
    wrapper:
      'bg-gradient-to-b from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
    detail: 'hidden',
    card: 'bg-transparent',
    avatarBorder: 'border-[#ffffff] border-opacity-80',
    primaryButton:
      'border hover:bg-opacity-80 bg-[#2B3D40] border-[#2B3D40] text-[#FFFFFF] hover:bg-transparent hover:border-[#2B3D40] hover:text-[#2B3D40]',
    secondaryButton:
      'border border-[#2B3D40] bg-transparent text-[#2B3D40] hover:bg-[#2B3D40] hover:border-[#2B3D40] hover:text-[#ffffff]',
    primaryText: 'text-[#2B3D40]',
    secondaryText: 'text-[#2B3D40]',
    backgroundLink: '#2B3D40'
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
      toast?.success('Copied to clipboard!');
    } catch (err) {
      toast?.success('An unexpected error ocurred.');
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
        toast?.success(response.data.message);
      }
    } catch (error) {
      toast?.error('Failed to update theme');

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

  const renderOwnerHeader = () => {
    const buttonClasses = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton
    };

    return (
      <header className="z-50 w-full h-[78px] md:p-4 mb-10 md:mb-10">
        <div
          className={`text-md flex items-center justify-between gap-3 p-4 md:rounded-xl ${styles.header}`}
        >
          <HeaderButton
            onClick={() => router.get(route('dashboard'))}
            icon={<FontAwesomeIcon icon={faBackward} />}
            text="Go Back"
            className={buttonClasses.secondary}
            textVisibility="md-only"
          />

          <div className="flex items-center justify-end gap-3">
            <div className="relative z-[9999]" ref={dropdownRef}>
              <HeaderButton
                onClick={() => setShowThemeDropdown(true)}
                icon={<Layout size={24} />}
                text="Theme"
                className={buttonClasses.primary}
                textVisibility="always"
              />
              {showThemeDropdown && (
                <DropdownTheme
                  themes={themes}
                  handleSelect={(themeName: string) =>
                    handleThemeSelect(themeName)
                  }
                />
              )}
            </div>

            <HeaderButton
              onClick={handleCopyLink}
              icon={<Share size={24} />}
              text="Share"
              className={buttonClasses.primary}
              textVisibility="md-only"
            />
          </div>
        </div>
      </header>
    );
  };

  const renderAvatar = () =>
    user.avatar_url ? (
      <img
        className={`border-[4px] h-[7rem] rounded-full w-[7rem] ${styles.avatarBorder}`}
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
      <div className={`w-full md:w-[20rem] mt-10 flex flex-col gap-4`}>
        {userLinks?.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            backgroundLink={styles.backgroundLink || undefined}
            borderLink={styles.borderLink || undefined}
          />
        ))}
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
        className={`block absolute top-0 right-0 w-full h-[18rem] md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10 ${styles.detail}`}
      />

      <div
        className={`z-[12] p-6 lg:mb-30 md:p-10 md:mt-8 mb-20 w-[88vw] max-w-[22rem] md:max-w-[26rem] rounded-xl ${styles.card}`}
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
