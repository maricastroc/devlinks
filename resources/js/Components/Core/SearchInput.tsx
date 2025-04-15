import { MagnifyingGlass, X } from 'phosphor-react';

export const SearchInput = ({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div className="relative mt-4 mb-4">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <MagnifyingGlass size={16} className="text-dark-gray" />
    </div>
    <input
      type="text"
      className="w-full p-2 pl-10 bg-gray-100 border border-transparent rounded-lg md:py-3 text-md focus:ring-1 focus:ring-gray-600 focus:border-gray-600"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    )}
  </div>
);
