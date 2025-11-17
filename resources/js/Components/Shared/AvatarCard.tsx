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
        className={`h-[6.02rem] w-[6.02rem] rounded-full flex items-center border-medium-purple border-4 justify-center text-3xl font-bold ${className}`}
      >
        {getInitials(name || username || user?.username)}
      </span>
    )
  ) : (
    <img
      className={`border-4 h-[6.02rem] w-[6.02rem] rounded-full border-medium-purple ${className}`}
      src={avatarUrl}
      alt="User Avatar"
      onError={handleImageError}
    />
  );
};
