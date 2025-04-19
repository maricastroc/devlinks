import { ThemeProps } from '@/types/theme';
import { UserLinkProps } from '@/types/user-link';
import { LIGHT_THEME } from '@/utils/constants';
import { generateIconFilter } from '@/utils/generateIconFilter';

type Props = {
  link: UserLinkProps;
  theme: ThemeProps | undefined;
  isSmaller?: boolean;
};

export const SocialLink = ({ link, theme, isSmaller }: Props) => {
  const iconFilter = theme?.styles?.icon
    ? generateIconFilter((theme?.styles?.icon as any)?.color)
    : 'saturate(0%) brightness(318%)';

  return (
    <a
      key={link.id}
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${isSmaller ? 'p-[0.35rem]' : 'p-2'} 
        ${
          theme?.type === LIGHT_THEME
            ? 'bg-gray-600 bg-opacity-10'
            : 'bg-white bg-opacity-10'
        }
        rounded-full transition-all hover:scale-110
      `}
      title={link.platform.name}
    >
      <img
        className={`${isSmaller ? 'w-[1.3rem] h-[1.3rem]' : 'w-6 h-6'}`}
        src={`/assets/images/${link.platform.icon_url}`}
        alt={link.platform.name}
        style={{ filter: iconFilter }}
      />
    </a>
  );
};
