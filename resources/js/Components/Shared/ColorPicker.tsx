import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  isOpen: boolean;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  isOpen,
  color,
  onChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="relative">
      <div className="absolute left-0 z-10 top-[3.6rem]">
        <HexColorPicker color={color} onChange={onChange} />
      </div>
    </div>
  );
};
