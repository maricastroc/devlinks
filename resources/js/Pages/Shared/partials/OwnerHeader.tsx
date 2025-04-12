import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faPalette,
  faShareFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { HeaderButton } from '@/Components/HeaderButton';
import { DropdownTheme } from '@/Components/DropdownTheme';
import { RefObject } from 'react';

type Theme = {
  name: string;
  color: string;
  label: string;
};

type Props = {
  styles: any;
  currentTheme: string;
  onCopyLink: () => void;
  onSelectTheme: (themeName: string) => void;
  showThemeDropdown: boolean;
  setShowThemeDropdown: (value: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement>;
  themes: Theme[];
};

export const OwnerHeader = ({
  styles,
  onCopyLink,
  onSelectTheme,
  showThemeDropdown,
  setShowThemeDropdown,
  dropdownRef,
  themes,
  currentTheme
}: Props) => {
  return (
    <header className="z-50 w-full h-[78px] md:p-4 mb-10 md:mb-10">
      <div
        className={`bg-transparent md:bg-[#ffffff] md:rounded-xl w-full
          text-md flex items-center justify-between gap-3 p-4 ${styles.header}`}
      >
        <HeaderButton
          onClick={() => router.get(route('dashboard'))}
          icon={<FontAwesomeIcon icon={faBackward} className="size-5" />}
          text="Back"
          largeText="Back to Editor"
          className={styles.button}
        />

        <div className="flex items-center justify-end w-full gap-5 md:gap-0">
          <HeaderButton
            onClick={onCopyLink}
            icon={
              <FontAwesomeIcon icon={faShareFromSquare} className="size-5" />
            }
            text="Share"
            largeText="Share Link"
            className={styles.button}
          />

          <div className="relative z-[9999]" ref={dropdownRef}>
            <HeaderButton
              onClick={() => setShowThemeDropdown(true)}
              icon={<FontAwesomeIcon icon={faPalette} className="size-5" />}
              text="Theme"
              largeText="Theme"
              className={styles.button}
            />
            {showThemeDropdown && (
              <DropdownTheme
                currentTheme={currentTheme}
                themes={themes}
                handleSelect={onSelectTheme}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
