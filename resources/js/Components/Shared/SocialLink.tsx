import { UserLinkProps } from '@/types/user-link';
import { getBrandIconByName } from '@/utils/getBrandIconName';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  link: UserLinkProps;
  isSmaller?: boolean;
};

export const SocialLink = ({ link, isSmaller = false }: Props) => {
  return (
    <a
      key={link.id}
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center justify-center rounded-full 
        bg-medium-gray bg-opacity-20 transition-all hover:scale-110
        ${isSmaller ? 'w-9 h-9' : 'w-10 h-10'}
      `}
      aria-label={`Open ${link.platform.name} profile`}
    >
      <FontAwesomeIcon
        icon={getBrandIconByName(link.platform.name) as IconProp}
        className={`text-dark-gray ${isSmaller ? 'w-5 h-5' : 'w-6 h-6'}`}
        aria-hidden="true"
        focusable="false"
      />
    </a>
  );
};
