import { UserLinkProps } from '@/types/user-link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBrandIconByName } from '@/utils/getBrandIconName';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
  const isValidUrl = Boolean(link.url);

  const linkStyle = {
    borderRadius: '8px',
    backgroundColor: link.platform.color,
    color: '#FFFFFF'
  };

  const linkClassNames = clsx(
    'flex items-center justify-between p-[0.72rem] h-[2.97rem]',
    'transition-all duration-150',
    {
      'cursor-not-allowed opacity-75': !isValidUrl,
      'cursor-pointer': isValidUrl,
      'h-[3.5rem]': isBigger
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
              color: '#ffffff'
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
