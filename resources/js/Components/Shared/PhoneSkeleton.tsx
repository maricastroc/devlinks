import { Skeleton } from './Skeleton';

type Props = {
  isSmaller?: boolean;
};

const SKELETON_CONFIG = {
  small: {
    avatar: 'top-[3.9rem] left-[5.5rem]',
    name: 'top-[11.3rem] left-[2.5rem] w-[12.2rem]',
    links: {
      container: 'top-[-15.5rem] left-[1.3rem] w-[13rem]',
      count: 3
    }
  },
  large: {
    avatar: 'top-[3.9rem] left-[6.5rem]',
    name: 'top-[11.3rem] left-[3.5rem] w-[12.2rem]',
    links: {
      container: 'top-[-24.1rem] left-[1.3rem] w-[15.2rem]',
      count: 5
    }
  }
};

export const PhoneSkeleton = ({ isSmaller = false }: Props) => {
  const config = isSmaller ? SKELETON_CONFIG.small : SKELETON_CONFIG.large;

  return (
    <div role="presentation" aria-hidden="true">
      <div
        aria-hidden="true"
        className={`absolute rounded-full h-[94px] w-[94px] z-40 flex items-center justify-center ${config.avatar}`}
      >
        <Skeleton
          hasAnimatePulse
          className="bg-gray-300 h-full w-full rounded-full"
        />
      </div>

      <div
        aria-hidden="true"
        className={`font-bold flex items-center justify-center absolute z-40 ${config.name}`}
      >
        <Skeleton
          hasAnimatePulse
          className="w-full h-5 bg-gray-300 rounded-md"
        />
      </div>

      <div className="relative" aria-hidden="true">
        <div
          className={`absolute flex flex-col items-center justify-start m-4 mr-[-8px] ${config.links.container}`}
        >
          <div className="w-full flex flex-col gap-[0.98rem] pr-2">
            {Array.from({ length: config.links.count }, (_, index) => (
              <Skeleton
                key={index}
                className="w-full h-12 bg-gray-300 rounded-md"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
