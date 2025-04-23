import { ThemeProps } from '@/types/theme';
import { LIGHT_THEME } from '@/utils/constants';
import clsx from 'clsx';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserProps } from '@/types/user';

type Props = {
  theme: ThemeProps;
  isSelected?: boolean;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
  onClick: (theme: ThemeProps) => void;
};

export const ThemeMockup = ({
  theme,
  onUpdateUser,
  isSelected = false,
  onClick
}: Props) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div
        className={clsx(
          'relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all',
          'w-full h-full min-w-[8rem] min-h-[13rem] max-h-[260px] max-w-[9rem]',
          'hover:shadow-md',
          {
            'border border-gray-200': theme?.type === LIGHT_THEME
          }
        )}
        onClick={() => {
          onClick(theme);
          onUpdateUser({
            custom_bg_color: '',
            custom_bg_type: ''
          });
        }}
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

        {isSelected && (
          <div className="absolute flex items-center justify-center text-xs text-purple-500 bg-white rounded-full top-2 right-2 size-4">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-center truncate sm:text-sm">
        {theme.name}
      </span>
    </div>
  );
};
