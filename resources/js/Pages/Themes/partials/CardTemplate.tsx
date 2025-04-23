import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type Props = {
  onSelect: () => void;
  isSelected?: boolean;
  style?: React.CSSProperties;
};

export const CardTemplate = ({
  isSelected = false,
  onSelect,
  style
}: Props) => {
  return (
    <div
      onClick={onSelect}
      className={clsx(
        'relative flex flex-col items-center justify-end cursor-pointer transition-all',
        'w-full h-[3rem] max-w-[14rem]',
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
  );
};
