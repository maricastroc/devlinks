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
    <div className="flex flex-col gap-1 ">
      <div
        className={clsx(
          'relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all',
          'min-w-[6.4rem] w-full h-full max-w-[7rem] min-h-[9.5rem] max-h-[12rem] sm:w-full sm:h-full sm:min-w-[8rem] sm:min-h-[13rem] sm:max-h-[290px] sm:max-w-[12rem]',
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
            className="w-full h-4 rounded-md sm:h-5"
            style={theme.styles.link_card as React.CSSProperties}
          />
          <span
            className="w-full h-4 rounded-md sm:h-5"
            style={theme.styles.link_card as React.CSSProperties}
          />
          <span
            className="w-full h-4 rounded-md sm:h-5"
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
