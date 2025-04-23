import clsx from 'clsx';

type Props = {
  onClick: () => void;
};

export const CustomMockup = ({ onClick }: Props) => {
  return (
    <div className="flex flex-col w-full gap-1 font-bebas">
      <div
        className={clsx(
          'relative flex border border-gray-950 border-dashed flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all',
          'w-full h-full min-w-[8rem] min-h-[13rem] max-h-[260px] max-w-[9rem]',
          'hover:shadow-md'
        )}
        onClick={() => {
          onClick();
        }}
      >
        <div className="flex flex-col items-center justify-center flex-grow w-full gap-2 mb-2 text-center">
          <p className="text-xl">CREATE YOUR OWN</p>
        </div>
      </div>
      <span className="text-xs font-medium text-center truncate sm:text-sm">
        Custom
      </span>
    </div>
  );
};
