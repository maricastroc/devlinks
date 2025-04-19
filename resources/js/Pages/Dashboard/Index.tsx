import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Head } from '@inertiajs/react';
import { DropResult } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import SecondaryButton from '@/Components/Core/SecondaryButton';
import { PhoneMockup } from '@/Components/Shared/PhoneMockup';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeProps } from '@/types/theme';
import { useLinks } from '@/utils/useLinks';
import { LinksSection } from './partials/LinksSection';
import { EmptyLinks } from './partials/EmptyLinks';
import { DEFAULT_THEME } from '@/utils/constants';
import { LinksModal } from './partials/LinksModal';
import useRequest from '@/utils/useRequest';
import { PlatformsData, ProfileData, ThemesData } from '../Profile/Index';
import { validateLinks } from '@/utils/validateLink';
import { scrollToInvalidLink } from '@/utils/scrollToInvalidLink';
import { api } from '@/libs/axios';
import { handleApiError } from '@/utils/handleApiError';
import { SkeletonCard } from './partials/SkeletonCard';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { PhoneMockupModal } from '@/Components/Shared/PhoneMockupModal';

export type FormErrors = Record<
  string | number,
  {
    url?: string;
    platform_id?: string;
    custom_name?: string;
    username?: string;
  }
>;

export default function Dashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  const [isPhoneMockupOpen, setIsPhoneMockupOpen] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const isMobile = useMediaQuery('(max-width: 768px)');

  const { handleChangeTheme } = useTheme();

  const {
    data: profileData,
    isValidating,
    mutate
  } = useRequest<ProfileData>({
    url: `/auth/user`,
    method: 'GET'
  });

  const { data: platformsData } = useRequest<PlatformsData>({
    url: `/platforms`,
    method: 'GET'
  });

  const { data: themesData } = useRequest<ThemesData>({
    url: `/themes`,
    method: 'GET'
  });

  const platforms = platformsData?.platforms || [];

  const themes = themesData?.themes || [];

  const user = profileData?.user || undefined;

  const {
    links,
    setLinks,
    filteredPlatforms,
    handleAddLink,
    handleRemoveLink,
    handleUpdatePlatform,
    handleUpdateCustomName,
    handleUpdateUsername
  } = useLinks(user?.user_links, platforms);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedLinks = [...links];

    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
    setLinks(reorderedLinks);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLinks(links, platforms);

    if (validationErrors && Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      scrollToInvalidLink(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setErrors({});

    try {
      const response = await api.post('/user-links', {
        links: links.map((link, index) => ({
          platform_id: link.platform_id,
          username: link.username,
          order: index + 1,
          custom_name: link?.custom_name
        }))
      });

      if (response?.data?.message) {
        toast?.success(response.data.message);
      }

      mutate();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user?.theme) {
        handleChangeTheme(user.theme);
      } else {
        const defaultTheme = themes.find((theme) => {
          return theme.name === DEFAULT_THEME;
        });

        handleChangeTheme(defaultTheme as ThemeProps);
      }
    }
  }, [user?.theme]);

  useEffect(() => {
    if (user) {
      setLinks(user?.user_links);
    }
  }, [user?.user_links]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      {isSubmitting && <LoadingComponent hasOverlay />}

      <div className="lg:m-6 flex lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6 lg:mt-0">
        <div className="items-start justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <div className="mt-12">
            <PhoneMockup
              username={user?.username}
              bio={user?.bio}
              name={user?.name}
              isLoading={isValidating}
              links={links}
              user={user}
            />
          </div>
        </div>

        <div className="flex flex-col w-full p-4 m-4 mt-6 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
          <PageHeader
            title="Customize your links"
            description="Add/edit/remove links below and then share all your profiles
            with the world!"
          />

          <Dialog.Root open={isLinksModalOpen}>
            <div className="flex items-center justify-center w-full gap-3">
              <SecondaryButton
                disabled={isSubmitting || isValidating}
                onClick={() => setIsLinksModalOpen(true)}
              >
                + Add New Link
              </SecondaryButton>
            </div>
            <LinksModal
              handleAddLink={handleAddLink}
              platforms={filteredPlatforms}
              onClose={() => setIsLinksModalOpen(false)}
            />
          </Dialog.Root>

          {isValidating ? (
            <SkeletonCard />
          ) : links?.length > 0 ? (
            <LinksSection
              links={links}
              filteredPlatforms={filteredPlatforms}
              errors={errors}
              onDragEnd={onDragEnd}
              onRemoveLink={handleRemoveLink}
              onUpdateUsername={handleUpdateUsername}
              onUpdateCustomName={handleUpdateCustomName}
              onUpdatePlatform={handleUpdatePlatform}
            />
          ) : (
            <EmptyLinks />
          )}

          <hr className="my-6 md:my-8" />

          <div className="flex justify-end md:items-end">
            <PrimaryButton
              onClick={submit}
              className="md:w-[6rem]"
              disabled={isSubmitting || isValidating}
            >
              Save
            </PrimaryButton>
          </div>

          {isMobile && (
            <Dialog.Root open={isPhoneMockupOpen}>
              <Dialog.Trigger asChild>
                <SecondaryButton
                  onClick={() => setIsPhoneMockupOpen(true)}
                  className="mt-3 md:hidden"
                >
                  Open Preview
                </SecondaryButton>
              </Dialog.Trigger>
              <PhoneMockupModal
                username={user?.username}
                bio={user?.bio}
                name={user?.name}
                isLoading={isValidating}
                links={links}
                user={user}
                onClose={() => setIsPhoneMockupOpen(false)}
              />
            </Dialog.Root>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
