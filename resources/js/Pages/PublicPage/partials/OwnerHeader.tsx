import { router } from '@inertiajs/react';
import { HeaderButton } from '@/Pages/PublicPage/partials/HeaderButton';
import { useTheme } from '@/contexts/ThemeContext';
import { CaretLeft, Export } from 'phosphor-react';

type Props = {
  onCopyLink: () => void;
};

export const OwnerHeader = ({ onCopyLink }: Props) => {
  const { currentTheme } = useTheme();

  return (
    currentTheme && (
      <header className="md:px-8 flex items-center backdrop-blur-sm bg-white/10  shadow-lg px-4 z-50 w-full h-[55px] mb-12 bg-white bg-opacity-30">
        <div
          className={`bg-transparent md:rounded-xl w-full
          text-md flex items-center justify-between gap-3`}
        >
          <HeaderButton
            onClick={() => router.get(route('web.dashboard.index'))}
            icon={<CaretLeft size={20} />}
            theme={currentTheme}
            text="Back"
          />

          <div className="flex items-center justify-end w-full gap-5 md:gap-6">
            <HeaderButton
              onClick={onCopyLink}
              icon={<Export size={20} />}
              text="Share"
              theme={currentTheme}
            />
          </div>
        </div>
      </header>
    )
  );
};
