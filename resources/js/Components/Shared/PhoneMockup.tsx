import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LinkCard } from './LinkCard';
import { PhoneIllustration } from './PhoneIllustration';
import { useTheme } from '@/contexts/ThemeContext';
import { AvatarCard } from '@/Components/Shared/AvatarCard';
import { SocialLink } from './SocialLink';
import { PhoneSkeleton } from './PhoneSkeleton';
import { getInitials } from '@/utils/getInitials';
import { ThemeProps } from '@/types/theme';
import { useEffect, useState } from 'react';

type Props = {
  links: UserLinkProps[] | undefined;
  socialLinks?: UserLinkProps[] | undefined;
  user?: UserProps;
  username?: string;
  photoPreview?: string | null;
  name?: string | null;
  bio?: string | null;
  isLoading?: boolean;
  isSmaller?: boolean;
};

export const PhoneMockup = ({
  user,
  username,
  photoPreview,
  name,
  bio,
  links,
  isLoading,
  isSmaller = false,
  socialLinks
}: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeProps | null>(
    user?.theme || null
  );

  const userSocialLinks = socialLinks || user?.social_links;

  useEffect(() => {
    if (user) {
      setCurrentTheme(user?.theme || null);
    }
  }, [user]);

  return (
    <div
      className={`scale-[85%] lg:scale-[100%] font-${user?.custom_font || 'sans'} relative scale-100 align-middle ${isSmaller ? 'w-[280px] h-[480px]' : 'w-[307px] h-[631px]'}`}
    >
      <div className="absolute inset-0 align-center rounded-[2rem] z-30 pointer-events-none" />

      <PhoneIllustration isSmaller={isSmaller} user={user} />

      {isLoading ? (
        <PhoneSkeleton isSmaller={isSmaller} />
      ) : (
        <>
          <div
            style={currentTheme?.styles.avatar as React.CSSProperties}
            className={`absolute rounded-full h-[6.02rem] w-[6.02rem] z-40 top-[3.9rem] ${isSmaller ? 'left-[5.5rem]' : 'left-[6.5rem]'} flex items-center justify-center bg-gray-200`}
          >
            {photoPreview || user?.avatar_url ? (
              <AvatarCard
                isPublicPage={false}
                avatarUrl={photoPreview || (user?.avatar_url as string)}
                theme={currentTheme as ThemeProps}
                user={user}
                username={username}
                className="w-full h-full bg-center bg-cover rounded-full bg-opacity-20"
              />
            ) : (
              <span
                style={currentTheme?.styles.avatar as React.CSSProperties}
                className="text-3xl font-bold text-gray-600"
              >
                {getInitials(username || user?.username)}
              </span>
            )}
          </div>

          <div
            className={`absolute z-40 top-[11rem] ${isSmaller ? 'left-[0.7rem]' : 'left-[1rem]'}`}
          >
            {(name || user?.username) && (
              <div
                className={`font-bold text-center ${isSmaller ? ' w-[15.5rem]' : ' w-[17.2rem]'}`}
              >
                <p
                  style={
                    user?.theme?.styles.secondary_text as React.CSSProperties
                  }
                >
                  {name || `@${user?.username}`}
                </p>
              </div>
            )}

            {bio && bio?.length > 0 && (
              <div
                className={`${isSmaller ? ' w-[15.5rem]' : ' w-[17.2rem]'} text-center mt-1`}
              >
                <p
                  className={`text-sm`}
                  style={
                    user?.theme?.styles.secondary_text as React.CSSProperties
                  }
                >
                  {bio}
                </p>
              </div>
            )}

            {userSocialLinks && (
              <div className="z-40 flex items-center justify-center gap-2 mt-4">
                {userSocialLinks?.map((link) => (
                  <SocialLink
                    key={link.id}
                    isSmaller
                    link={link}
                    theme={user?.theme as ThemeProps}
                  />
                ))}
              </div>
            )}

            <div className="relative">
              <div
                className={`mt-6 overflow-y-scroll flex flex-col items-center justify-start ${isSmaller ? 'w-[15rem] max-h-[150px]' : 'w-[16.5rem] max-h-[300px]'} custom-scrollbar mr-[-8px] m-4`}
              >
                <div className="w-full flex flex-col gap-[0.98rem] pr-2">
                  {links?.map((link) => (
                    <LinkCard user={user} key={link.id} link={link} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
