import PrimaryButton from '@/Components/Core/PrimaryButton';
import { api } from '@/libs/axios';
import { PlatformProps } from '@/types/platform';
import { handleApiError } from '@/utils/handleApiError';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowRight,
  CaretRight,
  X,
  MagnifyingGlass,
  ArrowLeft
} from 'phosphor-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  platforms: PlatformProps[];
  mutate: any;
}

export function SocialMediaModal({ onClose, mutate, platforms }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformProps | null>(null);

  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveLink = async () => {
    if (!selectedPlatform || !value) return;

    setIsLoading(true);

    try {
      const response = await api.post(
        '/social-links',
        {
          platform_id: selectedPlatform.id,
          value: value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 409) {
        toast.error('You already have a link for this platform');
      }

      toast.success(response.data.message);

      mutate();
      setSelectedPlatform(null);
      setValue('');
      onClose();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-[990] bg-black bg-opacity-70"
        onClick={onClose}
      />

      {/* Modal principal (seleção de plataforma) */}
      {!selectedPlatform && (
        <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-white rounded-lg shadow-lg p-6 md:w-[560px] md:p-8">
          <Dialog.Title className="relative flex items-center justify-center w-full py-2 mb-6 text-lg font-semibold text-dark-gray">
            <p className="absolute -translate-x-1/2 left-1/2">Social icons</p>
            <Dialog.Close
              onClick={onClose}
              className="absolute right-0 hover:bg-gray-900 hover:text-gray-100 transition-all duration-300 text-gray-500 p-[0.1rem] rounded-full"
            >
              <X size={20} />
            </Dialog.Close>
          </Dialog.Title>

          <Dialog.Description className="flex flex-col w-full">
            <p className="mt-5 font-bold text-dark-gray">
              Show visitors where to find you!
            </p>
            <p className="text-dark-gray">
              Add your social profiles, email and more as linked icons on your
              Devlinks.
            </p>

            <div className="relative mt-4 mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlass size={16} className="text-dark-gray" />
              </div>
              <input
                type="text"
                className="w-full p-2 pl-10 bg-gray-100 border border-transparent rounded-lg text-md focus:ring-1 focus:ring-gray-600 focus:border-gray-600"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-col max-h-[15rem] overflow-y-auto custom-scrollbar">
              {filteredPlatforms.length > 0 ? (
                filteredPlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    className="flex items-start justify-between p-3 transition-all duration-150 bg-transparent rounded-lg hover:bg-gray-100"
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    <div className="flex items-start justify-start gap-4">
                      <img
                        className="w-6 h-6"
                        src={`/assets/images/${platform.icon_url}`}
                        alt={platform.name}
                      />
                      <p className="text-md text-dark-gray">{platform.name}</p>
                    </div>
                    <CaretRight size={20} className="text-gray-600" />
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-gray-500">
                  <MagnifyingGlass size={24} className="mb-2" />
                  <p>No platforms found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
            </div>
          </Dialog.Description>
        </Dialog.Content>
      )}

      {selectedPlatform && (
        <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-white rounded-lg shadow-lg p-6 md:w-[560px] md:p-8">
          <Dialog.Title className="relative flex items-center justify-center w-full py-2 mb-6 text-lg font-semibold text-dark-gray">
            <button
              onClick={() => setSelectedPlatform(null)}
              className="absolute left-0 hover:bg-gray-900 hover:text-gray-100 transition-all duration-300 text-gray-500 p-[0.1rem] rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            <p className="absolute -translate-x-1/2 left-1/2">
              Add {selectedPlatform.name}
            </p>
            <Dialog.Close
              onClick={onClose}
              className="absolute right-0 hover:bg-gray-900 hover:text-gray-100 transition-all duration-300 text-gray-500 p-[0.1rem] rounded-full"
            >
              <X size={20} />
            </Dialog.Close>
          </Dialog.Title>

          <Dialog.Description className="flex flex-col w-full">
            <div className="mt-6 mb-8">
              <input
                type="value"
                id="value"
                className="w-full p-3 bg-gray-100 border border-transparent rounded-lg text-md focus:ring-1 focus:ring-gray-600 focus:border-gray-600"
                placeholder={`${selectedPlatform?.placeholder}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <span className="px-2 mt-1 text-xs text-dark-gray">
                Example: {`${selectedPlatform?.example}`}
              </span>
            </div>

            <PrimaryButton
              onClick={handleSaveLink}
              disabled={!value || isLoading}
            >
              Save
            </PrimaryButton>
          </Dialog.Description>
        </Dialog.Content>
      )}
    </Dialog.Portal>
  );
}
