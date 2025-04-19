import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/Shared/PhoneMockup';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import useRequest from '@/utils/useRequest';
import { ProfileData, ThemesData } from '../Profile/Index';
import 'react-loading-skeleton/dist/skeleton.css';

import { useThemeEffect } from '@/utils/useThemeEffect';
import { ThemeMockup } from '@/Components/Shared/ThemeMockup';
import { ThemeMockupSkeleton } from '@/Components/Shared/ThemeMockupSkeleton';
import { ThemeProps } from '@/types/theme';
import { api } from '@/libs/axios';
import toast from 'react-hot-toast';
import { UserProps } from '@/types/user';

export default function Themes() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleThemeSelect, handleChangeTheme, currentTheme } = useTheme();

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

  console.log(user);

  useEffect(() => {
    if (profileData?.user) {
      setUser(profileData?.user);
    }
  }, []);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Themes
        </h2>
      }
    >
      <Head title="Themes" />

      {isSubmitting && <LoadingComponent hasOverlay />}
      <div className="lg:m-6 flex h-full lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6 lg:mt-0">
        <div className="items-start justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <div className="mt-12">
            <PhoneMockup
              username={user?.username}
              bio={user?.bio}
              name={user?.name}
              isLoading={isValidating || isSubmitting}
              links={user?.user_links}
              user={user as UserProps}
            />
          </div>
        </div>

        <div className="flex flex-col w-full p-4 m-4 bg-white rounded-md md:mt-0 lg:m-0 md:m-6 md:p-10">
          <PageHeader
            title="Select a Theme"
            description="Customize your DevLinks with one of our ready-made themes"
            themes={themes}
          />

          <div className="w-full pb-10">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                justifyItems: 'start'
              }}
            >
              {isValidatingThemes || isSubmitting || isValidating
                ? Array.from({ length: 8 }).map((_, index) => (
                    <ThemeMockupSkeleton key={index} />
                  ))
                : themes?.map((theme) => (
                    <ThemeMockup
                      key={theme.id}
                      onClick={() => {
                        handleThemeSelect(theme);
                        setUser((prev) => ({ ...prev!, theme }));
                        mutate();
                      }}
                      theme={theme}
                      isSelected={theme.name === user?.theme?.name}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
      {isSubmitting && <LoadingComponent hasOverlay />}
    </AuthenticatedLayout>
  );
}
