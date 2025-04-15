import { MagnifyingGlass } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { PlatformProps } from '@/types/platform';

import { SearchInput } from '@/Components/Core/SearchInput';
import { useState } from 'react';
import { UserLinkProps } from '@/types/user-link';
import { ModalHeader, PlatformItem } from '../SocialMediaModal';

interface ModalProps {
  onClose: () => void;
  onSelect: (platform: PlatformProps) => void;
  onBack: () => void;
  existedSocialLinks: UserLinkProps[] | undefined;
  platforms: PlatformProps[];
}

export function SelectLinkModal({
  onClose,
  onBack,
  onSelect,
  existedSocialLinks = [],
  platforms
}: ModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const availablePlatforms = platforms.filter((platform) => {
    return !existedSocialLinks?.some(
      (link) => link.platform_id === platform.id
    );
  });

  const filteredPlatforms = availablePlatforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ModalHeader onClose={onClose} title="Add Social Link" onBack={onBack} />

      <Dialog.Description className="flex flex-col w-full">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search"
        />

        <div className="flex flex-col max-h-[15rem] overflow-y-auto custom-scrollbar">
          {filteredPlatforms.length > 0 ? (
            filteredPlatforms.map((platform) => (
              <PlatformItem
                key={platform.id}
                platform={platform}
                onSelect={onSelect}
              />
            ))
          ) : (
            <EmptyState
              hasPlatforms={availablePlatforms.length > 0}
              hasSearchTerm={!!searchTerm}
            />
          )}
        </div>
      </Dialog.Description>
    </>
  );
}

interface EmptyStateProps {
  hasPlatforms: boolean;
  hasSearchTerm: boolean;
}

export const EmptyState = ({
  hasPlatforms,
  hasSearchTerm
}: EmptyStateProps) => {
  if (!hasPlatforms) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <MagnifyingGlass size={24} className="mb-2" />
        <p>All available platforms have been added</p>
        <p className="text-sm">No more platforms to select</p>
      </div>
    );
  }

  if (hasSearchTerm) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <MagnifyingGlass size={24} className="mb-2" />
        <p>No platforms found</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }

  return null;
};
