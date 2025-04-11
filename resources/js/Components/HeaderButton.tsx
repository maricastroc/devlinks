export const HeaderButton = ({
  onClick,
  icon,
  text,
  className,
  textVisibility = 'always',
  disabled = false
}: {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  className: string;
  textVisibility?: 'always' | 'md-only';
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`gap-2 h-[3.2rem] min-w-[3.5rem] disabled:cursor-not-allowed w-auto inline-flex items-center justify-center rounded-lg px-4 py-3 text-md font-semibold transition duration-150 ease-in-out focus:outline-none ${className}`}
  >
    {icon}
    {textVisibility === 'always' ? (
      <p className="text-center">{text}</p>
    ) : (
      <p className="hidden text-center md:block">{text}</p>
    )}
  </button>
);
