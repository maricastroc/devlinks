import PrimaryButton from '@/Components/Core/PrimaryButton';
import { UserLinkProps } from '@/types/user-link';
import { PlatformItem } from '@/Components/Shared/PlatformItem';
import { ModalHeader } from '@/Components/Shared/ModalHeader';

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

      <div className="flex flex-col w-full">
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
                key={link.id}
                platform={link.platform}
                onSelect={() => onSelect(link)}
              />
            );
          })}
      </div>

      <PrimaryButton
        type="button"
        className="mt-5"
        onClick={() => onConfirm('select_link_modal')}
      >
        + Add Social Icon
      </PrimaryButton>
    </>
  );
};
