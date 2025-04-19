import Skeleton from 'react-loading-skeleton';

export const SkeletonCard = () => {
  return (
    <div className="space-y-4 overflow-y-auto custom-scrollbar lg:max-h-[30rem]">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg bg-light-gray"
          style={{
            height: '15rem',
            marginTop: '1.5rem'
          }}
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
      ))}
    </div>
  );
};
