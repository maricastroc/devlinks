import { ThemeProps } from '@/types/theme';
import { DEFAULT_THEME } from '@/utils/constants';

export const HeaderButton = ({
  onClick,
  icon,
  text,
  className,
  theme,
  disabled = false
}: {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  className: string;
  theme: ThemeProps;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`gap-1 h-[3.2rem] disabled:cursor-not-allowed flex flex-nowrap items-center justify-center rounded-lg text-md font-semibold transition duration-150 ease-in-out focus:outline-none whitespace-nowrap ${className} `}
  >
    {icon}
    <p className={`text-center truncate ${className}`}>{text}</p>
  </button>
);
