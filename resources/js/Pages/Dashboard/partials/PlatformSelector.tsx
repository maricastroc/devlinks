import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import { LinksModal } from './LinksModal';
import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimple } from 'phosphor-react';

type Props = {
  platforms: PlatformProps[];
  link: UserLinkProps;
  isLinksModalOpen: boolean;
  errorPlatform: string | undefined;
  setIsLinksModalOpen: (value: boolean) => void;
  handlePlatformSelect: (item: PlatformProps) => void;
};

export const PlatformSelector = ({
  platforms,
  link,
  isLinksModalOpen,
  errorPlatform,
  handlePlatformSelect,
  setIsLinksModalOpen
}: Props) => {
  const platformId = `platform_${link.id}`;

  return (
    <div>
      <InputLabel htmlFor={platformId} value="Platform" />
      <Dialog.Root open={isLinksModalOpen} onOpenChange={setIsLinksModalOpen}>
        <LinksModal
          onClose={() => setIsLinksModalOpen(false)}
          handleAddLink={handlePlatformSelect}
          platforms={platforms}
        />
      </Dialog.Root>

      <div className="relative overflow-visible">
        <button
          id={platformId}
          className="hover:shadow-lg w-full border-borders mt-1 h-[48px] flex items-center justify-between cursor-pointer bg-white transition-all duration-300 ease-in-out rounded-lg py-3 px-3 border border-neutral-borders hover:border-primary-index hover:shadow-3xl"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isLinksModalOpen}
          aria-controls="platform-selector-modal"
          onClick={() => setIsLinksModalOpen(true)}
        >
          <div className="flex items-center gap-3">
            <img
              src={
                link?.platform.icon_url
                  ? `/assets/images/${link.platform.icon_url}`
                  : 'assets/images/icon-platform.svg'
              }
              alt={link.platform.name || ''}
              width="16"
              height="16"
            />
            <span
              className={
                link.platform.name ? 'text-dark-grey' : 'text-medium-gray'
              }
            >
              {link.platform.name || 'Select a platform'}
            </span>
          </div>
          <PencilSimple
            aria-hidden="true"
            focusable="false"
            className="text-[#737373]"
            size={20}
          />
        </button>
      </div>

      <InputError className="mt-1" message={errorPlatform} />
    </div>
  );
};
