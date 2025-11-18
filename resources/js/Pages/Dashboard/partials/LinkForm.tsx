import { useState, useEffect } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import IconPlatform from '/public/assets/images/icon-platform.svg';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import { getLinkLabel } from '@/utils/getLinkLabel';
import { LinkMark } from './LinkMark';
import { PlatformSelector } from './PlatformSelector';
import InputLabel from '../../../Components/Core/InputLabel';
import TextInput from '../../../Components/Core/TextInput';
import InputError from '../../../Components/Core/InputError';
import { LinkInputIcon } from '@/Components/Shared/LinkInputIcon';
import { CUSTOM_PLATFORM_NAME } from '@/utils/constants';

type Props = {
  index: number;
  platforms: PlatformProps[];
  link: UserLinkProps;
  handleSelect: (item: PlatformProps) => void;
  handleRemove: (id: number) => void;
  handleUpdateUsername: (linkId: number, value: string) => void;
  handleUpdateCustomName: (linkId: number, value: string) => void;
  errorUsername?: string;
  errorPlatform?: string;
  errorCustomName?: string;
  provided?: DraggableProvided;
};

export const LinkForm = ({
  index,
  link,
  platforms,
  errorUsername,
  errorPlatform,
  errorCustomName,
  provided,
  handleSelect,
  handleRemove,
  handleUpdateUsername,
  handleUpdateCustomName
}: Props) => {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  useEffect(() => {
    if (link.platform.name !== CUSTOM_PLATFORM_NAME) {
      link.custom_name = undefined;
    }
  }, [link.platform.name]);

  return (
    <div
      role="group"
      aria-labelledby={`link_header_${index}`}
      className={`overflow-visible focus:outline-none h-auto flex flex-col w-full p-4 rounded-lg bg-light-gray`}
    >
      <div
        className="flex focus:outline-none items-center justify-between w-full"
        {...provided?.dragHandleProps}
      >
        <div className="flex items-center gap-2">
          <LinkMark />
          <h3
            id={`link_header_${index}`}
            className="font-bold text-medium-gray"
          >{`Link #${index + 1}`}</h3>
        </div>
        <button
          type="button"
          onClick={() => handleRemove(Number(link.id))}
          className="text-medium-gray"
          aria-label={`Remove link #${index + 1}`}
        >
          Remove
        </button>
      </div>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <PlatformSelector
            errorPlatform={errorPlatform}
            isLinksModalOpen={isLinksModalOpen}
            setIsLinksModalOpen={(value) => setIsLinksModalOpen(value)}
            link={link}
            handlePlatformSelect={handleSelect}
            platforms={platforms}
          />

          {link.platform.name === CUSTOM_PLATFORM_NAME && (
            <div>
              <InputLabel htmlFor="custom_name" value="Platform Name" />
              <TextInput
                id="custom_name"
                type="text"
                name="custom_name"
                value={link?.custom_name || ''}
                placeholder="e.g. Portfolio"
                className={`block w-full mt-1 ${errorCustomName ? 'border border-medium-red' : ''}`}
                onChange={(e) =>
                  handleUpdateCustomName(Number(link.id), e.target.value)
                }
                icon={IconPlatform}
              />

              <InputError className="mt-1" message={errorCustomName} />
            </div>
          )}

          <div>
            <InputLabel htmlFor="link" value={`${getLinkLabel(link)}`} />
            <TextInput
              id="link"
              type="text"
              name="link"
              value={link?.username || ''}
              placeholder={`${link?.platform?.placeholder}`}
              className={`block w-full mt-1 ${errorUsername ? 'border border-medium-red' : ''}`}
              onChange={(e) =>
                handleUpdateUsername(Number(link.id), e.target.value)
              }
              icon={<LinkInputIcon platform={link.platform} />}
            />

            <InputError className="mt-1" message={errorUsername} />
          </div>
        </div>
      </div>
    </div>
  );
};
