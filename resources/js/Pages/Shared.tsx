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
import { Copy, Layout, Share } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { DropdownTheme } from '@/Components/DropdownTheme';
import axios from 'axios';
import { TemplateStyles } from '@/types/template-styles';
import { HeaderButton } from '@/Components/HeaderButton';
import { TEMPLATE_STYLES } from '@/utils/constants';

type Props = {
  userLinks: UserLinkProps[];
  user: UserProps;
  authUser: UserProps | null;
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

  const renderOwnerHeader = () => {
    const buttonClasses = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton
    };

    return (
      <header className="z-50 w-full h-[78px] md:p-4 mb-16 md:mb-10">
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
      <div
        className={`w-[15rem] max-h-[15rem] custom-scrollbar overflow-y-scroll md:w-[20rem] mt-10 flex flex-col gap-4`}
      >
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
        className={`block absolute top-0 right-0 w-full h-[18rem] md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10 ${styles.detail}`}
      />

      <div
        className={`z-[12] p-6 lg:mb-30 md:p-10 md:mt-8 mb-20 shadow-lg lg:shadow-xl sm:max-w-md md:w-[26rem] rounded-xl ${styles.card}`}
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
