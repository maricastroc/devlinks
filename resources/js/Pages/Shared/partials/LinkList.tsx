import { UserLinkProps } from '@/types/user-link';
import { LinkCard } from '@/Components/LinkCard';
import { ThemeProps } from '@/types/theme';

type Props = {
  links: UserLinkProps[];
  currentTheme: ThemeProps;
};

export const LinkList = ({ links, currentTheme }: Props) => {
  if (!links || links.length === 0) {
    return (
      <div
        className={`w-[15rem] mt-10 justify-center items-center 
          overflow-y-auto flex flex-col gap-4 ${currentTheme.styles.primary_text}
        `}
      >
        <p>There are no links yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[30rem] mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} className="h-[3.5rem] rounded-xl" />
      ))}
    </div>
  );
};
