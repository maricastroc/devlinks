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
  <Dialog.Title className="relative z-[9999] flex items-center justify-between w-full py-2 mb-2 text-lg font-semibold md:mb-4 text-dark-gray">
    {showBackButton && (
      <button className="relative">
        <CaretLeft size={20} onClick={onBack} />
      </button>
    )}
    <p className="w-full text-center text-md md:text-lg left-1/2">{title}</p>
    <Dialog.Close
      onClick={onClose}
      className=" hover:bg-gray-900 hover:text-gray-100 transition-all duration-300 text-gray-500 p-[0.1rem] rounded-full"
    >
      <X size={20} />
    </Dialog.Close>
  </Dialog.Title>
);
