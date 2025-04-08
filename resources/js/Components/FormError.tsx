import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface FormErrorsProps {
  error: string | undefined | null;
  className?: string;
}

export const FormError = ({ error, className }: FormErrorsProps) => {
  return (
    error && (
      <div className={`flex flex-col items-start gap-1 mt-1 ${className}`}>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="text-medium-red text-xs"
          />
          <p className="text-medium-red text-sm">{error}</p>
        </div>
      </div>
    )
  );
};
