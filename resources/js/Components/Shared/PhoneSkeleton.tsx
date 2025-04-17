import { Skeleton } from './Skeleton';

export const PhoneSkeleton = () => {
  return (
    <>
      <div className="absolute rounded-full h-[6.02rem] w-[6.02rem] z-40 top-[3.9rem] left-[6.5rem] flex items-center justify-center bg-gray-200">
        <span className="text-3xl font-bold text-gray-600">
          <Skeleton hasAnimatePulse />
        </span>
      </div>

      <div
        className={`font-bold w-[12.2rem] flex items-center justify-center absolute z-40 top-[11.3rem] left-[3.5rem]`}
      >
        <Skeleton
          hasAnimatePulse
          className="w-full h-5 bg-gray-300 rounded-md"
        />
      </div>

      <div className="relative">
        <div className="left-[1.3rem] absolute flex flex-col items-center justify-start w-[15.2rem] m-4 top-[-24.1rem] mr-[-8px]">
          <div className="w-full flex flex-col gap-[0.98rem] pr-2">
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
            <Skeleton className="w-full h-12 bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
};
