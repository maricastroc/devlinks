import { UserLinkProps } from '@/types/user-link';
import { LinkCard } from '@/Components/Shared/LinkCard';

type Props = {
  links: UserLinkProps[];
};

export const LinkList = ({ links }: Props) => {
  if (!links || links.length === 0) {
    return (
      <div
        className={`w-[15rem] mt-10 justify-center items-center 
          overflow-y-auto flex flex-col gap-4
        `}
      >
        <p>There are no links yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[30rem] mt-8 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          isBigger
          key={link.id}
          link={link}
          className="rounded-xl hover:scale-105"
        />
      ))}
    </div>
  );
};
