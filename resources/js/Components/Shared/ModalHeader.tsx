import * as Dialog from '@radix-ui/react-dialog';
import { CaretLeft, X } from 'phosphor-react';

export const ModalHeader = ({
  title,
  onClose,
  onBack,
  showBackButton = true
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}) => (
  <div className="relative z-[9999] flex items-center justify-between w-full py-2 mb-2 md:mb-3">
    <div className="flex items-center justify-center w-6 h-6">
      {showBackButton && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="text-dark-gray hover:text-medium-purple transition-all"
        >
          <CaretLeft aria-hidden="true" size={20} />
        </button>
      )}
    </div>

    <Dialog.Title asChild>
      <h2 className="flex-1 text-center font-semibold text-md md:text-lg text-dark-gray">
        {title}
      </h2>
    </Dialog.Title>

    <Dialog.Close
      aria-label="Close modal"
      onClick={onClose}
      className="w-6 h-6 flex items-center justify-center hover:bg-gray-900 hover:text-gray-100 text-gray-500 transition-all duration-300 p-[0.1rem] rounded-full"
    >
      <X aria-hidden="true" size={20} />
    </Dialog.Close>
  </div>
);
