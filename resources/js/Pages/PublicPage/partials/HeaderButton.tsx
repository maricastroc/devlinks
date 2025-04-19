import { ThemeProps } from '@/types/theme';

export const HeaderButton = ({
  onClick,
  icon,
  text,
  theme,
  disabled = false
}: {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  theme: ThemeProps;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={theme.styles.button as React.CSSProperties}
    className={`gap-1 h-[3.2rem] disabled:cursor-not-allowed flex flex-nowrap items-center justify-center rounded-lg text-md font-semibold transition duration-150 ease-in-out focus:outline-none whitespace-nowrap`}
  >
    {icon}
    <p className={`text-center truncate`}>{text}</p>
  </button>
);
