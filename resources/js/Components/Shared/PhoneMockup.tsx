import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LinkCard } from './LinkCard';
import { PhoneIllustration } from './PhoneIllustration';
import { useTheme } from '@/contexts/ThemeContext';
import { DEFAULT_THEME } from '@/utils/constants';
import { AvatarCard } from '@/Components/Shared/AvatarCard';
import { SocialLink } from './SocialLink';

type Props = {
  links: UserLinkProps[] | undefined;
  socialLinks?: UserLinkProps[] | undefined;
  user?: UserProps;
  photoPreview?: string | null;
  name?: string | null;
  isLoading?: boolean;
};

export const PhoneMockup = ({
  user,
  photoPreview,
  name,
  links,
  socialLinks
}: Props) => {
  const { currentTheme } = useTheme();

  const isDefaultTheme = currentTheme?.name === DEFAULT_THEME;

  const userSocialLinks = socialLinks || user?.social_links;

  return (
    <div className="w-[307px] h-[631px] relative">
      <PhoneIllustration
        links={links}
        user={user}
        name={name}
        socialLinks={socialLinks}
      />

      {(photoPreview || user?.avatar_url) && currentTheme && (
        <AvatarCard
          isPublicPage={false}
          avatarUrl={photoPreview || (user?.avatar_url as string)}
          theme={currentTheme}
          className="absolute rounded-full bg-opacity-20 h-[6.02rem] w-[6.02rem] z-40 top-[3.9rem] left-[6.5rem] bg-cover bg-center"
        />
      )}

      {(name || user?.name) && (
        <div
          className={`font-bold w-[17.2rem] text-center absolute z-40 top-[11.3rem] left-[1rem] bg-cover bg-center ${isDefaultTheme ? 'bg-white' : 'bg-transparent'}`}
        >
          <p className={`${currentTheme?.styles.primary_text}`}>
            {name || user?.name}
          </p>
        </div>
      )}

      {userSocialLinks && (
        <div
          className={`flex gap-2 items-center justify-center font-bold w-[17.2rem] text-center absolute z-40 top-[13.2rem] left-[1rem] bg-cover bg-center ${isDefaultTheme ? 'bg-white' : 'bg-transparent'}`}
        >
          {userSocialLinks?.map((link) => {
            return (
              <SocialLink
                isSmaller
                link={link}
                isDefaultTheme={isDefaultTheme}
              />
            );
          })}
        </div>
      )}

      <div className="relative">
        <div
          className="max-h-[300px] left-[1.3rem] overflow-y-scroll absolute flex flex-col items-center justify-start w-[15.9rem] custom-scrollbar m-4 top-[-23.1rem] mr-[-8px]" /* -mr-2 empurra a scrollbar para fora */
        >
          <div className="w-full flex flex-col gap-[0.98rem] pr-2">
            {' '}
            {links?.map((link) => <LinkCard key={link.id} link={link} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
