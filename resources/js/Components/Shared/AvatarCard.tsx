import { DEFAULT_THEME } from '@/utils/constants';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import { ThemeProps } from '@/types/theme';

type AvatarProps = {
  avatarUrl: string | null;
  theme: ThemeProps;
  className?: string;
  isSharedScreen?: boolean;
};

export const AvatarCard = ({
  avatarUrl,
  theme,
  className,
  isSharedScreen = true
}: AvatarProps) => {
  const isDefaultTheme = theme.name === DEFAULT_THEME;

  if (isDefaultTheme) {
    return avatarUrl ? (
      <img
        className={`border-4 h-[6.02rem] w-[6.02rem] rounded-full
          border-medium-purple ${className}`}
        src={avatarUrl}
        alt="User Avatar"
      />
    ) : (
      isSharedScreen && (
        <div
          className={`flex items-center justify-center h-[7rem] w-[7rem]
          rounded-full border-4 border-medium-purple`}
        >
          <img src={SmallLogo} alt="Default Logo" />
        </div>
      )
    );
  }

  return (
    <div
      className={`rounded-full p-[2px]
      bg-gradient-to-br from-white/30 to-transparent ${className} ${isSharedScreen ? 'relative h-[7rem] w-[7rem]' : 'absolute h-[6.02rem] w-[6.02rem]'}`}
    >
      <div
        className={`absolute inset-0 rounded-full border ${
          theme.name === 'Midnight'
            ? 'border-white/20'
            : theme.name === 'Ocean'
              ? 'border-cyan-200/30'
              : 'border-white/10'
        }`}
      ></div>

      {avatarUrl ? (
        <img
          src={avatarUrl}
          className="object-cover w-full h-full rounded-full"
          alt="User Avatar"
        />
      ) : (
        isSharedScreen && (
          <div className="flex items-center justify-center w-full h-full rounded-full bg-white/5">
            <img
              src={SmallLogo}
              className="opacity-80"
              alt="Default Logo"
              style={{ filter: 'saturate(0%) brightness(318%)' }}
            />
          </div>
        )
      )}
    </div>
  );
};
