import { useTheme } from '@/contexts/ThemeContext';
import { ThemeButton } from '../Core/ThemeButton';
import { ThemeProps } from '@/types/theme';
import { RefObject } from 'react';
import { useClickOutside } from '@/utils/useClickOutside';
import { DEFAULT_THEME } from '@/utils/constants';

type Props = {
  title: string;
  description: string;
  themes: ThemeProps[] | undefined;
};

export const PageHeader = ({ title, description, themes }: Props) => {
  const {
    showThemeDropdown,
    currentTheme,
    handleShowThemeDropdown,
    handleThemeSelect
  } = useTheme();

  const defaultTheme = themes?.find((theme) => {
    return theme.name === DEFAULT_THEME;
  });

  const dropdownRef = useClickOutside(() => {
    handleShowThemeDropdown(false);
  });

  return (
    <div className="flex items-start justify-between w-full gap-3">
      <div>
        <h2 className="mb-1 text-[1.5rem] md:text-[2rem] font-bold text-dark-gray">
          {title}
        </h2>
        <p className="mb-8 md:mb-10 text-medium-gray">{description}</p>
      </div>

      <ThemeButton
        currentTheme={currentTheme || (defaultTheme as ThemeProps)}
        themes={themes}
        onSelect={handleThemeSelect}
        dropdownRef={dropdownRef as RefObject<HTMLDivElement>}
        showThemeDropdown={showThemeDropdown}
        setShowThemeDropdown={() => handleShowThemeDropdown(!showThemeDropdown)}
      />
    </div>
  );
};
