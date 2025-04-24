import { ThemeProps } from '@/types/theme';
import { CustomMockup } from './CustomMockup';
import { ThemeMockup } from './ThemeMockup';
import { ThemeMockupSkeleton } from './ThemeMockupSkeleton';
import { UserProps } from '@/types/user';
import { useMediaQuery } from '@/utils/useMediaQuery';

type Props = {
  user: UserProps | null;
  themes: ThemeProps[] | null;
  isLoading: boolean;
  customizeSectionRef: React.RefObject<HTMLDivElement>;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  handleThemeSelect: (theme: ThemeProps) => void;
  handleUpdateUser: (updatedUser: Partial<UserProps>) => void;
};

export const TemplatesSection = ({
  handleUpdateUser,
  handleThemeSelect,
  setUser,
  user,
  themes,
  isLoading,
  customizeSectionRef
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div className="flex flex-col pr-6 sm:pr-0">
      <h3 className="mt-4 mb-6 text-xl font-bold sm:mt-0 sm:text-2xl">
        Templates
      </h3>
      <div
        className="flex overflow-x-scroll sm:overflow-x-hidden gap-3 sm:grid sm:gap-[1.2rem]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))',
          justifyItems: 'start'
        }}
      >
        {isLoading ? (
          Array.from({ length: 14 }).map((_, index) => (
            <ThemeMockupSkeleton key={index} />
          ))
        ) : (
          <>
            {!isMobile && (
              <CustomMockup
                onClick={() => {
                  customizeSectionRef.current?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              />
            )}
            {themes?.map((theme) => (
              <ThemeMockup
                key={theme.id}
                onClick={() => {
                  handleThemeSelect(theme);
                  setUser((prev) => ({ ...prev!, theme }));
                }}
                onUpdateUser={handleUpdateUser}
                theme={theme}
                isSelected={
                  theme.name === user?.theme?.name && !user?.theme.is_custom
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
