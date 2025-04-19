import { UserLinkProps } from '@/types/user-link';
import clsx from 'clsx';
import { DEFAULT_THEME } from '@/utils/constants';
import { UserProps } from '@/types/user';
import { generateIconFilter } from '@/utils/generateIconFilter';

type LinkCardProps = {
  link: UserLinkProps;
  className?: string;
  isBigger?: boolean;
  user: UserProps | undefined;
};

export const LinkCard = ({
  link,
  className,
  user,
  isBigger = false
}: LinkCardProps) => {
  const isValidUrl = Boolean(link.url);
  const isDefaultTheme = user?.theme?.name === DEFAULT_THEME;

  const linkStyle = {
    ...(isDefaultTheme
      ? {
          borderRadius: '16px',
          backgroundColor: link.platform.color,
          color: '#FFFFFF'
        }
      : typeof user?.theme?.styles?.link_card === 'object'
        ? user?.theme.styles.link_card
        : {})
  };

  const iconFilter = user?.theme?.styles?.icon
    ? generateIconFilter((user?.theme?.styles?.icon as any)?.color)
    : 'saturate(0%) brightness(318%)';

  const linkClassNames = clsx(
    'flex items-center justify-between p-[0.72rem] h-[2.97rem] rounded-[16px]',
    'transition-all duration-150',
    {
      'shadow-lg': !isDefaultTheme,
      'cursor-not-allowed opacity-75': !isValidUrl,
      'cursor-pointer': isValidUrl
    },
    className
  );

  return (
    <a
      href={isValidUrl ? `/click/${link.id}` : '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassNames}
      style={linkStyle}
      aria-disabled={!isValidUrl}
    >
      <div className="flex items-center gap-2">
        {link.platform.icon_url && (
          <img
            className={
              isBigger ? 'w-[1.4rem] h-[1.4rem]' : 'w-[1.15rem] h-[1.15rem]'
            }
            src={`/assets/images/${link.platform.icon_url}`}
            alt={link.platform.name}
            style={{ filter: iconFilter }}
          />
        )}
        <p className="text-current text-md">
          {link?.custom_name || link?.platform?.name}
        </p>
      </div>
    </a>
  );
};
