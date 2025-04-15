import { PlatformProps } from '@/types/platform';

const formatToSlug = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

export const PlatformItem = ({
  platform,
  onSelect
}: {
  platform: PlatformProps;
  onSelect: (platform: PlatformProps) => void;
}) => (
  <button
    className="flex items-center justify-between gap-3 p-3 transition-all duration-150 bg-transparent rounded-lg hover:bg-gray-100"
    onClick={() => onSelect(platform)}
  >
    <div className="flex items-center justify-start gap-4">
      <img
        className="w-10 h-10"
        src={`assets/images/icon-color-${formatToSlug(platform.name)}.svg`}
        alt={platform.name}
      />
      <div className="flex flex-col items-start justify-start gap-[0.1rem] text-start">
        <p className="font-semibold md:text-md text-dark-gray">
          {platform.name}
        </p>
        <p className="text-sm font-thin text-gray-500 md:text-[0.95rem]">
          {platform?.description}
        </p>
      </div>
    </div>

    <button className="text-sm font-semibold md:text-md text-medium-purple">
      Add
    </button>
  </button>
);
