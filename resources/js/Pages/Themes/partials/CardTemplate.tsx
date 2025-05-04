import { useMediaQuery } from '@/utils/useMediaQuery';
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
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div
      className={`flex items-center justify-center sm:h-full sm:border-none sm:w-full h-[4.5rem] w-[4.5rem] border border-gray-400 rounded-lg ${isSelected && isMobile && 'border-2 border-medium-purple'}`}
    >
      <div
        onClick={onSelect}
        className={clsx(
          'relative flex flex-col items-center justify-end cursor-pointer transition-all',
          'h-[1.6rem] w-[3rem] sm:w-full sm:h-[3rem] max-w-[14rem]',
          'hover:shadow-md'
        )}
        style={style}
      >
        {isSelected && !isMobile && (
          <div className="absolute flex items-center justify-center text-xs text-purple-500 bg-white rounded-full top-2 right-2 size-4">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}
      </div>
    </div>
  );
};
