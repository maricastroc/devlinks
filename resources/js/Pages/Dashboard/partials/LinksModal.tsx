import { SearchInput } from '@/Components/Core/SearchInput';
import { EmptyState } from '@/Pages/Profile/partials/SocialMediaModal/partials/SelectLinkModal';
import { PlatformProps } from '@/types/platform';
import { CUSTOM_PLATFORM_NAME } from '@/utils/constants';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { PlatformItem } from './PlatformItem';
import { ModalHeader } from '@/Components/Shared/ModalHeader';
import SecondaryButton from '@/Components/Core/SecondaryButton';

type Props = {
  onClose: () => void;
  handleAddLink: (value: PlatformProps) => void;
  platforms: PlatformProps[];
};
export const LinksModal = ({ onClose, handleAddLink, platforms }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlatforms = platforms.filter(
    (platform) =>
      platform.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      platform.name !== CUSTOM_PLATFORM_NAME
  );

  const customPlatform = platforms.find((platform) => {
    return platform.name === CUSTOM_PLATFORM_NAME;
  });

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-[990] bg-black bg-opacity-70"
        onClick={onClose}
      />
      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-white rounded-lg shadow-lg  p-4 md:max-w-[720px] md:p-8">
        <ModalHeader onClose={onClose} title="Add Social Link" />
        <Dialog.Description className="flex flex-col w-full">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search"
          />

          <div className="flex flex-col h-[60vh] max-h-[25rem] overflow-y-auto custom-scrollbar">
            {filteredPlatforms.length > 0 ? (
              filteredPlatforms.map((platform) => (
                <PlatformItem
                  key={platform.id}
                  platform={platform}
                  onSelect={() => {
                    handleAddLink(platform);
                    onClose();
                  }}
                />
              ))
            ) : (
              <EmptyState
                hasPlatforms={filteredPlatforms.length > 0}
                hasSearchTerm={!!searchTerm}
              />
            )}
          </div>
          <SecondaryButton
            onClick={() => {
              if (customPlatform) {
                handleAddLink(customPlatform);
                onClose();
              }
            }}
          >
            Add Custom Link
          </SecondaryButton>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
