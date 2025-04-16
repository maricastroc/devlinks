import Skeleton from 'react-loading-skeleton';

export const SkeletonCard = () => {
  return (
    <div className="space-y-4 mt-[-1rem] overflow-y-auto custom-scrollbar">
      <div
        className="p-4 rounded-lg bg-light-gray"
        style={{ height: '6rem', marginTop: '1.5rem' }}
      >
        <div className="flex items-center">
          <Skeleton
            height={30}
            className="rounded-lg"
            baseColor="#EAEAEA"
            highlightColor="#F5F5F5"
            style={{ marginTop: '1rem' }}
            width="100%"
            containerClassName="flex-1"
          />
        </div>
      </div>

      <div
        className="p-4 rounded-lg bg-light-gray"
        style={{ height: '15rem', marginTop: '1.5rem' }}
      >
        <div className="flex h-full gap-4">
          <div className="flex-1">
            <Skeleton
              height="100%"
              className="rounded-lg"
              baseColor="#EAEAEA"
              highlightColor="#F5F5F5"
            />
          </div>

          <div className="flex-1">
            <Skeleton
              width="100%"
              height="100%"
              className="rounded-lg"
              baseColor="#EAEAEA"
              highlightColor="#F5F5F5"
            />
          </div>
        </div>
      </div>

      {/* Terceiro Card (mantido como estava) */}
      <div
        className="p-4 rounded-lg bg-light-gray"
        style={{ height: '15rem', marginTop: '1.5rem' }}
      >
        <div className="space-y-4">
          <div>
            <Skeleton
              width={80}
              height={20}
              className="mb-1"
              baseColor="#EAEAEA"
              highlightColor="#F5F5F5"
            />
            <Skeleton
              height={48}
              className="rounded-lg"
              baseColor="#EAEAEA"
              highlightColor="#F5F5F5"
            />
          </div>
          <div>
            <Skeleton
              width={80}
              height={20}
              className="mb-1"
              baseColor="#EAEAEA"
              highlightColor="#F5F5F5"
            />
            <Skeleton
              height={48}
              className="rounded-lg"
              baseColor="#EAEAEA"
              highlightColor="#F5F5F5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
