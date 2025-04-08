import { ThreeDots } from 'react-loading-icons';

interface Props {
  hasOverlay?: boolean;
}

export const LoadingComponent = ({ hasOverlay = false }: Props) => {
  return (
    <div className="fixed top-0 right-0 flex items-center justify-center w-full h-screen z-[9999] max-h-screen">
      {hasOverlay && (
        <div className={`fixed inset-0 w-screen h-screen bg-black/30`} />
      )}
      <ThreeDots height="12px" fill="#633CFF" className="animated-spin" />
    </div>
  );
};
