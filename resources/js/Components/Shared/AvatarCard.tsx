import { DEFAULT_THEME } from '@/utils/constants';
import { ThemeProps } from '@/types/theme';
import { getInitials } from '@/utils/getInitials';
import { UserProps } from '@/types/user';

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
  const isDefaultTheme = theme?.name === DEFAULT_THEME;

  if (isDefaultTheme) {
    return avatarUrl ? (
      <img
        className={`border-4 h-[6.02rem] w-[6.02rem] rounded-full
          border-medium-purple ${className}`}
        src={avatarUrl}
        alt="User Avatar"
      />
    ) : (
      isPublicPage && (
        <span
          className={`h-[6.02rem] w-[6.02rem] bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600`}
        >
          {getInitials(username || user?.username)}
        </span>
      )
    );
  }

  return (
    <div className={`rounded-full p-[2px]`}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          className="object-cover w-full h-full rounded-full"
          alt="User Avatar"
        />
      ) : (
        isPublicPage && (
          <span className="h-[6.02rem] w-[6.02rem] bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600">
            {getInitials(username || user?.username)}
          </span>
        )
      )}
    </div>
  );
};
