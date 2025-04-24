import { useEffect, useState, RefObject } from 'react';
import { CardTemplate } from './CardTemplate';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickOutside } from '@/utils/useClickOutside';
import { ColorPicker } from '@/Components/Shared/ColorPicker';
import {
  BORDER_RADIUS_OPTIONS,
  DEFAULT_COLOR,
  EMPTY_COLOR
} from '@/utils/constants';

type Props = {
  user: UserProps;
  theme: ThemeProps | null;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

type CardStyle = {
  type: 'fill' | 'outline' | '';
  borderRadius: string;
};

export default function CardCustomizer({ user, theme, onUpdateUser }: Props) {
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    type: '',
    borderRadius: '0px'
  });

  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);

  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_COLOR);

  const [showColorPicker, setShowColorPicker] = useState(false);

  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const dropdownColorRef = useClickOutside(() => setShowColorPicker(false));

  const dropdownBgColorRef = useClickOutside(() => setShowBgColorPicker(false));

  const { updateThemeStyles } = useTheme();

  const handleLinkCardSelect = async (type: string, borderRadius: string) => {
    if (!user?.theme && !theme) return;

    const updatedTheme = await updateThemeStyles(user?.theme! || theme!, {
      linkCard: {
        borderRadius,
        border: type === 'fill' ? '' : `1px solid ${backgroundColor}`,
        backgroundColor: type === 'fill' ? backgroundColor : '',
        color: selectedColor
      },
      icon: {
        color: selectedColor
      }
    });

    onUpdateUser({ theme: updatedTheme });
  };

  const handleStyleChange = (
    type: 'fill' | 'outline',
    borderRadius: string
  ) => {
    setCardStyle({ type, borderRadius });
    handleLinkCardSelect(type, borderRadius);
  };

  const handleColorChange = async (color: string, isBackground = false) => {
    if (isBackground) {
      setBackgroundColor(color);
    } else {
      setSelectedColor(color);
    }

    if (
      selectedColor?.length === 7 &&
      backgroundColor?.length === 7 &&
      !showColorPicker &&
      !showBgColorPicker &&
      cardStyle?.borderRadius.length > 0 &&
      cardStyle?.type?.length > 0
    ) {
      await handleLinkCardSelect(cardStyle.type, cardStyle.borderRadius);
    }
  };

  const renderColorInput = (
    color: string,
    onChange: (color: string) => void,
    onClick: () => void,
    ref: RefObject<HTMLDivElement>,
    showPicker: boolean,
    pickerChangeHandler: (color: string) => void
  ) => {
    return (
      <div className="flex flex-col" ref={ref}>
        <div className="relative flex items-start">
          <ColorPicker
            isOpen={showPicker}
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
        <div className="mt-2 text-sm font-semibold text-gray-600">
          {cardStyle.type === '' &&
            'Select a button style to apply your color changes.'}
        </div>
      </div>
    );
  };

  const renderCardTemplates = (type: 'fill' | 'outline') => {
    return (
      <div
        className="flex gap-4 mb-6 sm:grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          justifyItems: 'start'
        }}
      >
        {BORDER_RADIUS_OPTIONS.map((radius) => (
          <CardTemplate
            key={`${type}-${radius}`}
            isSelected={
              cardStyle.type === type && cardStyle.borderRadius === radius
            }
            onSelect={() => {
              handleStyleChange(type, radius);
              setCardStyle({
                type: type,
                borderRadius: radius
              });
            }}
            style={{
              backgroundColor: type === 'fill' ? '#000000' : '',
              color: type === 'fill' ? '#000000' : selectedColor,
              border: type === 'outline' ? `solid 1px #000000` : '',
              borderRadius: radius !== '0px' ? radius : undefined
            }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (user?.theme?.is_custom) {
      const linkCard = user.theme.styles?.link_card as any;

      setSelectedColor(linkCard?.color || DEFAULT_COLOR);

      setBackgroundColor(linkCard?.backgroundColor || '');

      setCardStyle({
        type: !linkCard?.backgroundColor?.length ? 'outline' : 'fill',
        borderRadius: linkCard?.borderRadius || '0px'
      });

      if (!linkCard?.backgroundColor?.length) {
        setBackgroundColor(linkCard?.border?.split(' ').pop() || EMPTY_COLOR);
      }
    } else {
      setCardStyle({
        type: '',
        borderRadius: ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const applyChanges = async () => {
      if (
        selectedColor?.length === 7 &&
        backgroundColor?.length === 7 &&
        !showColorPicker &&
        !showBgColorPicker &&
        cardStyle?.borderRadius.length > 0 &&
        cardStyle?.type?.length > 0
      ) {
        await handleLinkCardSelect(cardStyle.type, cardStyle.borderRadius);
      }
    };

    const timer = setTimeout(() => {
      applyChanges();
    }, 500);

    return () => clearTimeout(timer);
  }, [showBgColorPicker, showColorPicker]);

  return (
    <div className="bg-white rounded-lg">
      <h3 className="mb-6 text-xl font-bold sm:mt-8 sm:text-2xl">Buttons</h3>

      <div className="flex flex-col justify-center w-full align-center">
        <p className="mb-2">Fill</p>
        {renderCardTemplates('fill')}

        <p className="mb-2">Outline</p>
        {renderCardTemplates('outline')}
      </div>

      <div>
        <p className="mb-2 font-bold text-md">Button font color</p>
        <div className="relative flex flex-col gap-4 max-w-[18rem]">
          {renderColorInput(
            selectedColor,
            (color) => handleColorChange(color),
            () => setShowColorPicker(!showColorPicker),
            dropdownColorRef as RefObject<HTMLDivElement>,
            showColorPicker,
            (color) => handleColorChange(color)
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 font-bold text-md">Button color</p>
        <div className="flex flex-col gap-4 max-w-[18rem]">
          {renderColorInput(
            backgroundColor,
            (color) => handleColorChange(color, true),
            () => setShowBgColorPicker(!showBgColorPicker),
            dropdownBgColorRef as RefObject<HTMLDivElement>,
            showBgColorPicker,
            (color) => handleColorChange(color, true)
          )}
        </div>
      </div>
    </div>
  );
}
