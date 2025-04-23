import { useEffect, useState, RefObject } from 'react';
import { HexColorPicker } from 'react-colorful';
import { BackgroundTemplate } from './BackgroundTemplate';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickOutside } from '@/utils/useClickOutside';
import { createGradientValue } from '@/utils/createGradientValue';
import { BackgroundType } from '@/types/background-type';
import { GradientDirection } from '@/types/gradient-direction';
import { BACKGROUND_OPTIONS, DEFAULT_COLOR } from '@/utils/constants';

type Props = {
  user: UserProps;
  theme: ThemeProps | null;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

export default function BackgroundCustomizer({
  user,
  theme,
  onUpdateUser
}: Props) {
  const [selectedType, setSelectedType] = useState<string | null>(
    user?.custom_bg_type || null
  );

  const [color, setColor] = useState<string>(
    user?.custom_bg_color || DEFAULT_COLOR
  );

  const [showPicker, setShowPicker] = useState(false);

  const { updateThemeStyles } = useTheme();

  const dropdownRef = useClickOutside(() => setShowPicker(false));

  const handleBackgroundSelect = async (
    color: string,
    type: BackgroundType,
    direction?: GradientDirection
  ) => {
    const value =
      type === 'solid' ? color : createGradientValue(color, direction!);

    if (!user?.theme && !theme) return;

    const updatedTheme = await updateThemeStyles(
      user?.theme! || theme!,
      {
        background: {
          type,
          value
        }
      },
      direction || type,
      color
    );

    onUpdateUser({
      theme: updatedTheme,
      custom_bg_color: color,
      custom_bg_type: direction || type
    });

    setColor(color);
    setSelectedType(direction || type);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setSelectedType('');
  };

  useEffect(() => {
    if (
      (user && user?.theme?.is_custom === false) ||
      (user && !user?.custom_bg_color)
    ) {
      setColor(DEFAULT_COLOR);
      setSelectedType('');
    }
  }, [user]);

  return (
    <div className="bg-white rounded-lg">
      <h3 className="mt-8 mb-6 text-2xl font-bold">Backgrounds</h3>
      <div
        className="grid gap-4 mb-6"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          justifyItems: 'start'
        }}
      >
        {BACKGROUND_OPTIONS.map((option) => (
          <BackgroundTemplate
            key={`${option.type}-${option.direction || 'solid'}`}
            isSelected={
              (option.direction
                ? selectedType === option.direction
                : selectedType === option.type) &&
              user?.theme?.is_custom === true
            }
            onSelect={() => {
              if (option.type === 'solid') {
                handleBackgroundSelect(color, 'solid');
              } else {
                handleBackgroundSelect(color, 'gradient', option.direction);
              }
            }}
            name={option.name}
            gradient={option.direction}
            style={option.style}
          />
        ))}
      </div>

      <div>
        <p className="mb-2 font-bold text-md">Color</p>
        <div className="flex flex-col gap-4 max-w-[18rem]">
          <div
            className="flex flex-col"
            ref={dropdownRef as RefObject<HTMLDivElement>}
          >
            <div className="flex items-start">
              {showPicker && (
                <div className="relative">
                  <div className="absolute left-0 z-10 top-[3.6rem]">
                    <HexColorPicker
                      color={color}
                      onChange={handleColorChange}
                    />
                  </div>
                </div>
              )}
              <div
                className="inline-block w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => setShowPicker(!showPicker)}
              />
              <input
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-12 p-3 ml-3 bg-gray-100 border border-transparent rounded-lg focus:border-medium-purple focus:ring-medium-purple"
                type="text"
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {selectedType === '' &&
                'Select a background style to apply your color changes.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
