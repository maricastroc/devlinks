import { UserLinkProps } from '@/types/user-link';
import { PhoneMockup } from './PhoneMockup';
import { UserProps } from '@/types/user';
import * as Dialog from '@radix-ui/react-dialog';
import { ModalHeader } from './ModalHeader';
import { useMediaQuery } from '@/utils/useMediaQuery';

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
        className="fixed inset-0 z-[999] bg-black bg-opacity-70"
        onClick={onClose}
      />
      <Dialog.Content
        className={`
        fixed z-[9999] bg-white rounded-lg shadow-lg flex flex-col
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        inset-0 min-h-[40rem] overflow-y-auto p-4 w-full max-w-[23rem] items-center justify-center
      `}
      >
        <ModalHeader
          showBackButton={false}
          onClose={onClose}
          title="Layout Preview"
        />

        <div className="z-[0] flex items-start justify-center flex-1 p-4 py-0 overflow-y-auto">
          <div className={`relative scale-90 mt-[-2rem]`}>
            <PhoneMockup
              links={user?.user_links}
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
      </Dialog.Content>
    </Dialog.Portal>
  );
};
