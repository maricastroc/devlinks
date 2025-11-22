import PrimaryButton from '@/Components/Core/PrimaryButton';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import { useEffect } from 'react';
import { TrashSimple } from 'phosphor-react';
import { ModalHeader } from '@/Components/Shared/ModalHeader';
import SecondaryButton from '@/Components/Core/SecondaryButton';
import InputLabel from '@/Components/Core/InputLabel';
import TextInput from '@/Components/Core/TextInput';

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
            ? `Edit ${selectedLink?.platform.name} link`
            : `Add ${selectedPlatform.name}`
        }`}
        onClose={onClose}
        onBack={onBack}
      />

      <div className="flex flex-col w-full">
        <div className="mt-6 mb-8">
          <InputLabel
            htmlFor="username-input"
            value={`Enter your ${selectedPlatform.name} username`}
            className="text-body-m"
          />

          <TextInput
            id="username-input"
            type="text"
            className="w-full mt-1 p-3 bg-gray-100 border rounded-lg text-md focus:ring-1"
            placeholder={selectedPlatform.placeholder}
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </div>

        <PrimaryButton
          type="button"
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
      </div>
    </>
  );
};
