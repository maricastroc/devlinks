import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';
import { AvatarCard } from '@/Pages/Shared/partials/AvatarCard';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { DEFAULT_THEME } from '@/utils/constants';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import { TemplateStyles } from '@/types/template-styles';
import { LoadingComponent } from '@/Components/LoadingComponent';
import { OwnerHeader } from './partials/OwnerHeader';
import { LinkList } from './partials/LinkList';

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
    background: 'bg-[#0000] text-dark-gray',
    button: 'text-white md:text-[#633CFF] md:hover:bg-[#633CFF]',
    primaryText: 'text-dark-gray',
    secondaryText: 'text-medium-gray'
  },
  Lavender: {
    color: '#72659B',
    background: 'bg-gradient-to-b from-[#72659B] to-[#EBA3AC] text-[#342B51]',
    button: 'text-[#ffffff] md:text-[#5E4E8B] hover:bg-[#5E4E8B]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    linkCard: '#5E4E8B'
  },
  Midnight: {
    color: '#C54D48',
    background:
      'bg-gradient-to-b from-[#C54D48] via-[#383952] to-[#21303D] text-[#1C2431]',
    button: 'text-[#ffffff] md:text-[#C74C48] hover:bg-[#C74C48]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    linkCard: '#C74C48'
  },
  Serenity: {
    color: '#C55A48',
    background:
      'bg-gradient-to-b from-[#C57248] via-[#4E4848] to-[#2D2D37] text-[#1C2431]',
    button: 'text-[#ffffff] md:text-[#C55A48] hover:bg-[#C55A48]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    linkCard: '#C55A48'
  },
  Ocean: {
    color: '#478EA9',
    background:
      'bg-gradient-to-b from-[#478EA9] via-[#C99F9A] to-[#E29042] text-[#1C2431]',
    button: 'text-[#ffffff] md:text-[#2A5F7A] hover:bg-[#2A5F7A]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]',
    linkCard: '#2A5F7A'
  },
  Gradient: {
    color: '#EAB560',
    background:
      'bg-gradient-to-b from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
    button: 'text-[#ffffff] md:text-[#2A5F7A] hover:bg-[#2A5F7A]',
    primaryText: 'text-[#2B3D40]',
    secondaryText: 'text-[#2B3D40]',
    linkCard: 'rgba(42, 95, 122, 0.85)'
  }
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
      className={`relative flex flex-col items-center min-h-screen md:pt-0 md:mt-0 sm:justify-center md:justify-start ${styles.background}`}
    >
      <Head title="Shared" />
      {isLoading && <LoadingComponent hasOverlay />}

      {!isOwner ? (
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
      ) : (
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
        className={`block absolute top-0 right-0 w-full h-[18rem] md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10 ${isDefaultTheme && 'bg-medium-purple'}`}
      />

      <div
        className={`z-[12] p-6 lg:mb-30 md:p-10 md:mt-8 mb-20 w-[88vw] max-w-[22rem] md:max-w-[26rem] rounded-xl 
  ${!isDefaultTheme ? 'backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg' : 'bg-white shadow-2xl'}`}
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
    </div>
  );
}
