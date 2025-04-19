import { ThemeProps } from '@/types/theme';
import { UserLinkProps } from '@/types/user-link';
import { LIGHT_THEME } from '@/utils/constants';
import { convertHexToRGBA } from '@/utils/convertHexToRgba';
import { getBrandIconByName } from '@/utils/getBrandIconName';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  link: UserLinkProps;
  theme: ThemeProps | undefined;
  isSmaller?: boolean;
};

export const SocialLink = ({ link, theme, isSmaller }: Props) => {
  const bg = (theme?.styles?.link_card as any)?.backgroundColor || '';

  return (
    <a
      key={link.id}
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${isSmaller ? 'w-[2.2rem] h-[2.2rem]' : 'p-2'} 
        ${
          theme?.type === LIGHT_THEME
            ? 'bg-gray-600 bg-opacity-10'
            : 'bg-white bg-opacity-10'
        }
        flex items-center justify-center rounded-full transition-all hover:scale-110 bg-opacity-10
      `}
      title={link.platform.name}
      style={{ backgroundColor: convertHexToRGBA(bg, 0.5) }}
    >
      {link.platform.name.toLowerCase() && (
        <FontAwesomeIcon
          icon={getBrandIconByName(link.platform.name) as IconProp}
          className={`${isSmaller ? 'w-[1.3rem] h-[1.3rem]' : 'w-6 h-6'}`}
          style={{
            color: (theme?.styles?.icon as any)?.color || '#ffffff'
          }}
        />
      )}
    </a>
  );
};
