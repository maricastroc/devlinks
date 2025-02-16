import { PlatformProps } from '@/types/platform';
import { ArrowRight } from 'phosphor-react';
import PhoneMockupIllustration from '/public/assets/images/illustration-phone-mockup.svg';
import { UserLinkProps } from '@/types/user-link';
import clsx from 'clsx';

type Props = {
  links: UserLinkProps[];
};

const LinkCard = ({ link }: { link: UserLinkProps }) => {
  const isFrontendMentor = link.platform.name === 'Frontend Mentor';

  const isValidUrl = link.url && link.url !== '';

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidUrl) e.preventDefault();
  };

  return (
    <a
      key={link.id}
      href={isValidUrl ? (link.url as string) : '#'}
      target="_blank"
      onClick={handleClick}
      className={clsx(
        'flex items-center justify-between p-[0.72rem] rounded-md duration-150 transition-all',
        { 'border border-gray-300': isFrontendMentor },
        { 'disabled:cursor-not-allowed': !isValidUrl },
        isFrontendMentor ? 'text-dark-gray' : 'text-white'
      )}
      style={{ backgroundColor: link.platform.color }}
    >
      <div className="flex items-center gap-2">
        {link.platform.icon_url && (
          <img
            src={`/assets/images/${link.platform.icon_url}-white.svg`}
            alt={`${link.platform.name} icon`}
          />
        )}
        <p className="text-md">{link.platform.name}</p>
      </div>
      <ArrowRight
        size={16}
        className={clsx(isFrontendMentor ? 'text-dark-gray' : 'text-white')}
      />
    </a>
  );
};

export const PhoneMockup = ({ links }: Props) => {
  return (
    <div className="w-[307px] h-[631px] relative">
      <img src={PhoneMockupIllustration} alt="Phone mockup" />
      <div className="max-h-[300px] left-[1.05rem] overflow-y-auto bg-red absolute flex flex-col items-center justify-center w-[15.1rem] m-4 top-[16.4rem]">
        <div className="w-full overflow-y-auto flex flex-col gap-[0.98rem]">
          {links?.map(
            (link) =>
              link.platform_id !== -1 && <LinkCard key={link.id} link={link} />
          )}
        </div>
      </div>
    </div>
  );
};
