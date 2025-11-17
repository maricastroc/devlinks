import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { PHONE_DIMENSIONS } from '@/utils/constants';
import { PhoneIllustration } from '../PhoneIllustration';
import { PhoneSkeleton } from '../PhoneSkeleton';
import { UserContent } from './partials/UserContent';

export type PhoneMockupProps = {
  user?: UserProps;
  links?: UserLinkProps[];
  socialLinks?: UserLinkProps[];
  isLoading?: boolean;

  previewData?: {
    photo?: string | null;
    name?: string | null;
    bio?: string | null;
    username?: string;
  };
};

export const PhoneMockup = ({
  user,
  links,
  socialLinks,
  isLoading = false,
  previewData
}: PhoneMockupProps) => {
  return (
    <div
      className="relative font-sans align-middle lg:scale-100"
      style={{
        width: PHONE_DIMENSIONS.width,
        height: PHONE_DIMENSIONS.height
      }}
    >
      <div className="absolute inset-0 rounded-[2rem] z-30 pointer-events-none" />

      <PhoneIllustration />

      {isLoading ? (
        <PhoneSkeleton />
      ) : (
        <UserContent
          user={user}
          previewData={previewData}
          links={links}
          socialLinks={socialLinks}
        />
      )}
    </div>
  );
};
