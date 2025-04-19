import { ThemeProps } from '@/types/theme';
import { LIGHT_THEME } from '@/utils/constants';
import clsx from 'clsx';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  theme: ThemeProps;
  isSelected?: boolean;
  onClick: (theme: ThemeProps) => void;
};

export const ThemeMockup = ({ theme, isSelected = false, onClick }: Props) => {
  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all',
        'w-full h-full min-h-[16rem] max-h-[260px] max-w-[12rem]',
        'hover:shadow-md hover:scale-[1.02]',
        {
          'border border-gray-200': theme?.type === LIGHT_THEME
        }
      )}
      onClick={() => onClick(theme)}
      style={theme.styles.background as React.CSSProperties}
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full gap-2 mb-2">
        <span
          className="w-full h-5 rounded-md"
          style={theme.styles.link_card as React.CSSProperties}
        />
        <span
          className="w-full h-5 rounded-md"
          style={theme.styles.link_card as React.CSSProperties}
        />
        <span
          className="w-full h-5 rounded-md"
          style={theme.styles.link_card as React.CSSProperties}
        />
      </div>

      <span
        className="text-xs font-medium text-center truncate sm:text-sm"
        style={theme.styles.primary_text as React.CSSProperties}
      >
        {theme.name}
      </span>

      {isSelected && (
        <div className="absolute flex items-center justify-center text-xs text-purple-500 bg-white rounded-full top-2 right-2 size-4">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
};
