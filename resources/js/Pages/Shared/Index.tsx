import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';
import { AvatarCard } from '@/Pages/Shared/partials/AvatarCard';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { DEFAULT_THEME, TEMPLATE_STYLES } from '@/utils/constants';
import { LoadingComponent } from '@/Components/LoadingComponent';
import { OwnerHeader } from './partials/OwnerHeader';
import { LinkList } from './partials/LinkList';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';

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

  const [currentTheme, setCurrentTheme] = useState(
    user.template || DEFAULT_THEME
  );

  const styles = TEMPLATE_STYLES[currentTheme];

  const isDefaultTheme = currentTheme === DEFAULT_THEME;

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

      setCurrentTheme(user.template || DEFAULT_THEME);

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

  return (
    <div
      className={`relative flex flex-col items-center min-h-screen
      md:pt-0 md:mt-0 sm:justify-center md:justify-start ${styles.background}`}
    >
      <Head title="Shared" />
      {isLoading && <LoadingComponent hasOverlay />}

      {isOwner && (
        <OwnerHeader
          styles={styles}
          onCopyLink={handleCopyLink}
          onSelectTheme={handleThemeSelect}
          showThemeDropdown={showThemeDropdown}
          setShowThemeDropdown={setShowThemeDropdown}
          dropdownRef={dropdownRef}
          themes={themes}
          currentTheme={currentTheme}
        />
      )}

      <div
        className={`block absolute top-0 right-0 w-full h-[18rem]
          md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10
          ${isDefaultTheme && 'bg-medium-purple'}`}
      />

      <div
        className={`z-[12] p-6 px-4 lg:mb-30 md:p-10 mb-10 w-[90vw]
          max-w-[35rem] rounded-xl ${isDefaultTheme ? 'bg-white shadow-lg' : 'backdrop-blur-xs bg-white/5 shadow-lg'} ${!isOwner ? 'mt-12 md:mt-20' : 'mt-[-1.75rem] md:mt-10'}`}
      >
        <div className="flex flex-col items-center justify-center w-auto">
          <AvatarCard
            avatarUrl={user.avatar_url as string}
            theme={currentTheme}
          />
          <h2 className={`text-[1.75rem] mt-4 font-bold ${styles.primaryText}`}>
            {user?.first_name} {user?.last_name}
          </h2>
          <p className={`text-md ${styles.secondaryText}`}>
            {user?.public_email}
          </p>

          <LinkList
            links={userLinks}
            currentTheme={currentTheme}
            styles={styles}
          />
        </div>
      </div>
      {!isOwner && (
        <Link
          href={route('login')}
          className="flex gap-1 items-center justify-center bg-white rounded-full text-[#000000] p-2 px-5 font-semibold shadow-md"
        >
          <img
            src={SmallLogo}
            alt="Default Logo"
            style={{ filter: 'saturate(0%) brightness(0%)', scale: '0.8' }}
          />
          join devlinks
        </Link>
      )}
    </div>
  );
}
