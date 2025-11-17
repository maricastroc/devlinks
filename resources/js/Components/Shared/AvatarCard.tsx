import { getInitials } from '@/utils/getInitials';
import { UserProps } from '@/types/user';
import { useState } from 'react';

type AvatarProps = {
  avatarUrl: string | null;
  className?: string;
  isPublicPage?: boolean;
  user?: UserProps | undefined;
  name?: string | undefined;
  username?: string | undefined;
};

export const AvatarCard = ({
  avatarUrl,
  className,
  user,
  username,
  name,
  isPublicPage = true
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowFallback = !avatarUrl || imageError;

  return shouldShowFallback ? (
    isPublicPage && (
      <span
        className={`h-[104px] w-[104px] rounded-full flex items-center border-medium-purple border-4 justify-center text-3xl font-bold ${className}`}
      >
        {getInitials(name || username || user?.username)}
      </span>
    )
  ) : (
    <img
      className={`border-4 rounded-full border-medium-purple ${isPublicPage ? 'h-[104px] w-[104px]' : 'h-[96px] w-[96px]'} ${className}`}
      src={avatarUrl}
      alt="User Avatar"
      onError={handleImageError}
    />
  );
};
