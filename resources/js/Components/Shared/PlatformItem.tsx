import { PlatformProps } from '@/types/platform';
import { CaretRight, PencilSimple } from 'phosphor-react';

export const PlatformItem = ({
  platform,
  isEdit = false,
  isDashboardScreen = false,
  onSelect
}: {
  platform: PlatformProps;
  isEdit?: boolean;
  isDashboardScreen?: boolean;
  onSelect: (platform: PlatformProps) => void;
}) => (
  <button
    className="flex items-start justify-between p-3 transition-all duration-150 bg-transparent rounded-lg hover:bg-gray-100"
    onClick={() => onSelect(platform)}
  >
    <div className="flex items-start justify-start gap-4">
      <img
        className="w-6 h-6"
        src={`${isDashboardScreen ? `assets/images/icon-color-${platform?.name?.toLowerCase()}.svg` : `/assets/images/${platform.icon_url}`}`}
        alt={platform.name}
      />
      <p className="text-md text-dark-gray">{platform.name}</p>
    </div>
    {isEdit ? (
      <PencilSimple size={20} className="text-gray-600" />
    ) : (
      <CaretRight size={20} className="text-gray-600" />
    )}
  </button>
);
