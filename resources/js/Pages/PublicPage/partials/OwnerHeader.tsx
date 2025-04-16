import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faPalette
} from '@fortawesome/free-solid-svg-icons';
import { HeaderButton } from '@/Pages/PublicPage/partials/HeaderButton';
import { DropdownTheme } from '@/Components/Shared/DropdownTheme';
import { RefObject } from 'react';
import { ThemeProps } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  onCopyLink: () => void;
  showThemeDropdown: boolean;
  setShowThemeDropdown: (value: boolean) => void;
  dropdownRef: RefObject<HTMLElement>;
  themes: ThemeProps[];
};

export const OwnerHeader = ({
  onCopyLink,
  showThemeDropdown,
  setShowThemeDropdown,
  dropdownRef,
  themes
}: Props) => {
  const { currentTheme, handleThemeSelect } = useTheme();

  return (
    currentTheme && (
      <header className="z-50 w-full h-[78px] md:p-4 mb-8 md:mb-0">
        <div
          className={`bg-transparent md:rounded-xl w-full
          text-md flex items-center justify-between gap-3 p-4`}
        >
          <HeaderButton
            onClick={() => router.get(route('web.dashboard.index'))}
            theme={currentTheme}
            icon={<FontAwesomeIcon icon={faArrowLeft} className="size-5" />}
            text="Back"
            largeText="Back to Editor"
            className={currentTheme.styles.button}
          />

          <div className="flex items-center justify-end w-full gap-5 md:gap-4">
            <HeaderButton
              onClick={onCopyLink}
              theme={currentTheme}
              icon={
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="size-5"
                />
              }
              text="Share"
              largeText="Share Link"
              className={currentTheme.styles.button}
            />

            <div
              className="relative z-[9999]"
              ref={dropdownRef as RefObject<HTMLDivElement>}
            >
              <HeaderButton
                onClick={() => setShowThemeDropdown(true)}
                theme={currentTheme}
                icon={<FontAwesomeIcon icon={faPalette} className="size-5" />}
                text="Theme"
                largeText="Edit Theme"
                className={currentTheme.styles.button}
              />
              {showThemeDropdown && (
                <DropdownTheme
                  currentTheme={currentTheme}
                  themes={themes}
                  handleSelect={handleThemeSelect}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    )
  );
};
