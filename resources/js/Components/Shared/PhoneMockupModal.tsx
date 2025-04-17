import { UserLinkProps } from '@/types/user-link';
import { PhoneMockup } from './PhoneMockup';
import { UserProps } from '@/types/user';
import * as Dialog from '@radix-ui/react-dialog';
import { ModalHeader } from './ModalHeader';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { X } from 'phosphor-react';

type Props = {
  links: UserLinkProps[] | undefined;
  socialLinks?: UserLinkProps[] | undefined;
  user?: UserProps;
  username?: string;
  photoPreview?: string | null;
  name?: string | null;
  bio?: string | null;
  isLoading?: boolean;
  onClose: () => void;
};

export const PhoneMockupModal = ({
  user,
  username,
  photoPreview,
  name,
  bio,
  links,
  isLoading,
  socialLinks,
  onClose
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-gray-900/80 backdrop-blur-sm"
      />
      <Dialog.Content
        onClick={onClose}
        className={`
        fixed z-[9999] bg-transparent flex flex-col
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        inset-0 h-full p-4 w-full max-w-[23rem] items-center justify-center
      `}
      >
        <div className="z-[0] flex mt-8 items-start justify-center flex-1 py-0 overflow-y-auto">
          <div className={`relative scale-90 mt-[-2rem] ml-[-0.3rem]`}>
            <PhoneMockup
              links={links || user?.user_links}
              socialLinks={socialLinks}
              name={name}
              bio={bio}
              photoPreview={photoPreview}
              isLoading={isLoading}
              user={user}
              isMobile={isMobile}
            />
          </div>
        </div>

        <Dialog.Close
          onClick={onClose}
          className={`
            fixed z-[99999] flex items-center justify-center
            top-10 right-[0.9rem]
            transition-all duration-300
          `}
        >
          <X size={24} className="text-white" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
