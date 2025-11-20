import { UserLinkProps } from '@/types/user-link';
import { useClickOutside } from '@/utils/useClickOutside';
import { RefObject, useState } from 'react';

export const OverflowMenu = ({
  links,
  isSmaller = false
}: {
  links: UserLinkProps[];
  isSmaller?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef as RefObject<HTMLDivElement>}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false);
        }}
        className={`flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition-all text-md ${isSmaller ? 'w-9 h-9' : 'w-10 h-10'}`}
      >
        +{links.length}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-auto mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="flex flex-col p-2 w-full mr-4">
            {links.map((link) => (
              <button
                key={link.platform.id}
                onClick={() => handleLinkClick(link.url || '')}
                className="flex w-auto items-center rounded-md p-2 text-md text-gray-700 hover:bg-gray-100"
              >
                <img
                  className="w-[1.25rem] h-[1.25rem] mr-2"
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
