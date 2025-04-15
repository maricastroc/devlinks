import PrimaryButton from '@/Components/Core/PrimaryButton';
import * as Dialog from '@radix-ui/react-dialog';
import { ModalHeader, PlatformItem } from '../SocialMediaModal';
import { UserLinkProps } from '@/types/user-link';

type Props = {
  onClose: () => void;
  onConfirm: (value: string) => void;
  onSelect: (value: UserLinkProps) => void;
  socialLinks: UserLinkProps[] | undefined;
};

export const InitialLinkModal = ({
  onClose,
  onConfirm,
  onSelect,
  socialLinks
}: Props) => {
  return (
    <>
      <ModalHeader
        showBackButton={false}
        title="Social Icons"
        onClose={onClose}
      />

      <Dialog.Description className="flex flex-col w-full">
        <p className="mt-5 font-bold text-dark-gray">
          Show visitors where to find you!
        </p>
        <p className="mb-2 text-dark-gray">
          Add your social profiles, email and more as linked icons on your
          Devlinks.
        </p>

        {socialLinks &&
          socialLinks?.length > 0 &&
          socialLinks?.map((link) => {
            return (
              <PlatformItem
                isEdit
                platform={link.platform}
                onSelect={() => onSelect(link)}
              />
            );
          })}
      </Dialog.Description>

      <PrimaryButton
        className="mt-5"
        onClick={() => onConfirm('select_link_modal')}
      >
        + Add Social Icon
      </PrimaryButton>
    </>
  );
};
