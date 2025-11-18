import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { SearchInput } from '@/Components/Core/SearchInput';
import { EmptyState } from '@/Pages/Profile/partials/SocialMediaModal/partials/SelectLinkModal';
import { PlatformProps } from '@/types/platform';
import { CUSTOM_PLATFORM_NAME } from '@/utils/constants';
import { PlatformItem } from './PlatformItem';
import { ModalHeader } from '@/Components/Shared/ModalHeader';
import { CustomItem } from './CustomItem';

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
      <Dialog.Content
        id="links-modal"
        className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-white rounded-lg shadow-lg p-4 md:max-w-[720px] md:p-8"
      >
        <ModalHeader
          showBackButton={false}
          onClose={onClose}
          title="Add Link"
        />

        <Dialog.Description className="sr-only">
          Select a platform or custom link to add a new social link.
        </Dialog.Description>

        <section className="flex flex-col w-full">
          <SearchInput
            autoFocus
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search"
          />

          <ul className="flex w-full pt-2 flex-col h-[60vh] max-h-[25rem] overflow-y-auto custom-scrollbar">
            <li className="mx-2">
              <CustomItem
                onSelect={() => {
                  if (customPlatform) {
                    handleAddLink(customPlatform);
                    onClose();
                  }
                }}
              />
            </li>

            {filteredPlatforms.length > 0 ? (
              filteredPlatforms.map((platform) => (
                <li className="mx-2" key={platform.id}>
                  <PlatformItem
                    platform={platform}
                    onSelect={() => {
                      handleAddLink(platform);
                      onClose();
                    }}
                  />
                </li>
              ))
            ) : (
              <EmptyState
                hasPlatforms={filteredPlatforms.length > 0}
                hasSearchTerm={!!searchTerm}
              />
            )}
          </ul>
        </section>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
