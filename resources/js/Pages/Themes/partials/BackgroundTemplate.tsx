import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type Props = {
  gradient?: string | null;
  name: string;
  onSelect: () => void;
  isSelected?: boolean;
  style?: React.CSSProperties;
};

export const BackgroundTemplate = ({
  gradient = null,
  isSelected = false,
  name,
  onSelect,
  style
}: Props) => {
  return (
    <div className="sm:w-full sm:h-full w-[5rem] flex flex-col items-center justify-center">
      <div
        onClick={onSelect}
        className={clsx(
          'relative flex flex-col items-center justify-end p-3 rounded-lg cursor-pointer transition-all',
          'sm:w-full sm:h-full w-[5rem] h-[5rem] sm:min-h-[16rem] sm:max-h-[260px] sm:max-w-[12rem]',
          !gradient && 'bg-[#3D444B]',
          'hover:shadow-md'
        )}
        style={style}
      >
        {isSelected && (
          <div className="absolute flex items-center justify-center text-xs text-purple-500 bg-white rounded-full top-2 right-2 size-4">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}
      </div>
      <span className="mt-2 text-xs font-medium text-center truncate text-dark-gray sm:text-sm">
        {name}
      </span>
    </div>
  );
};
