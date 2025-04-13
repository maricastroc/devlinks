import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';
import { AvatarCard } from '@/Pages/Shared/partials/AvatarCard';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { DEFAULT_THEME } from '@/utils/constants';
import { LoadingComponent } from '@/Components/LoadingComponent';
import { OwnerHeader } from './partials/OwnerHeader';
import { LinkList } from './partials/LinkList';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import { ThemeProps } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickOutside } from '@/utils/useClickOutside';

type Props = {
  userLinks: UserLinkProps[];
  user: UserProps;
  themes: ThemeProps[];
  authUser: UserProps | null;
};

export default function Shared({ userLinks, user, themes, authUser }: Props) {
  const isOwner = authUser?.id === user.id;

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setShowThemeDropdown(false);
  });

  const [isLoading, setIsLoading] = useState(false);

  const { currentTheme, handleChangeTheme } = useTheme();

  const isDefaultTheme = currentTheme?.name === DEFAULT_THEME;

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast?.success('Copied to clipboard!');
    } catch (err) {
      toast?.success('An unexpected error ocurred.');
    }
  };

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Inertia.on('start', start);
    Inertia.on('finish', end);
  }, []);

  useEffect(() => {
    if (user) {
      if (user?.theme) {
        handleChangeTheme(user.theme);
      } else {
        const defaultTheme = themes.find((theme) => {
          return theme.name === DEFAULT_THEME;
        });

        handleChangeTheme(defaultTheme as ThemeProps);
      }
    }
  }, [user?.theme]);

  return (
    currentTheme && (
      <div
        className={`relative flex flex-col items-center min-h-screen
      md:pt-0 md:mt-0 sm:justify-center md:justify-start ${currentTheme.styles.background}`}
      >
        <Head title="Shared" />
        {isLoading && <LoadingComponent hasOverlay />}

        {isOwner && (
          <OwnerHeader
            onCopyLink={handleCopyLink}
            showThemeDropdown={showThemeDropdown}
            setShowThemeDropdown={setShowThemeDropdown}
            dropdownRef={dropdownRef}
            themes={themes}
          />
        )}

        <div
          className={`block absolute top-0 right-0 w-full h-[18rem]
          md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10
          ${isDefaultTheme && 'bg-medium-purple'}`}
        />

        <div
          className={`z-[12] p-6 px-4 lg:mb-30 md:p-10 mb-10 w-[90vw]
          max-w-[35rem] rounded-xl ${isDefaultTheme ? 'bg-white shadow-lg' : 'md:backdrop-blur-xs md:bg-white/5 md:shadow-lg'} ${!isOwner ? 'mt-12 md:mt-20' : 'mt-[-1.75rem] md:mt-10'}`}
        >
          <div className="flex flex-col items-center justify-center w-auto">
            <AvatarCard
              avatarUrl={user.avatar_url as string}
              theme={currentTheme}
            />
            <h2
              className={`text-[1.75rem] mt-4 font-bold ${currentTheme.styles.primary_text}`}
            >
              {user?.first_name} {user?.last_name}
            </h2>
            <p
              className={`text-md no-underline ${currentTheme.styles.secondary_text}`}
            >
              {user?.public_email}
            </p>

            <LinkList links={userLinks} currentTheme={currentTheme} />
          </div>
        </div>
        {!isOwner && (
          <Link
            href={route('login')}
            className="mb-10 md:mb-16 flex gap-1 items-center justify-center bg-white rounded-full text-[#000000] p-2 px-5 font-semibold shadow-md"
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
    )
  );
}
