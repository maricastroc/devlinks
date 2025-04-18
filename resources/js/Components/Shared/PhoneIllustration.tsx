import { useTheme } from '@/contexts/ThemeContext';

export const PhoneIllustration = () => {
  const { currentTheme } = useTheme();

  return (
    <div
      className={`relative align-middle w-[310px] h-[631px] rounded-3xl shadow-2xl border-8 border-gray-800 ${currentTheme?.styles.background}`}
    >
      <div className="absolute top-0 z-10 w-24 h-6 transform -translate-x-1/2 bg-gray-800 rounded-b-lg left-1/2 shadow-[inset_0_-3px_5px_rgba(0,0,0,0.3)]" />

      <div
        className={`absolute inset-0 rounded-2xl overflow-hidden ${currentTheme?.styles.background}`}
      >
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
      </div>

      <div className="absolute right-0 w-1 h-16 bg-gray-700 rounded-l-lg top-24 shadow-[inset_-2px_0_3px_rgba(0,0,0,0.3)]" />
    </div>
  );
};
