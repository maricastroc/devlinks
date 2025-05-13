/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RefObject, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';
import { FontsModal } from './FontsModal';
import { useTheme } from '@/contexts/ThemeContext';
import { DEFAULT_COLOR, FONTS } from '@/utils/constants';
import { ColorPicker } from '@/Components/Shared/ColorPicker';
import { useClickOutside } from '@/utils/useClickOutside';

type Props = {
  user: UserProps;
  theme: ThemeProps | null;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

export default function FontCustomizer({ user, theme, onUpdateUser }: Props) {
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [selectedFont, setSelectedFont] = useState<{
    label: string;
    value: string;
  }>();

  const [isFontsModalOpen, setIsFontsModalOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string>(
    (user?.theme?.styles?.primary_text as React.CSSProperties)?.color ||
      DEFAULT_COLOR
  );

  const [showColorPicker, setShowColorPicker] = useState(false);

  const dropdownRef = useClickOutside(() => setShowColorPicker(false));

  const { updateThemeStyles } = useTheme();

  const handleFontSelect = async (
    font: { label: string; value: string },
    color: string
  ) => {
    if (!user?.theme && !theme) return;

    const updatedTheme = await updateThemeStyles(
      user?.theme! || theme!,
      {
        primaryText: {
          color: color
        },
        secondaryText: {
          color: color
        }
      },
      undefined,
      undefined,
      font.value
    );

    onUpdateUser({
      theme: updatedTheme,
      custom_font: font.value
    });

    setSelectedFont(font);
  };

  const renderColorInput = (
    color: string,
    onChange: (color: string) => void,
    onClick: () => void,
    ref: RefObject<HTMLDivElement>,
    showColorPicker: boolean,
    pickerChangeHandler: (color: string) => void
  ) => {
    return (
      <div className="flex flex-col" ref={ref}>
        <div className="relative flex items-start">
          <ColorPicker
            isOpen={showColorPicker}
            color={color}
            onChange={pickerChangeHandler}
          />

          <div
            className="inline-block w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={onClick}
          />
          <input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 p-3 ml-3 bg-gray-100 border border-transparent rounded-lg focus:border-medium-purple focus:ring-medium-purple"
            type="text"
          />
        </div>
      </div>
    );
  };

  const handleColorChange = async (color: string) => {
    setSelectedColor(color);

    if (selectedColor?.length === 7 && !showColorPicker && selectedFont) {
      await handleFontSelect(selectedFont, selectedColor);
    }
  };

  useEffect(() => {
    if (user) {
      const selectedFont = FONTS?.find((font) => {
        return font.value === user?.custom_font;
      });

      setSelectedFont(
        selectedFont || { label: 'Instrument Sans', value: 'sans' }
      );
    }
  });

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const applyChanges = async () => {
      if (selectedColor?.length === 7 && !showColorPicker && selectedFont) {
        await handleFontSelect(selectedFont, selectedColor);
      }
    };

    const timer = setTimeout(() => {
      applyChanges();
    }, 500);

    return () => clearTimeout(timer);
  }, [showColorPicker, showColorPicker]);

  return (
    <div className="bg-white rounded-lg">
      <h3 className="mb-6 text-xl font-bold md:mt-8 md:text-2xl">Fonts</h3>
      <div>
        <p className="mb-2 font-bold text-md">Font type</p>
        <Dialog.Root open={isFontsModalOpen}>
          <Dialog.Trigger asChild>
            <button
              onClick={() => {
                setIsFontsModalOpen(true);
              }}
              className="flex items-center justify-start w-full gap-3 p-4 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              <span className="p-2 bg-gray-100 rounded-md">
                <p className="text-xl font-semibold">Aa</p>
              </span>
              <p className="font-semibold text-md">{selectedFont?.label}</p>
            </button>
          </Dialog.Trigger>
          <FontsModal
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onUpdateUser={onUpdateUser}
            onSelect={handleFontSelect}
            onClose={() => setIsFontsModalOpen(false)}
          />
        </Dialog.Root>
      </div>

      <div>
        <p className="mt-8 mb-2 font-bold text-md">Font color</p>
        <div className="relative flex flex-col gap-4 max-w-[18rem]">
          {renderColorInput(
            selectedColor,
            (color) => handleColorChange(color),
            () => setShowColorPicker(!showColorPicker),
            dropdownRef as RefObject<HTMLDivElement>,
            showColorPicker,
            (color) => handleColorChange(color)
          )}
        </div>
      </div>
    </div>
  );
}
