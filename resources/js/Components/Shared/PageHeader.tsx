import { ThemeProps } from '@/types/theme';

type Props = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="flex items-start justify-between w-full gap-3">
      <div>
        <h2 className="mb-1 text-[1.5rem] md:text-[2rem] font-bold text-dark-gray">
          {title}
        </h2>
        <p className="mb-8 md:mb-10 text-medium-gray">{description}</p>
      </div>
    </div>
  );
};
