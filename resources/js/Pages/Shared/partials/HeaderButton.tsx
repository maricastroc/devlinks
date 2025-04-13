import { ThemeProps } from '@/types/theme';
import { DEFAULT_THEME } from '@/utils/constants';

export const HeaderButton = ({
  onClick,
  icon,
  text,
  largeText,
  className,
  theme,
  disabled = false
}: {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  largeText: string;
  className: string;
  theme: ThemeProps;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`md:hover:bg-opacity-80 gap-2 md:shadow-md h-[3.2rem] disabled:cursor-not-allowed flex flex-nowrap items-center justify-center rounded-lg md:px-4 md:py-3 text-md font-semibold transition duration-150 ease-in-out focus:outline-none whitespace-nowrap ${className} ${theme.name === DEFAULT_THEME ? 'md:bg-white' : 'md:backdrop-blur-sm md:bg-white/10'}`}
  >
    {icon}
    <p className={`text-center truncate ${className}`}>{text}</p>
  </button>
);
