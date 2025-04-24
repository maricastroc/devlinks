import { act, useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
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
import FontCustomizer from './partials/FontCustomizer';
import { MobileFooter } from './partials/MobileFooter';
import { Modal } from './partials/Modal';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { TemplatesSection } from './partials/TemplatesSection';

export default function Themes() {
  const [user, setUser] = useState<UserProps | null>(null);

  const [activeModal, setActiveModal] = useState('');

  const { handleThemeSelect, isLoading, currentTheme } = useTheme();

  const customizeSectionRef = useRef<HTMLDivElement>(null);

  const isSmallSize = useMediaQuery('(max-width: 640px)');

  const isMobile = useMediaQuery('(max-width: 767px)');

  const { data: profileData, isValidating } = useRequest<ProfileData>({
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
  console.log(activeModal);
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Themes
        </h2>
      }
    >
      <Head title="Themes" />

      {user && isMobile && (
        <Dialog.Root
          open={activeModal === 'background'}
          onOpenChange={(open) => {
            if (!open) setActiveModal('');
          }}
        >
          <Modal onClose={() => setActiveModal('')}>
            <BackgroundCustomizer
              user={user}
              onUpdateUser={handleUpdateUser}
              theme={user?.theme || currentTheme}
            />
          </Modal>
        </Dialog.Root>
      )}

      {user && isMobile && (
        <Dialog.Root
          open={activeModal === 'fonts'}
          onOpenChange={(open) => {
            if (!open) setActiveModal('');
          }}
        >
          <Modal onClose={() => setActiveModal('')}>
            <div className="mt-6">
              <FontCustomizer
                user={user}
                onUpdateUser={handleUpdateUser}
                theme={user?.theme || currentTheme}
              />
            </div>
          </Modal>
        </Dialog.Root>
      )}

      {user && isMobile && (
        <Dialog.Root
          open={activeModal === 'templates'}
          onOpenChange={(open) => {
            if (!open) setActiveModal('');
          }}
        >
          <Modal hasOverflow={isSmallSize} onClose={() => setActiveModal('')}>
            <TemplatesSection
              customizeSectionRef={customizeSectionRef}
              isLoading={isValidatingThemes || isLoading || isValidating}
              themes={themes}
              handleThemeSelect={handleThemeSelect}
              handleUpdateUser={handleUpdateUser}
              setUser={setUser}
              user={user}
            />
          </Modal>
        </Dialog.Root>
      )}

      {user && isMobile && (
        <Dialog.Root
          open={activeModal === 'buttons'}
          onOpenChange={(open) => {
            if (!open) setActiveModal('');
          }}
        >
          <Modal onClose={() => setActiveModal('')}>
            <div className="mt-6">
              <CardCustomizer
                user={user}
                onUpdateUser={handleUpdateUser}
                theme={user?.theme || currentTheme}
              />
            </div>
          </Modal>
        </Dialog.Root>
      )}

      {isLoading && <LoadingComponent hasOverlay />}
      <div className="lg:m-6 flex items-start flex-col h-full lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6 lg:mt-0">
        <div className="items-start justify-center w-full overflow-y-scroll bg-white rounded-md md:pt-10 md:overflow-y-hidden md:hidden lg:flex md:p-10">
          <div className="flex items-start justify-center w-full h-full overflow-y-scroll md:items-center md:max-h-full md:overflow-y-hidden lg:mt-12">
            <PhoneMockup
              isSmaller={isMobile}
              username={user?.username}
              bio={user?.bio}
              name={user?.name}
              isLoading={isValidating || isLoading}
              links={user?.user_links}
              user={user as UserProps}
            />
          </div>
        </div>

        <div className="flex-col hidden w-full p-4 m-4 bg-white rounded-md md:flex lg:flex md:m-0 md:p-10">
          <PageHeader
            title="Select a Theme"
            description="Customize your DevLinks with one of our ready-made themes"
          />

          <div className="w-full pb-10 overflow-x-hidden overflow-y-scroll custom-scrollbar md:max-h-[28rem] lg:max-h-[35.15rem]">
            <TemplatesSection
              customizeSectionRef={customizeSectionRef}
              isLoading={isValidatingThemes || isLoading || isValidating}
              themes={themes}
              handleThemeSelect={handleThemeSelect}
              handleUpdateUser={handleUpdateUser}
              setUser={setUser}
              user={user}
            />

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
                <>
                  <BackgroundCustomizer
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    theme={user?.theme || currentTheme}
                  />
                  <CardCustomizer
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    theme={user?.theme || currentTheme}
                  />
                  <FontCustomizer
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    theme={user?.theme || currentTheme}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <MobileFooter
          activeModal={activeModal}
          onSelect={(value) => setActiveModal(value)}
        />
      </div>
      {isLoading && <LoadingComponent hasOverlay />}
    </AuthenticatedLayout>
  );
}
