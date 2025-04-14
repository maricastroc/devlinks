import { PlatformProps } from '@/types/platform';
import { Plus } from 'phosphor-react';

type Props = {
  platforms: PlatformProps[];
  onClick: () => void;
};

export const SocialMediaSection = ({ platforms, onClick }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-3 md:justify-end md:flex">
      {platforms?.slice(0, 3).map((platform) => (
        <div
          key={platform.id}
          className="md:w-[7rem] relative flex items-center text-gray-600 justify-center w-10 h-10 transition-all duration-150 border rounded-lg "
        >
          <div className="flex items-center justify-center gap-2">
            <img
              className="w-6 h-6"
              src={`/assets/images/${platform.icon_url}`}
              alt={platform.name}
            />
            <span className="hidden text-sm font-medium md:block">
              {platform.name}
            </span>
          </div>
          <button
            onClick={onClick}
            className="absolute p-1 text-gray-400 bg-white border border-gray-300 rounded-full top-[-0.6rem] right-[-0.6rem] hover:bg-medium-purple hover:border-medium-purple hover:text-white"
          >
            <Plus className="w-[0.65rem] h-[0.65rem]" />
          </button>
        </div>
      ))}

      <div
        onClick={onClick}
        className="flex md:w-[3rem] transition-all text-dark-gray hover:text-medium-purple duration-150 border-gray-300 items-center justify-center p-2 border border-dashed rounded-lg cursor-pointer hover:border-medium-purple"
      >
        <Plus size={20} />
      </div>
    </div>
  );
};
