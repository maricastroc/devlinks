import PrimaryButton from '@/Components/Core/PrimaryButton';
import { PlatformProps } from '@/types/platform';
import * as Dialog from '@radix-ui/react-dialog';
import { ModalHeader } from '../SocialMediaModal';
import { UserLinkProps } from '@/types/user-link';
import { useEffect, useState } from 'react';
import { validateSingleLink } from '@/utils/validateSingleLink';
import SecondaryButton from '@/Components/Core/SecondaryButton';
import { TrashSimple } from 'phosphor-react';

export const LinkInputModal = ({
  selectedLink,
  selectedPlatform,
  linkValue,
  setLinkValue,
  onBack,
  onClose,
  onSave,
  onRemove,
  isLoading,
  isEditMode = false
}: {
  selectedLink: UserLinkProps | null;
  selectedPlatform: PlatformProps;
  linkValue: string;
  setLinkValue: (value: string) => void;
  onBack: () => void;
  onClose: () => void;
  onSave: () => void;
  onRemove: () => void;
  isLoading: boolean;
  isEditMode?: boolean;
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && selectedLink?.url) {
      setLinkValue(selectedLink?.url);
    }
  }, [isEditMode, selectedLink]);

  const handleSave = () => {
    const validation = validateSingleLink(linkValue, selectedPlatform);

    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setError('');
    onSave();
  };

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
          {error && (
            <span className="px-1 mt-1 text-xs text-medium-red">{error}</span>
          )}

          <input
            type="text"
            className={`w-full p-3 bg-gray-100 border rounded-lg text-md focus:ring-1 ${
              error
                ? 'border-medium-red focus:ring-medium-red'
                : 'border-transparent focus:ring-gray-600 focus:border-gray-600'
            }`}
            placeholder={selectedPlatform.placeholder}
            value={linkValue}
            onChange={(e) => {
              setLinkValue(e.target.value);
              if (error) setError('');
            }}
          />

          <span className="flex flex-wrap items-start justify-start px-2 mt-1 text-xs text-dark-gray">
            Example: {selectedPlatform.example}
          </span>
        </div>

        <PrimaryButton
          onClick={handleSave}
          disabled={!linkValue?.length || isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </PrimaryButton>

        {isEditMode && (
          <SecondaryButton
            disabled={!linkValue?.length || isLoading}
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
