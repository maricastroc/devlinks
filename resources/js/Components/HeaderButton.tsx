export const HeaderButton = ({
  onClick,
  icon,
  text,
  largeText,
  className,
  disabled = false
}: {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  largeText: string;
  className: string;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-transparent md:hover:bg-opacity-20 gap-2 h-[3.2rem] disabled:cursor-not-allowed flex flex-nowrap items-center justify-center rounded-lg md:px-4 md:py-3 text-md font-semibold transition duration-150 ease-in-out focus:outline-none whitespace-nowrap ${className}`}
  >
    {icon}
    <p className="text-center truncate md:hidden">{text}</p>
    <p className="hidden text-center truncate md:block">{largeText}</p>
  </button>
);
