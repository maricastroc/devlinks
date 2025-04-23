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
    <div
      onClick={onSelect}
      className={clsx(
        'relative flex flex-col items-center justify-end p-3 rounded-lg cursor-pointer transition-all',
        'w-full h-full min-h-[16rem] max-h-[260px] max-w-[12rem]',
        !gradient && 'bg-[#3D444B]',
        'hover:shadow-md'
      )}
      style={style}
    >
      <span className="text-xs font-medium text-center text-white truncate sm:text-sm">
        {name}
      </span>

      {isSelected && (
        <div className="absolute flex items-center justify-center text-xs text-purple-500 bg-white rounded-full top-2 right-2 size-4">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
};
