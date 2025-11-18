import { MagnifyingGlass, X } from 'phosphor-react';

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  autoFocus = false
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) => (
  <div className="relative mt-4 mb-4">
    <label htmlFor="search-input" className="sr-only">
      {placeholder}
    </label>

    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <MagnifyingGlass
        aria-hidden="true"
        size={16}
        className="text-dark-gray"
      />
    </div>

    <input
      autoFocus={!!autoFocus}
      id="search-input"
      type="text"
      className="w-full p-2 pl-10 bg-gray-100 border border-transparent rounded-lg md:py-3 text-md focus-visible:outline focus-visible:outline-medium-purple focus:border-borders focus-visible:outline-2 focus-visible:outline-offset-2"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />

    {value && (
      <button
        aria-label="Clear search"
        onClick={() => onChange('')}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
      >
        <X aria-hidden="true" size={16} />
      </button>
    )}
  </div>
);
