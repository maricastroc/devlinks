import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Ref, useState } from 'react';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import { PencilSimple } from 'phosphor-react';
import { SocialMediaModal } from './SocialMediaModal/SocialMediaModal';
import { useClickOutside } from '@/utils/useClickOutside';
import { AddButton } from '@/Components/Core/AddButton';

type Props = {
  platforms: PlatformProps[];
  socialLinks: UserLinkProps[] | undefined;
  mutate: () => void;
};

export const SocialMediaSection = ({
  platforms,
  socialLinks = [],
  mutate
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformProps | null>(null);

  const [selectedLink, setSelectedLink] = useState<UserLinkProps | null>(null);

  const [activeModal, setActiveModal] = useState('initial_link_modal');

  const hasSocialLinks = socialLinks && socialLinks.length > 0;

  const showOverflow = socialLinks?.length > 3;

  return (
    <>
      <div className="grid grid-cols-4 gap-3 md:justify-end md:flex">
        {!hasSocialLinks &&
          platforms
            ?.slice(0, 3)
            .map((platform) => (
              <PlatformButton
                key={platform.id}
                platform={platform}
                onClick={() => setIsModalOpen(true)}
              />
            ))}

        {hasSocialLinks &&
          socialLinks.slice(0, 2).map((link) => (
            <PlatformButton
              isActive
              key={link.id}
              link={link}
              onClick={() => {
                setSelectedPlatform(link.platform);
                setSelectedLink(link);
                setActiveModal('link_input_modal');
                setIsModalOpen(true);
              }}
            />
          ))}

        {showOverflow && (
          <OverflowMenu
            links={socialLinks.slice(2)}
            onSelect={(link) => {
              setSelectedPlatform(link.platform);
              setSelectedLink(link);
              setActiveModal('link_input_modal');
              setIsModalOpen(true);
            }}
          />
        )}

        <AddButton
          onClick={() => {
            setActiveModal('initial_link_modal');
            setIsModalOpen(true);
          }}
        />
      </div>

      <Dialog.Root open={isModalOpen}>
        {isModalOpen && (
          <SocialMediaModal
            onClose={() => {
              setIsModalOpen(false);
              setActiveModal('initial_link_modal');
              setSelectedLink(null);
              setSelectedPlatform(null);
            }}
            selectedLink={selectedLink}
            selectedPlatform={selectedPlatform}
            activeModal={activeModal}
            setSelectedLink={(value) => setSelectedLink(value)}
            setSelectedPlatform={(value) => setSelectedPlatform(value)}
            setActiveModal={(value) => setActiveModal(value)}
            platforms={platforms}
            socialLinks={socialLinks}
            mutate={mutate}
          />
        )}
      </Dialog.Root>
    </>
  );
};

const OverflowMenu = ({
  links,
  onSelect
}: {
  links: UserLinkProps[];
  onSelect: (link: UserLinkProps) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={dropdownRef as Ref<HTMLDivElement>}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-center',
          'w-9 h-9 md:h-10 md:w-12',
          'border rounded-lg',
          'bg-gray-50 border-gray-300 text-gray-500',
          'hover:bg-gray-100 transition-all'
        )}
      >
        <span className="text-lg">+{links.length}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {links.map((link) => (
              <button
                key={link.platform.id}
                onClick={() => {
                  onSelect(link);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src={`/assets/images/${link.platform.icon_url}`}
                  alt={link.platform.name}
                />
                {link.platform.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PlatformButton = ({
  platform,
  link,
  isActive = false,
  onClick
}: {
  platform?: PlatformProps;
  link?: UserLinkProps;
  isActive?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={clsx(
      'relative flex items-center justify-center',
      'w-9 h-9 md:h-10 md:w-auto md:px-3',
      'border border-dashed rounded-lg',
      ' border-gray-300 text-gray-500',
      'shadow-sm shadow-purple-100',
      'transition-all duration-150 hover:shadow-md'
    )}
  >
    <div className="flex items-center justify-center gap-2">
      <img
        className="w-5 h-5 md:w-6 md:h-6"
        src={`/assets/images/${platform?.icon_url || link?.platform.icon_url}`}
        alt={platform?.name || link?.platform.name}
      />
      <span className="hidden text-sm font-medium md:block">
        {platform?.name || link?.platform.name}
      </span>
      <button
        onClick={onClick}
        className={clsx(
          'absolute p-1',
          'top-[-0.6rem] right-[-0.6rem]',
          'bg-white border rounded-full',
          'border-gray-400 text-gray-500',
          'hover:bg-medium-purple hover:border-medium-purple hover:text-white',
          'transition-all duration-150'
        )}
      >
        {isActive ? <PencilSimple size={14} /> : <PencilSimple size={14} />}
      </button>
    </div>
  </button>
);
