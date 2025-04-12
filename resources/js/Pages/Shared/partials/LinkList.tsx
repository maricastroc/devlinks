import { UserLinkProps } from '@/types/user-link';
import { LinkCard } from '@/Components/LinkCard';

type Props = {
  links: UserLinkProps[];
  currentTheme: string;
  styles: {
    linkCard?: string;
    borderLink?: string;
    primaryText?: string;
  };
};

export const LinkList = ({ links, currentTheme, styles }: Props) => {
  if (!links || links.length === 0) {
    return (
      <div
        className={`w-[15rem] mt-10 justify-center items-center overflow-y-auto flex flex-col gap-4 ${styles.primaryText}`}
      >
        <p>There are no links yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[20rem] mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          currentTheme={currentTheme}
          link={link}
          backgroundLink={styles.linkCard}
        />
      ))}
    </div>
  );
};
