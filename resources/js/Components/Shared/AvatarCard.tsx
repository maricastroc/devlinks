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
  className = '',
  user,
  username,
  name,
  isPublicPage = true
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  const labelName = name || username || user?.username || 'user';
  const shouldShowFallback = !avatarUrl || imageError;

  if (shouldShowFallback) {
    if (!isPublicPage) return null;

    return (
      <span
        role="img"
        aria-label={`Avatar placeholder with initials of ${labelName}`}
        className={`
          h-[104px] w-[104px] rounded-full flex items-center justify-center 
          border-medium-purple border-4 text-3xl font-bold bg-white 
          ${className}
        `}
      >
        {getInitials(labelName)}
      </span>
    );
  }

  return (
    <img
      className={`
        border-4 rounded-full border-medium-purple 
        ${isPublicPage ? 'h-[104px] w-[104px]' : 'h-[96px] w-[96px]'} 
        ${className}
      `}
      src={avatarUrl ?? ''}
      alt={`Avatar of ${labelName}`}
      onError={handleImageError}
      draggable="false"
    />
  );
};
