import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/Shared/PhoneMockup';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import useRequest from '@/utils/useRequest';
import { ProfileData, ThemesData } from '../Profile/Index';
import { ThemeMockup } from '@/Components/Shared/ThemeMockup';
import { ThemeMockupSkeleton } from '@/Components/Shared/ThemeMockupSkeleton';
import { UserProps } from '@/types/user';
import 'react-loading-skeleton/dist/skeleton.css';
import BackgroundCustomizer, {
  generateGradientColors
} from './BackgroundCustomizer';

export default function Themes() {
  const [user, setUser] = useState<UserProps | null>(null);

  const [type, setType] = useState(null);

  const { handleThemeSelect, updateBackgroundOnly, isLoading, currentTheme } =
    useTheme();

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

  const handleBackgroundSelect = async (
    color: string,
    type: 'solid' | 'gradient',
    direction?: string
  ) => {
    let value: string;

    if (type === 'solid') {
      value = color;
    } else {
      const [base, mid, light] = generateGradientColors(color);

      switch (direction) {
        case 'bg-gradient-to-t':
          value = `linear-gradient(to top, ${base}, ${light})`;
          break;
        case 'bg-gradient-to-b':
          value = `linear-gradient(to bottom, ${base}, ${light})`;
          break;
        case 'angular':
          value = `linear-gradient(135deg, ${base}, ${mid}, ${light})`;
          break;
        default:
          value = `linear-gradient(to bottom, ${base}, ${light})`;
      }
    }

    if (user?.theme || currentTheme) {
      const updatedTheme = await updateBackgroundOnly(
        direction || 'solid',
        color,
        user?.theme! || currentTheme!,
        { type, value }
      );

      setUser((prev) => ({
        ...prev!,
        theme: updatedTheme,
        custom_bg_color: color,
        custom_bg_type: direction || 'solid'
      }));
    }
  };

  const debouncedHandleBackgroundSelect = useMemo(
    () => debounce(handleBackgroundSelect, 500),
    [handleBackgroundSelect]
  );

  useEffect(() => {
    return () => {
      debouncedHandleBackgroundSelect.cancel();
    };
  }, [debouncedHandleBackgroundSelect]);

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
            themes={themes}
          />

          <div className="w-full pb-10 overflow-y-scroll custom-scrollbar lg:max-h-[40rem]">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                justifyItems: 'start'
              }}
            >
              {isValidatingThemes || isLoading || isValidating
                ? Array.from({ length: 8 }).map((_, index) => (
                    <ThemeMockupSkeleton key={index} />
                  ))
                : themes?.map((theme) => (
                    <ThemeMockup
                      key={theme.id}
                      onClick={() => {
                        handleThemeSelect(theme);
                        setUser((prev) => ({ ...prev!, theme }));
                      }}
                      theme={theme}
                      isSelected={theme.name === user?.theme?.name}
                    />
                  ))}
            </div>
            <h3 className="mt-8 mb-3 text-2xl font-bold">Custom appearance</h3>
            <p className="mb-8 md:mb-10 text-medium-gray">
              Completely customize your Devlinks profile. Change your background
              with colors or gradients. Choose a button style and change the
              typeface color.
            </p>
            <BackgroundCustomizer
              user={user}
              onSelect={handleBackgroundSelect}
              theme={user?.theme || currentTheme}
            />
          </div>
        </div>
      </div>
      {isLoading && <LoadingComponent hasOverlay />}
    </AuthenticatedLayout>
  );
}
