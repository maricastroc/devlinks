import { Skeleton } from './Skeleton';

type Props = {
  isSmaller?: boolean;
};

export const PhoneSkeleton = ({ isSmaller = false }: Props) => {
  return (
    <>
      <div
        className={`absolute rounded-full h-[94px] w-[94px] z-40 top-[3.9rem] ${isSmaller ? 'left-[5.5rem]' : 'left-[6.5rem]'} flex items-center justify-center`}
      >
        <span className="text-3xl font-bold text-gray-600">
          <Skeleton hasAnimatePulse className="bg-gray-300 h-[94px] w-[94px]" />
        </span>
      </div>

      <div
        className={`font-bold w-[12.2rem] flex items-center justify-center absolute z-40 top-[11.3rem] ${isSmaller ? 'left-[2.5rem]' : 'left-[3.5rem]'}`}
      >
        <Skeleton
          hasAnimatePulse
          className="w-full h-5 bg-gray-300 rounded-md"
        />
      </div>

      <div className="relative">
        <div
          className={`left-[1.3rem] absolute flex flex-col items-center justify-start m-4 ${isSmaller ? 'top-[-15.5rem] w-[13rem]' : 'top-[-24.1rem] w-[15.2rem]'} mr-[-8px]`}
        >
          <div className="w-full flex flex-col gap-[0.98rem] pr-2">
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            {!isSmaller && (
              <>
                <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
                <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
