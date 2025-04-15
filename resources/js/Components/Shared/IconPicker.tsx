import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const icons = [
  { name: 'camera', component: <FontAwesomeIcon icon={faCamera} /> }
];

type IconPickerProps = {
  selectedIcon: string;
  onSelect: (iconName: string) => void;
};

export const IconPicker = ({ selectedIcon, onSelect }: IconPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = icons.filter((icon) =>
    icon.name.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border rounded-lg">
      <div className="p-2 border-b">
        <input
          type="text"
          placeholder="Search icons..."
          className="w-full p-2 text-sm border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-5 gap-2 p-2">
        {filteredIcons.map((icon) => (
          <button
            key={icon.name}
            onClick={() => onSelect(icon.name)}
            className={`flex items-center justify-center p-2 rounded-lg ${selectedIcon === icon.name ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
          >
            <span className="text-xl">{icon.component}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
