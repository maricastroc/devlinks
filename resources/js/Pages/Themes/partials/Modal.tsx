import * as Dialog from '@radix-ui/react-dialog';
import { has } from 'lodash';
import { X } from 'phosphor-react';
import { useEffect, useRef } from 'react';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  isSmaller?: boolean;
};

export const Modal = ({ onClose, isSmaller = false, children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Content
        ref={contentRef}
        className="fixed inset-0 z-[9889] md:hidden"
        onInteractOutside={(e) => {
          if (
            contentRef.current &&
            !contentRef.current.contains(e.target as Node)
          ) {
            onClose();
          }
        }}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl ${isSmaller ? 'h-[42vh]' : 'h-[50vh]'} max-h-[450px] overflow-y-auto`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 pt-2 bg-white">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="absolute p-1 text-gray-500 bg-gray-100 rounded-full top-4 right-4 hover:text-gray-700"
                aria-label="Fechar"
              >
                <X size={18} className="text-dark-gray" />
              </button>
            </Dialog.Close>
          </div>

          <div
            className={`p-4 pt-0 pb-6 flex-items-center justify-center w-full ${isSmaller ? 'pr-0' : 'pr-4'}`}
          >
            {children}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
