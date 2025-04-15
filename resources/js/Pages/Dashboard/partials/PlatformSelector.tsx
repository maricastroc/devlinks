import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faSearch,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';

type Props = {
  platforms: PlatformProps[];
  link: UserLinkProps;
  handleSelect: (item: PlatformProps) => void;
};

export const PlatformSelector = ({ platforms, link, handleSelect }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsSearching(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Foca no input quando ativa a busca
  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSearching(!isSearching);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => !isSearching && setIsDropdownOpen(!isDropdownOpen)}
        className={`hover:shadow-lg relative w-full mt-1 h-[48px] flex items-center justify-between cursor-pointer bg-white transition-all duration-300 ease-in-out rounded-lg py-3 px-3 border ${
          isDropdownOpen
            ? 'border-primary-index shadow-3xl'
            : 'border-neutral-borders hover:border-primary-index hover:shadow-3xl'
        }`}
      >
        {isSearching ? (
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search platforms..."
            className="w-full outline-none text-dark-grey"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
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
          </div>
        )}

        <div className="flex items-center gap-2 ml-2">
          {isDropdownOpen && (
            <button
              onClick={toggleSearch}
              className="p-1 text-medium-gray hover:text-medium-purple"
            >
              <FontAwesomeIcon
                icon={isSearching ? faTimes : faSearch}
                size="xs"
              />
            </button>
          )}
          <FontAwesomeIcon
            className="text-medium-gray"
            icon={isDropdownOpen ? faChevronUp : faChevronDown}
          />
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-full max-h-60">
          {filteredPlatforms.length > 0 ? (
            filteredPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleSelect(platform);
                  setIsDropdownOpen(false);
                  setIsSearching(false);
                  setSearchTerm('');
                }}
              >
                <img
                  className="w-4 h-4"
                  src={`/assets/images/${platform.icon_url}`}
                  alt={platform.name}
                />
                <span className="text-dark-gray">{platform.name}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-center text-gray-500">
              No platforms found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
