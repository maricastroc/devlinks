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
            className="text-xs text-medium-red"
          />
          <p className="text-sm text-medium-red">{error}</p>
        </div>
      </div>
    )
  );
};
