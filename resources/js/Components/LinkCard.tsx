import { UserLinkProps } from '@/types/user-link';
import { ArrowRight } from 'phosphor-react';
import clsx from 'clsx';
import { DEFAULT_THEME } from '@/utils/constants';

type LinkCardProps = {
  link: UserLinkProps;
  backgroundLink?: string;
  currentTheme?: string;
  className?: string;
};

export const LinkCard = ({
  link,
  className,
  backgroundLink,
  currentTheme = DEFAULT_THEME
}: LinkCardProps) => {
  const isFrontendMentor = link.platform.name === 'Frontend Mentor';

  const isValidUrl = Boolean(link.url);

  const isDefaultTheme = currentTheme === DEFAULT_THEME;

  const linkClassNames = clsx(
    'flex items-center shadow-md justify-between p-[0.72rem] h-[2.95rem] rounded-md duration-150 transition-all',
    {
      'border border-gray-300': isFrontendMentor && isDefaultTheme,
      'disabled:cursor-not-allowed': !isValidUrl,
      'text-dark-gray': isFrontendMentor && isDefaultTheme,
      'text-white': !(isFrontendMentor && isDefaultTheme)
    }
  );

  const iconFilter =
    !isFrontendMentor || !isDefaultTheme ? 'saturate(0%) brightness(318%)' : '';

  const linkStyle = {
    backgroundColor: backgroundLink || link.platform.color
  };

  const arrowColor =
    isFrontendMentor && isDefaultTheme ? 'text-dark-gray' : 'text-white';

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidUrl) e.preventDefault();
  };

  return (
    <a
      href={isValidUrl ? `/click/${link.id}` : '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${linkClassNames} ${className}`}
      style={linkStyle}
    >
      <div className="flex items-center gap-2">
        {link.platform.icon_url && (
          <img
            src={`/assets/images/${link.platform.icon_url}`}
            alt={`${link.platform.name} icon`}
            style={{ filter: iconFilter }}
          />
        )}
        <p className="text-md">{link?.custom_name || link?.platform?.name}</p>
      </div>

      {link.platform?.name && <ArrowRight size={16} className={arrowColor} />}
    </a>
  );
};
