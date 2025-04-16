import { RefObject } from 'react';
import { ThemeProps } from '@/types/theme';
import { DropdownTheme } from '../Shared/DropdownTheme';
import ColorCircle from '/public/assets/images/icon-color-circle.svg';

type ThemeButtonProps = {
  currentTheme: ThemeProps;
  themes: ThemeProps[] | undefined;
  onSelect: (theme: ThemeProps) => void;
  dropdownRef?: RefObject<HTMLDivElement>;
  showThemeDropdown: boolean;
  setShowThemeDropdown: () => void;
};

export const ThemeButton = ({
  currentTheme,
  themes,
  onSelect,
  dropdownRef,
  showThemeDropdown,
  setShowThemeDropdown
}: ThemeButtonProps) => {
  return (
    <div ref={dropdownRef} className="hidden md:block">
      <button
        onClick={() => setShowThemeDropdown()}
        className="relative flex items-center gap-2 p-3 font-semibold text-gray-600 transition-all duration-150 rounded-md hover:text-medium-purple"
      >
        <img src={ColorCircle} alt="Theme" className="w-4 h-4" />
        <span className="hidden md:inline">Theme</span>
      </button>
      {showThemeDropdown && themes && (
        <DropdownTheme
          isPublicPage={false}
          handleSelect={(theme) => {
            onSelect(theme);
            setShowThemeDropdown();
          }}
          themes={themes}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
};
