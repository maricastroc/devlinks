import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/Core/PrimaryButton';

interface AccountSectionProps {
  isSubmitting: boolean;
  text: string;
  buttonText: string;
  linkText: string;
  linkPath: string;
}
export const AccountSection = ({
  isSubmitting,
  linkText,
  text,
  buttonText,
  linkPath
}: AccountSectionProps) => {
  return (
    <div className="flex flex-col w-full items-center justify-end mt-8 text-center">
      <PrimaryButton
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Loading...' : buttonText}
      </PrimaryButton>

      <div className="flex flex-col items-center mt-6 md:mt-4 md:gap-1 md:flex-row">
        <p className="text-md text-medium-gray">{text}</p>
        <Link
          href={linkPath}
          className="transition-all hover:text-purple-hover duration-125 text-medium-purple text-md focus:outline-none focus:ring-2 focus:ring-medium-purple focus:ring-offset-1 rounded-sm"
          aria-label="Create new account"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};
