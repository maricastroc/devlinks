import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { SearchInput } from '@/Components/Core/SearchInput';
import { FONTS } from '@/utils/constants';
import { ModalHeader } from '@/Components/Shared/ModalHeader';
import { MagnifyingGlass } from 'phosphor-react';
import { UserProps } from '@/types/user';

type Props = {
  onClose: () => void;
  selectedColor: string;
  selectedFont: { label: string; value: string } | undefined;
  onSelect: (font: { label: string; value: string }, color: string) => void;
  onUpdateUser: (updatedUser: Partial<UserProps>) => void;
};
export const FontsModal = ({
  selectedFont,
  selectedColor,
  onClose,
  onSelect,
  onUpdateUser
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFonts = FONTS.filter((font) =>
    font.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-[9990] bg-black bg-opacity-70"
        onClick={onClose}
      />
      <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-white rounded-[1.5rem] shadow-lg  p-4 md:max-w-[620px] md:p-8">
        <ModalHeader
          showBackButton={false}
          onClose={onClose}
          title="Select a Font"
        />
        <Dialog.Description className="flex flex-col w-full">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search"
          />

          <div className="flex flex-col h-[60vh] max-h-[20rem] overflow-y-auto custom-scrollbar">
            {filteredFonts.length > 0 ? (
              filteredFonts.map((font) => (
                <button
                  onClick={() => {
                    onSelect(font, selectedColor);
                    onUpdateUser({
                      custom_font: font.value
                    });

                    onClose();
                  }}
                  className={`p-3 ${selectedFont?.label === font.label ? 'text-medium-purple font-semibold' : 'text-dark-gray'} flex items-start rounded-lg bg-transparent hover:bg-gray-100 font-${font.value}`}
                >
                  {font.label}
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-gray-500">
                <MagnifyingGlass size={24} className="mb-2" />
                <p className="text-sm">No fonts available</p>
              </div>
            )}
          </div>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
