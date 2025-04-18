import { Skeleton } from '../../../Components/Shared/Skeleton';

export const ThemeMockupSkeleton = () => {
  return (
    <div
      className={`bg-gray-100 w-full h-full min-h-[16rem] max-h-[260px] max-w-[12rem] relative flex justify-center flex-col items-center p-4 rounded-lg cursor-pointer transition-all `}
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full gap-2 px-2 mb-3">
        <Skeleton
          hasAnimatePulse
          className={`h-6 bg-gray-300 w-full rounded-[16px]`}
        />
        <Skeleton
          hasAnimatePulse
          className={`h-6 bg-gray-300 w-full rounded-[16px]`}
        />
        <Skeleton
          hasAnimatePulse
          className={`h-6 bg-gray-300 w-full rounded-[16px]`}
        />
      </div>
    </div>
  );
};
