import { DEFAULT_THEME } from '@/utils/constants';
import { ThemeProps } from '@/types/theme';
import { getInitials } from '@/utils/getInitials';
import { UserProps } from '@/types/user';
import { useState } from 'react';

type AvatarProps = {
  avatarUrl: string | null;
  theme: ThemeProps | null;
  className?: string;
  isPublicPage?: boolean;
  user?: UserProps | undefined;
  username?: string | undefined;
};

export const AvatarCard = ({
  avatarUrl,
  theme,
  className,
  user,
  username,
  isPublicPage = true
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const isDefaultTheme = theme?.name === DEFAULT_THEME;

  const handleImageError = () => {
    setImageError(true);
  };

  // Se não tem avatarUrl ou ocorreu erro ao carregar a imagem
  const shouldShowFallback = !avatarUrl || imageError;

  if (isDefaultTheme) {
    return shouldShowFallback ? (
      isPublicPage && (
        <span
          className={`h-[6.02rem] w-[6.02rem] bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600 ${className}`}
        >
          {getInitials(username || user?.username)}
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
  }

  return (
    <div className={`rounded-full p-[2px] ${className}`}>
      {shouldShowFallback ? (
        isPublicPage && (
          <span className="h-[6.02rem] w-[6.02rem] bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600">
            {getInitials(username || user?.username)}
          </span>
        )
      ) : (
        <img
          src={avatarUrl}
          className="object-cover h-[6.02rem] w-[6.02rem] rounded-full"
          alt="User Avatar"
          onError={handleImageError}
        />
      )}
    </div>
  );
};
