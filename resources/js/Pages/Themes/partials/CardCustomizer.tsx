import { useEffect, useState, RefObject } from 'react';
import { HexColorPicker } from 'react-colorful';
import { CardTemplate } from './CardTemplate';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickOutside } from '@/utils/useClickOutside';

type Props = {
  user: UserProps;
  theme: ThemeProps | null;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

export default function CardCustomizer({ user, theme, onUpdateUser }: Props) {
  const [type, setType] = useState<'fill' | 'outline' | '' | null>(null);

  const [borderRadius, setBorderRadius] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>('#3D444B');

  const [backgroundColor, setBackgroundColor] = useState<string>('#3D444B');

  const [showColorPicker, setShowColorPicker] = useState(false);

  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const dropdownColorRef = useClickOutside(() => {
    setShowColorPicker(false);
  });

  const dropdownBgColorRef = useClickOutside(() => {
    setShowBgColorPicker(false);
  });

  const { updateThemeStyles } = useTheme();

  const handleLinkCardSelect = async (type: string, borderRadius: string) => {
    if (user?.theme || theme) {
      console.log('Current selectedColor:', selectedColor);
      const updatedTheme = await updateThemeStyles(user?.theme! || theme!, {
        linkCard: {
          borderRadius: borderRadius || '0px',
          border: type === 'fill' ? '' : `1px solid ${backgroundColor}`,
          backgroundColor: type === 'fill' ? backgroundColor : '',
          color: selectedColor
        },
        icon: {
          color: selectedColor
        }
      });

      onUpdateUser({
        theme: updatedTheme
      });
    }
  };

  useEffect(() => {
    if (user && user.theme && user.theme.is_custom === true) {
      setSelectedColor(
        (user.theme.styles?.link_card as any)?.color || '#3D444B'
      );
      setBackgroundColor(
        (user.theme.styles?.link_card as any)?.backgroundColor || '#3D444B'
      );
      setBorderRadius(
        (user.theme.styles?.link_card as any)?.borderRadius || '0px'
      );
      setType(
        (user.theme.styles?.link_card as any)?.backgroundColor === ''
          ? 'outline'
          : 'fill'
      );
    }
  }, []);

  return (
    <div className="bg-white rounded-lg">
      <h3 className="mt-8 mb-6 text-2xl font-bold">Buttons</h3>

      <div className="flex flex-col justify-center w-full align-center">
        <p className="mb-2">Fill</p>
        <div
          className="grid gap-4 mb-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            justifyItems: 'start'
          }}
        >
          <CardTemplate
            isSelected={type === 'fill' && borderRadius === '0px'}
            onSelect={() => {
              setType('fill');
              setBorderRadius('0px');
              handleLinkCardSelect('fill', '0px');
            }}
            style={{
              backgroundColor: `#000000`,
              color: `#000000`
            }}
          />
          <CardTemplate
            isSelected={type === 'fill' && borderRadius === '8px'}
            onSelect={() => {
              setType('fill');
              setBorderRadius('8px');
              handleLinkCardSelect('fill', '8px');
            }}
            style={{
              backgroundColor: `#000000`,
              color: `#000000`,
              borderRadius: '8px'
            }}
          />
          <CardTemplate
            isSelected={type === 'fill' && borderRadius === '16px'}
            onSelect={() => {
              setType('fill');
              setBorderRadius('16px');
              handleLinkCardSelect('fill', '16px');
            }}
            style={{
              backgroundColor: `#000000`,
              color: `#000000`,
              borderRadius: '16px'
            }}
          />
        </div>

        <p className="mb-2">Outline</p>
        <div
          className="grid gap-4 mb-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            justifyItems: 'start'
          }}
        >
          <CardTemplate
            isSelected={type === 'outline' && borderRadius === '0px'}
            onSelect={() => {
              setType('outline');
              setBorderRadius('0px');
              handleLinkCardSelect('outline', '0px');
            }}
            style={{
              backgroundColor: '',
              color: `${selectedColor}`,
              border: `solid 1px #000000`
            }}
          />
          <CardTemplate
            isSelected={type === 'outline' && borderRadius === '8px'}
            onSelect={() => {
              setType('outline');
              setBorderRadius('8px');
              handleLinkCardSelect('outline', '8px');
            }}
            style={{
              backgroundColor: '',
              color: `${selectedColor}`,
              border: `solid 1px #000000`,
              borderRadius: '8px'
            }}
          />
          <CardTemplate
            isSelected={type === 'outline' && borderRadius === '16px'}
            onSelect={() => {
              setType('outline');
              setBorderRadius('16px');
              handleLinkCardSelect('outline', '16px');
            }}
            style={{
              backgroundColor: '',
              color: `${selectedColor}`,
              border: `solid 1px #000000`,
              borderRadius: '16px'
            }}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-bold text-md">Color</p>
        <div className="relative flex flex-col gap-4 max-w-[18rem]">
          <div
            className="flex flex-col"
            ref={dropdownColorRef as RefObject<HTMLDivElement>}
          >
            <div className="relative flex items-start">
              {showColorPicker && (
                <div className="relative">
                  <div className="absolute left-0 z-10 top-[3.6rem]">
                    <HexColorPicker
                      color={selectedColor}
                      onChange={(color) => {
                        setSelectedColor(color);
                        setType('');
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                className="inline-block w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                style={{ backgroundColor: selectedColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              <input
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setType('');
                }}
                className="h-12 p-3 ml-3 bg-gray-100 border border-transparent rounded-lg focus:border-medium-purple focus:ring-medium-purple"
                type="text"
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {type === '' &&
                'Select a button style to apply your color changes.'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 font-bold text-md">Background color</p>
        <div className="flex flex-col gap-4 max-w-[18rem]">
          <div
            className="flex flex-col"
            ref={dropdownBgColorRef as RefObject<HTMLDivElement>}
          >
            <div className="flex items-start">
              {showBgColorPicker && (
                <div className="relative">
                  <div className="absolute left-0 z-10 top-[3.6rem]">
                    <HexColorPicker
                      color={backgroundColor}
                      onChange={(color) => {
                        setBackgroundColor(color);
                        setType('');
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                className="inline-block w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                style={{ backgroundColor: backgroundColor }}
                onClick={() => setShowBgColorPicker(!showBgColorPicker)}
              />
              <input
                value={backgroundColor}
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  setType('');
                }}
                className="h-12 p-3 ml-3 bg-gray-100 border border-transparent rounded-lg focus:border-medium-purple focus:ring-medium-purple"
                type="text"
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {type === '' &&
                'Select a button style to apply your color changes.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
