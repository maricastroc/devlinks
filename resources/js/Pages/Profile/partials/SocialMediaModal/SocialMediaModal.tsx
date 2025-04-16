import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { api } from '@/libs/axios';
import { PlatformProps } from '@/types/platform';
import { handleApiError } from '@/utils/handleApiError';
import { UserLinkProps } from '@/types/user-link';
import { InitialLinkModal } from './partials/InitialLinkModal';
import { LinkInputModal } from './partials/LinkInputModal';
import { SelectLinkModal } from './partials/SelectLinkModal';

interface ModalProps {
  selectedPlatform: PlatformProps | null;
  selectedLink: UserLinkProps | null;
  socialLinks: UserLinkProps[] | undefined;
  platforms: PlatformProps[];
  activeModal: string;
  setActiveModal: (value: string) => void;
  setSelectedPlatform: (value: PlatformProps | null) => void;
  setSelectedLink: (value: UserLinkProps | null) => void;
  onClose: () => void;
  mutate: () => void;
}

export function SocialMediaModal({
  onClose,
  mutate,
  setSelectedLink,
  setSelectedPlatform,
  setActiveModal,
  activeModal,
  selectedLink,
  selectedPlatform,
  platforms,
  socialLinks
}: ModalProps) {
  const [usernameValue, setUsernameValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveLink = async () => {
    if (!selectedPlatform || !usernameValue) return;

    setIsLoading(true);

    try {
      if (selectedLink) {
        const response = await api.put(`/social-links/${selectedLink.id}`, {
          username: usernameValue
        });

        toast.success(response.data.message);
      } else {
        const response = await api.post('/social-links', {
          platform_id: selectedPlatform.id,
          username: usernameValue
        });

        if (response.status === 409) {
          toast.error('You already have a link for this platform');
          return;
        }

        toast.success(response.data.message);
      }

      mutate();
      resetForm();
      onClose();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLink = async () => {
    if (!selectedPlatform || !usernameValue) return;

    setIsLoading(true);

    try {
      const response = await api.delete(`/social-links/${selectedLink?.id}`);

      toast.success(response.data.message);

      mutate();
      resetForm();
      onClose();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedPlatform(null);
    setSelectedLink(null);
    setUsernameValue('');
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-[990] bg-black bg-opacity-70"
        onClick={onClose}
      />
      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-white rounded-lg shadow-lg  p-4 md:w-[560px] md:p-8">
        {activeModal === 'initial_link_modal' && (
          <InitialLinkModal
            onClose={onClose}
            onConfirm={(value) => setActiveModal(value)}
            socialLinks={socialLinks}
            onSelect={(link) => {
              setSelectedPlatform(link.platform);
              setSelectedLink(link);
              setActiveModal('link_input_modal');
            }}
          />
        )}

        {activeModal === 'select_link_modal' && (
          <SelectLinkModal
            existedSocialLinks={socialLinks}
            onClose={onClose}
            platforms={platforms?.filter((platform) => {
              return platform?.is_social === true;
            })}
            onBack={() => setActiveModal('initial_link_modal')}
            onSelect={(platform) => {
              setSelectedPlatform(platform);
              setActiveModal('link_input_modal');
            }}
          />
        )}

        {activeModal === 'link_input_modal' && selectedPlatform && (
          <LinkInputModal
            usernameValue={usernameValue}
            isLoading={isLoading}
            selectedLink={selectedLink}
            selectedPlatform={selectedPlatform}
            setUsernameValue={setUsernameValue}
            onClose={onClose}
            onRemove={handleRemoveLink}
            onBack={() => {
              if (selectedLink) {
                setActiveModal('initial_link_modal');
              } else {
                setActiveModal('select_link_modal');
              }
            }}
            onSave={handleSaveLink}
            isEditMode={!!selectedLink}
          />
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
