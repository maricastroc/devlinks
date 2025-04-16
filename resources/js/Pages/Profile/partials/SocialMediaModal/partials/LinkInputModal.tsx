import PrimaryButton from '@/Components/Core/PrimaryButton';
import { PlatformProps } from '@/types/platform';
import * as Dialog from '@radix-ui/react-dialog';
import { UserLinkProps } from '@/types/user-link';
import { useEffect } from 'react';
import { TrashSimple } from 'phosphor-react';
import { ModalHeader } from '@/Components/Shared/ModalHeader';
import SecondaryButton from '@/Components/Core/SecondaryButton';

export const LinkInputModal = ({
  selectedLink,
  selectedPlatform,
  usernameValue,
  setUsernameValue,
  onBack,
  onClose,
  onSave,
  onRemove,
  isLoading,
  isEditMode = false
}: {
  selectedLink: UserLinkProps | null;
  selectedPlatform: PlatformProps;
  usernameValue: string;
  setUsernameValue: (value: string) => void;
  onBack: () => void;
  onClose: () => void;
  onSave: () => void;
  onRemove: () => void;
  isLoading: boolean;
  isEditMode?: boolean;
}) => {
  useEffect(() => {
    if (isEditMode && selectedLink?.username) {
      setUsernameValue(selectedLink?.username);
    }
  }, [isEditMode, selectedLink]);

  return (
    <>
      <ModalHeader
        title={`${
          isEditMode
            ? `Edit ${selectedLink?.platform.name} Icon`
            : `Add ${selectedPlatform.name}`
        }`}
        onClose={onClose}
        onBack={onBack}
      />

      <Dialog.Description className="flex flex-col w-full">
        <div className="mt-6 mb-8">
          <input
            type="text"
            className={`w-full p-3 bg-gray-100 border rounded-lg text-md focus:ring-1`}
            placeholder={selectedPlatform.placeholder}
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
          />
        </div>

        <PrimaryButton
          onClick={onSave}
          disabled={!usernameValue?.length}
          isSubmitting={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </PrimaryButton>

        {isEditMode && (
          <SecondaryButton
            isSubmitting={isLoading}
            className="mt-3"
            onClick={onRemove}
          >
            <div className="flex items-center justify-center gap-2">
              <TrashSimple size={20} />
              {isLoading ? 'Removing...' : 'Remove'}
            </div>
          </SecondaryButton>
        )}
      </Dialog.Description>
    </>
  );
};
