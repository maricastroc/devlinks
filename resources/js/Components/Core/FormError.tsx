import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface FormErrorsProps {
  id?: string;
  error: string | undefined | null;
  className?: string;
}

export const FormError = ({ id, error, className }: FormErrorsProps) => {
  if (!error) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-atomic="true"
      className={`flex flex-col items-start gap-1 mt-1 ${className}`}
    >
      <div className="flex items-center gap-1">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="text-xs text-medium-red"
          aria-hidden="true"
        />
        <span className="text-sm text-medium-red">{error}</span>
      </div>
    </div>
  );
};
