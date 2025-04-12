import { DEFAULT_THEME } from '@/utils/constants';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';

type AvatarProps = {
  avatarUrl: string | null;
  theme: string;
};

export const AvatarCard = ({ avatarUrl, theme }: AvatarProps) => {
  const isDefaultTheme = theme === DEFAULT_THEME;

  if (isDefaultTheme) {
    return avatarUrl ? (
      <img
        className={`border-4 h-[7rem] w-[7rem] rounded-full border-medium-purple`}
        src={avatarUrl}
        alt="User Avatar"
      />
    ) : (
      <div
        className={`flex items-center justify-center h-[7rem] w-[7rem] rounded-full border-4 border-medium-purple`}
      >
        <img
          src={SmallLogo}
          alt="Default Logo"
          style={{ filter: 'saturate(0%) brightness(318%)' }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-[7rem] w-[7rem] rounded-full p-[2px] bg-gradient-to-br from-white/30 to-transparent">
      <div
        className={`absolute inset-0 rounded-full border ${
          theme === 'Midnight'
            ? 'border-white/20'
            : theme === 'Ocean'
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
        <div className="flex items-center justify-center w-full h-full rounded-full bg-white/5">
          <img
            src={SmallLogo}
            className="opacity-80"
            alt="Default Logo"
            style={{ filter: 'saturate(0%) brightness(318%)' }}
          />
        </div>
      )}
    </div>
  );
};
