export const HeaderButton = ({
  onClick,
  text,
  disabled = false,
  variant = 'solid'
}: {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
}) => {
  const baseClasses =
    'w-[140px] sm:w-auto gap-1 p-3 px-4 disabled:cursor-not-allowed flex flex-nowrap items-center justify-center rounded-lg text-md font-semibold transition duration-150 ease-in-out whitespace-nowrap';

  const variants = {
    solid: 'bg-medium-purple text-white',
    outline:
      'bg-transparent border border-medium-purple text-medium-purple hover:bg-medium-purple/10'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <p className="text-center truncate">{text}</p>
    </button>
  );
};
