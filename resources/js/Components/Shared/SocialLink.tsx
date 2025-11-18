import { UserLinkProps } from '@/types/user-link';
import { getBrandIconByName } from '@/utils/getBrandIconName';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  link: UserLinkProps;
};

export const SocialLink = ({ link }: Props) => {
  return (
    <a
      key={link.id}
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex w-[2.1rem] h-[2.1rem] items-center justify-center 
        rounded-full bg-medium-gray bg-opacity-20 
        transition-all hover:scale-110
      "
      aria-label={`Open ${link.platform.name} profile`}
    >
      <FontAwesomeIcon
        icon={getBrandIconByName(link.platform.name) as IconProp}
        className="text-dark-gray w-[1.35rem] h-[1.35rem]"
        aria-hidden="true"
        focusable="false"
      />
    </a>
  );
};
