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
  return (
    <div>
      <InputLabel htmlFor="platform" value="Platform" />
      <Dialog.Root open={isLinksModalOpen}>
        <LinksModal
          onClose={() => setIsLinksModalOpen(false)}
          handleAddLink={handlePlatformSelect}
          platforms={platforms}
        />
      </Dialog.Root>

      <div className="relative overflow-visible">
        <div
          onClick={() => setIsLinksModalOpen(true)}
          className="hover:shadow-lg w-full mt-1 h-[48px] flex items-center justify-between cursor-pointer bg-white transition-all duration-300 ease-in-out rounded-lg py-3 px-3 border border-neutral-borders hover:border-primary-index hover:shadow-3xl"
        >
          <div className="flex items-center gap-3">
            <img
              src={
                link?.platform.icon_url
                  ? `/assets/images/${link.platform.icon_url}`
                  : 'assets/images/icon-platform.svg'
              }
              alt="Link icon"
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
          <PencilSimple className="text-[#737373]" size={20} />
        </div>
      </div>

      <InputError className="mt-1" message={errorPlatform} />
    </div>
  );
};
