import clsx from 'clsx';
import { Plus } from 'phosphor-react';

export const AddButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex items-center justify-center p-2',
      'w-11 h-11',
      'border rounded-lg cursor-pointer',
      'text-medium-purple hover:text-medium-purple',
      'border-medium-purple hover:bg-purple-hover hover:bg-opacity-40 hover:border-solid',
      'transition-all duration-150'
    )}
  >
    <Plus size={20} />
  </button>
);
