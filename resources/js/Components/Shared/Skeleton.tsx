import { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  isDefaultTheme?: boolean;
};

export const Skeleton = ({
  className = '',
  isDefaultTheme = false,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={`${isDefaultTheme ? 'opacity-100' : 'opacity-60'} rounded-full ${className}`}
      {...props}
    />
  );
};
