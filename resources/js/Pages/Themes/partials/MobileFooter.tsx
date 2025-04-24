import { Image, PaintBrushBroad, Rows, TextAa } from 'phosphor-react';

type Props = {
  activeModal: string;
  onSelect: (value: string) => void;
};

export const MobileFooter = ({ activeModal, onSelect }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center w-full py-2 shadow-sm bg-light-gray justify-evenly md:hidden">
      <div className="flex items-center w-full justify-evenly max-w-[25rem]">
        <button
          onClick={() => onSelect('templates')}
          className="flex flex-col items-center justify-center w-full gap-1 transition-colors active:bg-gray-100"
        >
          <PaintBrushBroad size={20} className="text-gray-700" />
          <p className="text-xs font-medium text-gray-700">Templates</p>
        </button>

        <div className="h-6 border-l border-gray-200" />

        <button
          onClick={() => onSelect('buttons')}
          className="flex flex-col items-center justify-center w-full gap-1 transition-colors active:bg-gray-100"
        >
          <Rows size={20} className="text-gray-700" />
          <p className="text-xs font-medium text-gray-700">Buttons</p>
        </button>

        <div className="h-6 border-l border-gray-200" />

        <button
          onClick={() => onSelect('background')}
          className="flex flex-col items-center justify-center w-full gap-1 transition-colors active:bg-gray-100"
        >
          <Image size={20} className="text-gray-700" />
          <p className="text-xs font-medium text-gray-700">Background</p>
        </button>

        <div className="h-6 border-l border-gray-200" />

        <button
          onClick={() => onSelect('fonts')}
          className="flex flex-col items-center justify-center w-full gap-1 transition-colors active:bg-gray-100"
        >
          <TextAa size={20} className="text-gray-700" />
          <p className="text-xs font-medium text-gray-700">Fonts</p>
        </button>
      </div>
    </div>
  );
};
