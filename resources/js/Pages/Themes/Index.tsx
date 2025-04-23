import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/Shared/PhoneMockup';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import useRequest from '@/utils/useRequest';
import { ProfileData, ThemesData } from '../Profile/Index';
import { ThemeMockupSkeleton } from '@/Pages/Themes/partials/ThemeMockupSkeleton';
import { UserProps } from '@/types/user';
import 'react-loading-skeleton/dist/skeleton.css';
import BackgroundCustomizer from './partials/BackgroundCustomizer';
import CardCustomizer from './partials/CardCustomizer';
import { ThemeMockup } from './partials/ThemeMockup';
import { CustomMockup } from './partials/CustomMockup';

export default function Themes() {
  const [user, setUser] = useState<UserProps | null>(null);

  const { handleThemeSelect, isLoading, currentTheme } = useTheme();

  const customizeSectionRef = useRef<HTMLDivElement>(null);

  const {
    data: profileData,
    isValidating,
    mutate
  } = useRequest<ProfileData>({
    url: `/auth/user`,
    method: 'GET'
  });

  const { data: themesData, isValidating: isValidatingThemes } =
    useRequest<ThemesData>({
      url: `/themes`,
      method: 'GET'
    });

  const themes = themesData?.themes || [];

  const handleUpdateUser = useCallback((updatedUser: Partial<UserProps>) => {
    setUser((prev) => ({ ...prev!, ...updatedUser }));
  }, []);

  useEffect(() => {
    if (profileData?.user) {
      setUser(profileData?.user);
    }
  }, [profileData]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Themes
        </h2>
      }
    >
      <Head title="Themes" />

      {isLoading && <LoadingComponent hasOverlay />}
      <div className="lg:m-6 flex h-full lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6 lg:mt-0">
        <div className="items-start justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <div className="mt-12">
            <PhoneMockup
              username={user?.username}
              bio={user?.bio}
              name={user?.name}
              isLoading={isValidating || isLoading}
              links={user?.user_links}
              user={user as UserProps}
            />
          </div>
        </div>

        <div className="flex flex-col w-full p-4 m-4 bg-white rounded-md md:mt-0 lg:m-0 md:m-6 md:p-10">
          <PageHeader
            title="Select a Theme"
            description="Customize your DevLinks with one of our ready-made themes"
          />

          <div className="w-full pb-10 overflow-x-hidden overflow-y-scroll custom-scrollbar lg:max-h-[40rem]">
            <div
              className="grid gap-[1.2rem]"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))',
                justifyItems: 'start'
              }}
            >
              {isValidatingThemes || isLoading || isValidating ? (
                Array.from({ length: 14 }).map((_, index) => (
                  <ThemeMockupSkeleton key={index} />
                ))
              ) : (
                <>
                  <CustomMockup
                    onClick={() => {
                      customizeSectionRef.current?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                  />
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
                        theme.name === user?.theme?.name &&
                        !user?.theme.is_custom
                      }
                    />
                  ))}
                </>
              )}
            </div>

            <div ref={customizeSectionRef}>
              <h3
                className="mt-8 mb-3 text-2xl font-bold"
                id="customize_section"
              >
                Custom appearance
              </h3>
              <p
                className="mb-8 md:mb-10 text-medium-gray"
                id="customize_section"
              >
                Completely customize your Devlinks profile. Change your
                background with colors or gradients. Choose a button style and
                change the typeface color.
              </p>
              {user && (
                <BackgroundCustomizer
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  theme={user?.theme || currentTheme}
                />
              )}
              {user && (
                <CardCustomizer
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  theme={user?.theme || currentTheme}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingComponent hasOverlay />}
    </AuthenticatedLayout>
  );
}
