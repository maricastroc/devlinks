import { Skeleton } from '../../../Components/Shared/Skeleton';

export const ThemeMockupSkeleton = () => {
  return (
    <div
      className={`bg-gray-100 min-w-[6.4rem] w-full h-full max-w-[7rem] min-h-[9.5rem] max-h-[12rem] sm:w-full sm:h-full sm:min-w-[8rem] sm:min-h-[13rem] sm:max-h-[290px] sm:max-w-[12rem] relative flex justify-center flex-col items-center p-4 rounded-lg cursor-pointer transition-all `}
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full gap-2 px-2 mb-3">
        <Skeleton
          hasAnimatePulse
          className={`h-4 sm:h-5 bg-gray-300 w-full rounded-[16px]`}
        />
        <Skeleton
          hasAnimatePulse
          className={`h-4 sm:h-5 bg-gray-300 w-full rounded-[16px]`}
        />
        <Skeleton
          hasAnimatePulse
          className={`h-4 sm:h-5 bg-gray-300 w-full rounded-[16px]`}
        />
      </div>
    </div>
  );
};
