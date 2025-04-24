import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';
import { FontsModal } from './FontsModal';
import { useTheme } from '@/contexts/ThemeContext';
import { DEFAULT_FONT, FONTS } from '@/utils/constants';

type Props = {
  user: UserProps;
  theme: ThemeProps | null;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

export default function FontCustomizer({ user, theme, onUpdateUser }: Props) {
  const [selectedFont, setSelectedFont] = useState('Instrument Sans');

  const [isFontsModalOpen, setIsFontsModalOpen] = useState(false);

  const { updateThemeStyles } = useTheme();

  const handleFontSelect = async (font: { label: string; value: string }) => {
    if (!user?.theme && !theme) return;

    const updatedTheme = await updateThemeStyles(
      user?.theme! || theme!,
      {},
      undefined,
      undefined,
      font.value
    );

    onUpdateUser({
      theme: updatedTheme,
      custom_font: font.value
    });

    setSelectedFont(font.label);
  };

  useEffect(() => {
    if (user) {
      const selectedFont = FONTS?.find((font) => {
        return font.value === user?.custom_font;
      });

      setSelectedFont(selectedFont?.label || DEFAULT_FONT);
    }
  });

  return (
    <div className="bg-white rounded-lg">
      <h3 className="mb-6 text-xl font-bold md:mt-8 md:text-2xl">Fonts</h3>
      <div>
        <p className="mb-2 font-bold text-md">Font</p>
        <Dialog.Root open={isFontsModalOpen}>
          <Dialog.Trigger asChild>
            <button
              onClick={() => setIsFontsModalOpen(true)}
              className="flex items-center justify-start w-full gap-3 p-4 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              <span className="p-2 bg-gray-100 rounded-md">
                <p className="text-xl font-semibold">Aa</p>
              </span>
              <p className="font-semibold text-md">{selectedFont}</p>
            </button>
          </Dialog.Trigger>
          <FontsModal
            selectedFont={selectedFont}
            onUpdateUser={onUpdateUser}
            onSelect={handleFontSelect}
            onClose={() => setIsFontsModalOpen(false)}
          />
        </Dialog.Root>
      </div>
    </div>
  );
}
