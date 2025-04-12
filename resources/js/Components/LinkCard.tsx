import { UserLinkProps } from '@/types/user-link';
import { ArrowRight } from 'phosphor-react';
import clsx from 'clsx';

export const LinkCard = ({
  link,
  backgroundLink,
  borderLink
}: {
  link: UserLinkProps;
  backgroundLink?: string;
  borderLink?: string;
}) => {
  const isFrontendMentor = link.platform.name === 'Frontend Mentor';

  const isValidUrl = link.url && link.url !== '';

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidUrl) e.preventDefault();
  };

  return (
    <a
      key={link.id}
      href={isValidUrl ? `/click/${link.id}` : '#'}
      target="_blank"
      onClick={handleClick}
      className={clsx(
        'flex items-center justify-between p-[0.72rem] h-[2.95rem] rounded-md duration-150 transition-all',
        { 'border border-gray-300': isFrontendMentor },
        { 'disabled:cursor-not-allowed': !isValidUrl },
        isFrontendMentor ? 'text-dark-gray' : 'text-white'
      )}
      style={{
        backgroundColor: backgroundLink ? backgroundLink : link.platform.color,
        border: borderLink ? `1px solid ${borderLink}` : ''
      }}
    >
      <div className="flex items-center gap-2">
        {link.platform.icon_url && (
          <img
            src={`/assets/images/${link.platform.icon_url}`}
            alt={`${link.platform.name} icon`}
            style={{
              filter: `${!isFrontendMentor ? 'saturate(0%) brightness(318%)' : ''}`
            }}
          />
        )}
        <p className="text-md">{link.platform.name}</p>
      </div>
      {link.platform?.name && (
        <ArrowRight
          size={16}
          className={clsx(isFrontendMentor ? 'text-dark-gray' : 'text-white')}
        />
      )}
    </a>
  );
};
