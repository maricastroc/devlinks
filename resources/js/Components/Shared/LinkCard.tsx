import { UserLinkProps } from '@/types/user-link';
import clsx from 'clsx';
import { DEFAULT_THEME } from '@/utils/constants';
import { UserProps } from '@/types/user';
import { generateIconFilter } from '@/utils/generateIconFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBrandIconByName } from '@/utils/getBrandIconName';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

  const linkClassNames = clsx(
    'flex items-center justify-between p-[0.72rem] h-[2.97rem]',
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
        {link.platform.name.toLowerCase() && (
          <FontAwesomeIcon
            icon={getBrandIconByName(link.platform.name) as IconProp}
            className={
              isBigger ? 'w-[1.4rem] h-[1.4rem]' : 'w-[1.15rem] h-[1.15rem]'
            }
            style={{
              color: (user?.theme?.styles?.link_card as any)?.color || '#ffffff'
            }}
          />
        )}
        <p className="text-current text-md">
          {link?.custom_name || link?.platform?.name}
        </p>
      </div>
    </a>
  );
};
