import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from './InputLabel';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Github from '/public/assets/images/icon-github.svg';
import TextInput from './TextInput';
import IconLink from '/public/assets/images/icon-links-header.svg';
import { LinkMark } from './LinkMark';
import { useState, useRef, useEffect } from 'react';
import { DropdownMenu } from './DropdownMenu';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import InputError from './InputError';

type Props = {
  index: number;
  platforms: PlatformProps[];
  link: UserLinkProps;
  handleSelect: (item: PlatformProps) => void;
  handleRemove: (id: number) => void;
  handleChangeUrl: (linkId: number, value: string) => void;
  errorUrl?: string;
  errorPlatform?: string;
};

export const LinkBox = ({
  index,
  link,
  platforms,
  errorUrl,
  errorPlatform,
  handleSelect,
  handleRemove,
  handleChangeUrl
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

  return (
    <div className={`flex flex-col p-4 rounded-lg bg-light-gray`}>
      <div className="flex items-center justify-between w-full">
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
                  {link?.platform?.icon_url &&
                    link?.platform?.icon_url !== '' && (
                      <span>
                        <img
                          src={
                            link?.platform.icon_url
                              ? `/assets/images/${link.platform.icon_url}.svg`
                              : ''
                          }
                          alt="Link icon"
                          width="16"
                          height="16"
                        />
                      </span>
                    )}
                  <span className="text-dark-grey">
                    {link?.platform.name || ''}
                  </span>
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

          <div>
            <InputLabel htmlFor="link" value="Link" />
            <TextInput
              id="link"
              type="text"
              name="link"
              value={link?.url || ''}
              placeholder="e.g. https://www.github.com/octocat"
              className={`block w-full mt-1 ${errorUrl ? 'border border-medium-red' : ''}`}
              onChange={(e) => handleChangeUrl(Number(link.id), e.target.value)}
              icon={IconLink}
              isFocused={true}
            />

            <InputError className="mt-1" message={errorUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
