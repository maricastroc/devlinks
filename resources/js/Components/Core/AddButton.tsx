import clsx from 'clsx';
import { Plus } from 'phosphor-react';

export const AddButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className={clsx(
      'flex items-center justify-center p-2',
      'w-9 h-9 md:h-10 md:w-[3rem]',
      'border rounded-lg cursor-pointer',
      'text-dark-gray hover:text-medium-purple',
      'border-gray-400 hover:border-medium-purple',
      'transition-all duration-150'
    )}
  >
    <Plus size={20} />
  </div>
);
