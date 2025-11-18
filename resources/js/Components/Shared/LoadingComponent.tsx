import { ThreeDots } from 'react-loading-icons';

interface Props {
  hasOverlay?: boolean;
  label?: string;
}

export const LoadingComponent = ({
  hasOverlay = false,
  label = 'Loading...'
}: Props) => {
  return (
    <div
      className="fixed top-0 right-0 flex items-center justify-center w-full h-screen z-[9999] max-h-screen"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {hasOverlay && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black/30"
          aria-hidden="true"
        />
      )}

      <div
        className="flex flex-col items-center justify-center p-6 rounded-lg"
        aria-label={label}
      >
        <ThreeDots height="12px" fill="#2d2d2d" aria-hidden="true" />

        <span className="mt-2 text-sm text-gray-700 sr-only">{label}</span>
      </div>
    </div>
  );
};
