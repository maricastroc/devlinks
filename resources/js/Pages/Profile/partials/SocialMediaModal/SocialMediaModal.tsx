import { useState } from 'react';
import { CaretRight, X, PencilSimple, CaretLeft } from 'phosphor-react';
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
  const [linkValue, setLinkValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveLink = async () => {
    if (!selectedPlatform || !linkValue) return;

    setIsLoading(true);

    try {
      if (selectedLink) {
        const response = await api.put(`/social-links/${selectedLink.id}`, {
          value: linkValue
        });

        toast.success(response.data.message);
      } else {
        const response = await api.post('/social-links', {
          platform_id: selectedPlatform.id,
          value: linkValue
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
    if (!selectedPlatform || !linkValue) return;

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
    setLinkValue('');
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
            platforms={platforms}
            onBack={() => setActiveModal('initial_link_modal')}
            onSelect={(platform) => {
              setSelectedPlatform(platform);
              setActiveModal('link_input_modal');
            }}
          />
        )}

        {activeModal === 'link_input_modal' && selectedPlatform && (
          <LinkInputModal
            linkValue={linkValue}
            isLoading={isLoading}
            selectedLink={selectedLink}
            selectedPlatform={selectedPlatform}
            setLinkValue={setLinkValue}
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

export const ModalHeader = ({
  title,
  onClose,
  onBack,
  showBackButton = true
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}) => (
  <Dialog.Title className="relative flex items-center justify-between w-full py-2 mb-2 text-lg font-semibold md:mb-6 text-dark-gray">
    {showBackButton && (
      <button className="relative">
        <CaretLeft size={20} onClick={onBack} />
      </button>
    )}
    <p className="w-full text-center text-md md:text-lg left-1/2">{title}</p>
    <Dialog.Close
      onClick={onClose}
      className=" hover:bg-gray-900 hover:text-gray-100 transition-all duration-300 text-gray-500 p-[0.1rem] rounded-full"
    >
      <X size={20} />
    </Dialog.Close>
  </Dialog.Title>
);

export const PlatformItem = ({
  platform,
  isEdit = false,
  onSelect
}: {
  platform: PlatformProps;
  isEdit?: boolean;
  onSelect: (platform: PlatformProps) => void;
}) => (
  <button
    className="flex items-start justify-between p-3 transition-all duration-150 bg-transparent rounded-lg hover:bg-gray-100"
    onClick={() => onSelect(platform)}
  >
    <div className="flex items-start justify-start gap-4">
      <img
        className="w-6 h-6"
        src={`/assets/images/${platform.icon_url}`}
        alt={platform.name}
      />
      <p className="text-md text-dark-gray">{platform.name}</p>
    </div>
    {isEdit ? (
      <PencilSimple size={20} className="text-gray-600" />
    ) : (
      <CaretRight size={20} className="text-gray-600" />
    )}
  </button>
);
