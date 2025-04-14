import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from '../../../Components/Core/InputLabel';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import TextInput from '../../../Components/Core/TextInput';
import IconLink from '/public/assets/images/icon-links-header.svg';
import IconPlatform from '/public/assets/images/icon-platform.svg';
import { LinkMark } from './LinkMark';
import { useState, useRef, useEffect } from 'react';
import { DropdownMenu } from '../../../Components/Shared/DropdownMenu';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import InputError from '../../../Components/Core/InputError';
import { DraggableProvided } from 'react-beautiful-dnd';
import { CUSTOM_PLATFORM_NAME } from '@/utils/constants';

type Props = {
  index: number;
  platforms: PlatformProps[];
  link: UserLinkProps;
  handleSelect: (item: PlatformProps) => void;
  handleRemove: (id: number) => void;
  handleUpdateUrl: (linkId: number, value: string) => void;
  handleUpdateCustomName: (linkId: number, value: string) => void;
  errorUrl?: string;
  errorPlatform?: string;
  errorCustomName?: string;
  provided?: DraggableProvided;
};

export const LinkForm = ({
  index,
  link,
  platforms,
  errorUrl,
  errorPlatform,
  errorCustomName,
  provided,
  handleSelect,
  handleRemove,
  handleUpdateUrl,
  handleUpdateCustomName
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (link.platform.name !== CUSTOM_PLATFORM_NAME) {
      link.custom_name = undefined;
    }
  }, [link.platform.name]);

  return (
    <div className={`flex flex-col w-full p-4 rounded-lg bg-light-gray`}>
      <div
        className="flex items-center justify-between w-full"
        {...provided?.dragHandleProps}
      >
        <div className="flex items-center gap-2">
          <LinkMark />
          <p className="font-bold text-medium-gray">{`Link #${index + 1}`}</p>
        </div>
        <button
          onClick={() => handleRemove(Number(link.id))}
          className="text-medium-gray"
        >
          Remove
        </button>
      </div>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <div>
            <InputLabel htmlFor="platform" value="Platform" />
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:shadow-lg relative w-full mt-1 h-[48px] flex items-center justify-between cursor-pointer bg-white transition-all duration-300 ease-in-out rounded-lg py-3 px-3 border border-neutral-borders hover:border-primary-index hover:shadow-3xl"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-3">
                  <span>
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
                  </span>
                  {link?.platform.name ? (
                    <span className="text-dark-grey">{link.platform.name}</span>
                  ) : (
                    <span className="text-medium-gray">Select a platform</span>
                  )}
                </div>
                <FontAwesomeIcon
                  className="text-medium-gray"
                  icon={isDropdownOpen ? faChevronUp : faChevronDown}
                />
              </div>
              {isDropdownOpen && (
                <div ref={dropdownRef}>
                  <DropdownMenu
                    platforms={platforms}
                    link={link}
                    handleSelect={(item: PlatformProps) => {
                      handleSelect(item);
                    }}
                  />
                </div>
              )}
            </div>
            <InputError className="mt-1" message={errorPlatform} />
          </div>

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
            <InputLabel htmlFor="link" value="Link" />
            <TextInput
              id="link"
              type="text"
              name="link"
              value={link?.url || ''}
              placeholder="e.g. https://www.github.com/octocat"
              className={`block w-full mt-1 ${errorUrl ? 'border border-medium-red' : ''}`}
              onChange={(e) => handleUpdateUrl(Number(link.id), e.target.value)}
              icon={IconLink}
            />

            <InputError className="mt-1" message={errorUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
