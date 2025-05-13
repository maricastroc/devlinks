/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { useMediaQuery } from '@/utils/useMediaQuery';

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
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [selectedDirection, setSelectedDirection] = useState<string | null>(
    user?.custom_bg_type || null
  );
  const [color, setColor] = useState<string>(
    user?.custom_bg_color || DEFAULT_COLOR
  );
  const [showPicker, setShowPicker] = useState(false);

  const { updateThemeStyles } = useTheme();

  const isMobile = useMediaQuery('(max-width: 640px)');

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
        },
        primaryText: {
          color: (user?.theme?.styles?.primary_text as any)?.color
        },
        secondaryText: {
          color: (user?.theme?.styles?.secondary_text as any)?.color
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
  };

  useEffect(() => {
    if (
      (user && user?.theme?.is_custom === false) ||
      (user && !user?.custom_bg_type)
    ) {
      setColor(DEFAULT_COLOR);
      setSelectedType('');
    } else {
      setSelectedType(user?.custom_bg_type === 'solid' ? 'solid' : 'gradient');
      setSelectedDirection(user?.custom_bg_type as string);
      setColor((user?.theme?.styles?.background as any)?.color);
    }
  }, [user]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const applyChanges = async () => {
      if (
        color?.length === 7 &&
        !showPicker &&
        selectedType &&
        (user?.theme?.styles?.background as any)?.color !== color
      ) {
        await handleBackgroundSelect(
          color,
          selectedType as BackgroundType,
          selectedDirection as GradientDirection
        );
      }
    };

    const timer = setTimeout(() => {
      applyChanges();
    }, 500);

    return () => clearTimeout(timer);
  }, [color, showPicker]);

  return (
    <div className="w-full bg-white rounded-lg">
      <h3 className="mb-6 text-xl font-bold sm:mt-8 sm:text-2xl">
        Backgrounds
      </h3>
      <div
        className="flex flex-wrap gap-4 mb-6 sm:grid"
        style={{
          gridTemplateColumns: `${isMobile ? '' : 'repeat(auto-fit, minmax(140px, 1fr))'}`,
          justifyItems: 'start'
        }}
      >
        {BACKGROUND_OPTIONS.map((option) => (
          <BackgroundTemplate
            key={`${option.type}-${option.direction || 'solid'}`}
            isSelected={
              (option.direction
                ? selectedDirection === option.direction
                : selectedType === option.type) &&
              user?.theme?.is_custom === true
            }
            onSelect={() => {
              setSelectedType(option.type);
              setSelectedDirection(
                option.type === 'solid' ? null : option.direction
              );

              option.type === 'solid'
                ? handleBackgroundSelect(color, 'solid')
                : handleBackgroundSelect(color, 'gradient', option.direction);
            }}
            name={isMobile ? option.smallName : option.name}
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
            <div className="mt-2 text-sm font-semibold text-gray-600">
              {selectedType === '' &&
                'Select a background style to apply your color changes.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
