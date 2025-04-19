import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import toast from 'react-hot-toast';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import { AvatarCard } from '@/Components/Shared/AvatarCard';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { SocialLink } from '@/Components/Shared/SocialLink';
import { OwnerHeader } from './partials/OwnerHeader';
import { LinkList } from './partials/LinkList';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { ThemeProps } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickOutside } from '@/utils/useClickOutside';
import { useThemeEffect } from '@/utils/useThemeEffect';
import { useLoadingIndicator } from '@/utils/useLoadingIndicator';

type Props = {
  socialLinks: UserLinkProps[];
  userLinks: UserLinkProps[];
  user: UserProps;
  username: string;
  themes: ThemeProps[];
  authUser: UserProps | null;
};

export default function Shared({
  userLinks,
  user,
  username,
  themes,
  socialLinks,
  authUser
}: Props) {
  const isOwner = authUser?.id && authUser?.id === user.id;

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { currentTheme, handleChangeTheme } = useTheme();

  const dropdownRef = useClickOutside(() => {
    setShowThemeDropdown(false);
  });

  useLoadingIndicator(setIsLoading);

  useThemeEffect({
    user,
    themes,
    handleChangeTheme
  });

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast?.success('Copied to clipboard!');
    } catch (err) {
      toast?.success('An unexpected error ocurred.');
    }
  };

  return (
    currentTheme && (
      <div
        style={currentTheme.styles.background as React.CSSProperties}
        className={`relative flex flex-col min-h-screen`}
      >
        <Head title="Shared" />
        {isLoading && <LoadingComponent hasOverlay />}

        {isOwner && <OwnerHeader onCopyLink={handleCopyLink} />}

        <div
          className={`block absolute top-0 right-0 w-full h-[18rem] md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10`}
        />

        <div
          className={`flex flex-col flex-grow items-center justify-start z-[12] p-6 px-4 ${isOwner ? 'md:p-10 md:py-2 mb-12' : 'md:p-10 md:py-16'} w-[90vw] max-w-[35rem] mx-auto`}
        >
          <div className="flex flex-col items-center justify-center w-full text-center">
            <AvatarCard
              avatarUrl={user.avatar_url as string}
              user={user}
              username={username}
              theme={currentTheme}
            />
            <h2
              style={currentTheme.styles.primary_text as React.CSSProperties}
              className={`text-[1.25rem] mt-4 font-bold`}
            >
              {user?.name}
            </h2>
            <p
              className={`mt-1`}
              style={currentTheme.styles.secondary_text as React.CSSProperties}
            >
              {user?.bio}
            </p>
            {socialLinks?.length > 0 && (
              <div className="flex justify-center gap-3 mt-4">
                {socialLinks.map((link) => (
                  <SocialLink link={link} theme={currentTheme} />
                ))}
              </div>
            )}
            <LinkList
              user={user}
              links={userLinks}
              currentTheme={currentTheme}
            />
          </div>
        </div>

        {!isOwner && (
          <div className=" bottom-0 w-full pb-6 z-[12] flex justify-center">
            <Link
              href={route('login')}
              className="flex gap-1 items-center bg-opacity-70 justify-center bg-white rounded-full text-[#000000] p-2 px-5 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={SmallLogo}
                alt="Default Logo"
                style={{
                  filter: 'saturate(0%) brightness(0%)',
                  scale: '0.8'
                }}
              />
              join devlinks
            </Link>
          </div>
        )}
      </div>
    )
  );
}
