import { UserLinkProps } from '@/types/user-link';

type Props = {
  link: UserLinkProps;
  isDefaultTheme: boolean;
  isSmaller?: boolean;
};

export const SocialLink = ({ link, isDefaultTheme, isSmaller }: Props) => {
  return (
    <a
      key={link.id}
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`${isSmaller ? 'p-[0.35rem]' : 'p-2'} rounded-full transition-all hover:scale-110 ${
        isDefaultTheme
          ? 'bg-gray-100 hover:bg-gray-200'
          : 'bg-white/10 hover:bg-white/20'
      }`}
      title={link.platform.name}
    >
      <img
        className={`${isSmaller ? 'w-[1.1rem] h-[1.1rem]' : 'w-5 h-5'}`}
        src={`/assets/images/${link.platform.icon_url}`}
        alt={link.platform.name}
        style={{
          filter: `${isDefaultTheme ? '' : 'saturate(0%) brightness(518%)'}`
        }}
      />
    </a>
  );
};
