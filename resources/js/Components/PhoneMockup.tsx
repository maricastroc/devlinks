import PhoneMockupIllustration from '/public/assets/images/illustration-phone-mockup.svg';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LinkCard } from './LinkCard';

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
  return (
    <div className="w-[307px] h-[631px] relative">
      <img src={PhoneMockupIllustration} alt="Phone mockup" />
      {(photoPreview || user?.avatar_url) && (
        <div
          style={{
            backgroundImage: `url(${photoPreview || user?.avatar_url})`
          }}
          className="absolute border-4 border-medium-purple rounded-full bg-opacity-20 h-[6.1rem] w-[6.1rem] z-40 top-[4rem] left-[6.5rem] bg-cover bg-center"
        />
      )}

      {(firstName || user?.first_name) && (
        <div className="font-bold w-[17.2rem] text-center absolute bg-white z-40 top-[11.3rem] left-[1rem] bg-cover bg-center">
          <p>
            {firstName || user?.first_name} {lastName || user?.last_name}
          </p>
        </div>
      )}

      {(publicEmail || user?.public_email) && (
        <div className="text-sm w-[17.2rem] text-center absolute bg-white z-40 top-[12.8rem] left-[1rem] bg-cover bg-center">
          <p>{publicEmail || user?.public_email}</p>
        </div>
      )}

      <div className="relative">
        <div
          className="max-h-[300px] left-[1.3rem] overflow-y-scroll absolute flex flex-col items-center justify-start w-[15.9rem] custom-scrollbar m-4 top-[-23.1rem] mr-[-8px]" /* -mr-2 empurra a scrollbar para fora */
        >
          <div className="w-full flex flex-col gap-[0.98rem] pr-2">
            {' '}
            {/* Compensa o espaço */}
            {links?.map((link) => <LinkCard key={link.id} link={link} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
