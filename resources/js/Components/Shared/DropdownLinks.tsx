import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';

type Props = {
  handleSelect: (item: PlatformProps) => void;
  platforms: PlatformProps[];
  link: UserLinkProps;
};

export const DropdownLinks = ({ handleSelect, platforms, link }: Props) => {
  const filteredPlatforms = platforms?.filter((platform) => {
    return platform.is_social === false;
  });

  return (
    <div className="top-[3.5rem] right-0 w-[100%] absolute z-[9998] py-1 max-h-[15rem] flex flex-col overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-md">
      {filteredPlatforms?.map((platform) => (
        <div key={platform.id}>
          <div
            className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(platform)}
          >
            <img
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
      ))}
    </div>
  );
};
