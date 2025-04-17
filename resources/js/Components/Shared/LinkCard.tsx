import { UserLinkProps } from '@/types/user-link';
import { ArrowRight } from 'phosphor-react';
import clsx from 'clsx';
import { DEFAULT_THEME } from '@/utils/constants';
import { useTheme } from '@/contexts/ThemeContext';

type LinkCardProps = {
  link: UserLinkProps;
  className?: string;
  isBigger?: boolean;
};

export const LinkCard = ({
  link,
  className,
  isBigger = false
}: LinkCardProps) => {
  const { currentTheme } = useTheme();

  const isValidUrl = Boolean(link.url);

  const isDefaultTheme = currentTheme?.name === DEFAULT_THEME;

  const linkClassNames = clsx(
    'flex items-center justify-between text-white p-[0.72rem] h-[2.97rem] rounded-md duration-150 transition-all',
    {
      'shadow-lg': !isDefaultTheme,
      'disabled:cursor-not-allowed': !isValidUrl
    }
  );

  const iconFilter = 'saturate(0%) brightness(318%)';

  const linkStyle = {
    backgroundColor: isDefaultTheme
      ? link.platform.color
      : currentTheme?.styles.link_card
  };

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
            className={`${isBigger ? 'w-[1.4rem] h-[1.4rem]' : 'w-4 h-4'}`}
            src={`/assets/images/${link.platform.icon_url}`}
            alt={`${link.platform.name} icon`}
            style={{ filter: iconFilter }}
          />
        )}
        <p className="text-md">{link?.custom_name || link?.platform?.name}</p>
      </div>
    </a>
  );
};
