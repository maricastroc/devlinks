import { useEffect, useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';
import { BackgroundTemplate } from './partials/BackgroundTemplate';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';
import { debounce } from 'lodash';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  user: UserProps | null;
  theme: ThemeProps | null;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

export const generateGradientColors = (baseColor: string) => {
  const color1 = tinycolor(baseColor);
  const color2 = color1.clone().lighten(15).desaturate(10);
  const color3 = color2.clone().lighten(15).desaturate(5);
  return [color1.toHexString(), color2.toHexString(), color3.toHexString()];
};

export default function BackgroundCustomizer({
  user,
  theme,
  onUpdateUser
}: Props) {
  const [type, setType] = useState<string | null>(null);
  const [color, setColor] = useState<string>('#3D444B');
  const [showPicker, setShowPicker] = useState(false);

  const { updateBackgroundOnly } = useTheme();

  // Função de manipulação de background movida para dentro do componente
  const handleBackgroundSelect = useCallback(
    async (color: string, type: 'solid' | 'gradient', direction?: string) => {
      let value: string;

      if (type === 'solid') {
        value = color;
      } else {
        const [base, mid, light] = generateGradientColors(color);

        switch (direction) {
          case 'bg-gradient-to-t':
            value = `linear-gradient(to top, ${base}, ${light})`;
            break;
          case 'bg-gradient-to-b':
            value = `linear-gradient(to bottom, ${base}, ${light})`;
            break;
          case 'angular':
            value = `linear-gradient(135deg, ${base}, ${mid}, ${light})`;
            break;
          default:
            value = `linear-gradient(to bottom, ${base}, ${light})`;
        }
      }

      if (user?.theme || theme) {
        const updatedTheme = await updateBackgroundOnly(
          direction || 'solid',
          color,
          user?.theme! || theme!,
          { type, value }
        );

        onUpdateUser({
          theme: updatedTheme,
          custom_bg_color: color,
          custom_bg_type: direction || 'solid'
        });
      }
    },
    [user?.theme, theme, updateBackgroundOnly, onUpdateUser]
  );

  useEffect(() => {
    if (user && user?.theme?.is_custom === true && user.custom_bg_type) {
      setType(user.custom_bg_type);
    }

    if (user && user?.theme?.is_custom === true && user.custom_bg_color) {
      setColor(user.custom_bg_color);
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
        <BackgroundTemplate
          isSelected={type === 'solid'}
          onSelect={() => handleBackgroundSelect(color, 'solid')}
          name="Solid"
          style={{ backgroundColor: color }}
        />
        <BackgroundTemplate
          isSelected={type === 'bg-gradient-to-b'}
          onSelect={() => {
            setType('gradient');
            handleBackgroundSelect(color, 'gradient', 'bg-gradient-to-b');
          }}
          gradient="bg-gradient-to-b"
          name="Gradient to Bottom"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${tinycolor(color).toHexString()}, ${tinycolor(color).lighten(30).toHexString()})`
          }}
        />
        <BackgroundTemplate
          isSelected={type === 'bg-gradient-to-t'}
          onSelect={() => {
            setType('gradient');
            handleBackgroundSelect(color, 'gradient', 'bg-gradient-to-t');
          }}
          gradient="bg-gradient-to-t"
          name="Gradient to Top"
          style={{
            backgroundImage: `linear-gradient(to top, ${tinycolor(color).toHexString()}, ${tinycolor(color).lighten(30).toHexString()})`
          }}
        />
        <BackgroundTemplate
          isSelected={type === 'angular'}
          onSelect={() => {
            setType('gradient');
            handleBackgroundSelect(color, 'gradient', 'angular');
          }}
          gradient="angular"
          name="Gradient Diagonal"
          style={{
            backgroundImage: `linear-gradient(135deg, ${tinycolor(color).toHexString()}, ${tinycolor(color).lighten(15).desaturate(10).toHexString()}, ${tinycolor(color).lighten(30).desaturate(5).toHexString()})`
          }}
        />
      </div>

      <div>
        <p className="mb-2 font-bold text-md">Color</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex items-start gap-4">
              <div
                className="inline-block w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => setShowPicker(!showPicker)}
              />
              <input
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setType('');
                }}
                className="h-12 p-3 bg-gray-100 border border-transparent rounded-lg focus:border-medium-purple focus:ring-medium-purple"
                type="text"
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {type === '' &&
                'Select a background style to apply your color changes.'}
            </div>
          </div>

          {showPicker && (
            <div className="relative">
              <div className="absolute left-0 z-10">
                <HexColorPicker
                  color={color}
                  onChange={(color) => {
                    setColor(color);
                    setType('');
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
