import PhoneMockupIllustration from '/public/assets/images/illustration-phone-mockup.svg';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LinkCard } from './LinkCard';
import { PhoneIllustration } from './PhoneIllustration';
import { useTheme } from '@/contexts/ThemeContext';
import { DEFAULT_THEME } from '@/utils/constants';
import { AvatarCard } from '@/Pages/Shared/partials/AvatarCard';

type Props = {
  links: UserLinkProps[];
  user?: UserProps;
  photoPreview?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  publicEmail?: string | null;
};

export const PhoneMockup = ({
  user,
  photoPreview,
  firstName,
  lastName,
  publicEmail,
  links
}: Props) => {
  const { currentTheme } = useTheme();

  const isDefaultTheme = currentTheme?.name === DEFAULT_THEME;

  return (
    <div className="w-[307px] h-[631px] relative">
      <PhoneIllustration
        user={user}
        firstName={firstName}
        lastName={lastName}
        publicEmail={publicEmail}
      />
      {(photoPreview || user?.avatar_url) && currentTheme && (
        <AvatarCard
          isSharedScreen={false}
          avatarUrl={photoPreview || (user?.avatar_url as string)}
          theme={currentTheme}
          className="absolute rounded-full bg-opacity-20 h-[6.05rem] w-[6.05rem] z-40 top-[3.9rem] left-[6.5rem] bg-cover bg-center"
        />
      )}

      {(firstName || user?.first_name) && (
        <div
          className={`font-bold w-[17.2rem] text-center absolute z-40 top-[11.3rem] left-[1rem] bg-cover bg-center ${isDefaultTheme ? 'bg-white' : 'bg-transparent'}`}
        >
          <p className={`${currentTheme?.styles.secondary_text}`}>
            {firstName || user?.first_name} {lastName || user?.last_name}
          </p>
        </div>
      )}

      {(publicEmail || user?.public_email) && (
        <div
          className={`text-sm w-[17.2rem] text-center absolute  z-40 top-[12.8rem] left-[1rem] bg-cover bg-center ${isDefaultTheme ? 'bg-white' : 'bg-transparent'}`}
        >
          <p className={`${currentTheme?.styles.secondary_text}`}>
            {publicEmail || user?.public_email}
          </p>
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
