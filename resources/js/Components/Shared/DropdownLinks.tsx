import { useState, useEffect, useRef } from 'react';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';

type Props = {
  handleSelect: (item: PlatformProps) => void;
  platforms: PlatformProps[];
  link: UserLinkProps;
};

export const DropdownLinks = ({ handleSelect, platforms, link }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchTerm === '' && searchInputRef.current.focus();
    }
  }, []);

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="top-[3.5rem] right-0 w-[100%]  absolute z-[50] py-1 max-h-[15rem] flex flex-col overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-md">
      <div className="sticky top-0 px-3 py-2 bg-white border-b border-gray-200 z-[50]">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search platforms..."
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPlatforms.length > 0 ? (
        filteredPlatforms.map((platform) => (
          <div key={platform.id}>
            <div
              className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(platform)}
            >
              <img
                className="w-4 h-4"
                src={`/assets/images/${platform.icon_url}`}
                alt=""
                style={{
                  filter:
                    platform.name === link.platform.name
                      ? 'sepia(10%) saturate(5676%) hue-rotate(213deg) brightness(118%) contrast(219%)'
                      : 'none'
                }}
              />
              <span
                className={`${platform.name === link.platform.name ? 'text-medium-purple' : 'text-dark-gray'}`}
              >
                {platform.name}
              </span>
            </div>
            <hr className="mx-2 text-light-gray" />
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-center text-gray-500">
          No platforms found
        </div>
      )}
    </div>
  );
};
