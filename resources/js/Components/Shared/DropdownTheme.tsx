import { ThemeProps } from '@/types/theme';

type Props = {
  handleSelect: (item: ThemeProps) => void;
  currentTheme: ThemeProps;
  themes: ThemeProps[];
  isPublicPage?: boolean;
};

export const DropdownTheme = ({
  handleSelect,
  themes,
  currentTheme,
  isPublicPage = true
}: Props) => {
  return (
    <div
      className={`w-[220px] absolute z-[9998] py-1 max-h-[16rem] flex flex-col overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-md ${isPublicPage ? 'top-[3.5rem] right-[0.2rem]' : 'top-[15rem] lg:top-[13.6rem] right-[4.5rem]'}`}
    >
      {themes?.map((theme) => (
        <div key={theme.name}>
          <div
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              if (theme.name !== currentTheme.name) {
                handleSelect(theme);
              }
            }}
          >
            <span
              className={`w-6 h-6 rounded-full bg-[${theme.styles.color}]`}
            ></span>
            <span
              className={`text-dark-gray ${currentTheme.name === theme.name && 'font-semibold'}`}
            >
              {theme.name}
            </span>
          </div>
          <hr className="mx-2 text-light-gray" />
        </div>
      ))}
    </div>
  );
};
