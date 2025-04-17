import { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  isDefaultTheme?: boolean;
  hasAnimatePulse?: boolean;
};

export const Skeleton = ({
  className = '',
  isDefaultTheme = false,
  hasAnimatePulse = false,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={`rounded-full ${
        isDefaultTheme ? 'opacity-100' : 'opacity-60'
      } ${hasAnimatePulse ? 'animate-pulse' : ''} ${className}`}
      {...props}
    />
  );
};
