import { PlatformProps } from '@/types/platform';
import { getBrandIconByName } from '@/utils/getBrandIconName';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CaretRight, PencilSimple } from 'phosphor-react';

export const PlatformItem = ({
  platform,
  isEdit = false,
  onSelect
}: {
  platform: PlatformProps;
  isEdit?: boolean;
  onSelect: (platform: PlatformProps) => void;
}) => (
  <button
    type="button"
    className="flex items-start justify-between p-3 transition-all duration-150 bg-transparent rounded-lg hover:bg-gray-100"
    onClick={() => onSelect(platform)}
    aria-label={isEdit ? `Edit ${platform.name}` : `Select ${platform.name}`}
  >
    <div className="flex items-start justify-start gap-4">
      <FontAwesomeIcon
        icon={getBrandIconByName(platform.name) as IconProp}
        style={{ color: '#737373' }}
        className="w-6 h-6"
        aria-hidden="true"
      />
      <p className="text-md text-dark-gray">{platform.name}</p>
    </div>

    {isEdit ? (
      <PencilSimple size={20} className="text-gray-600" aria-hidden="true" />
    ) : (
      <CaretRight size={20} className="text-gray-600" aria-hidden="true" />
    )}
  </button>
);
