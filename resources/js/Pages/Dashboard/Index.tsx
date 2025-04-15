import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
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
import { PlatformProps } from '@/types/platform';
import { UserProps } from '@/types/user';
import { ThemeProps } from '@/types/theme';
import { validateLinks } from '@/utils/validateLink';
import { useLinks } from '@/utils/useLinks';
import { handleReqError } from '@/utils/handleReqError';
import { LinksSection } from './partials/LinksSection';
import { EmptyLinks } from './partials/EmptyLinks';
import { DEFAULT_THEME } from '@/utils/constants';
import { LinksModal } from './partials/LinksModal';

type Props = {
  platforms: PlatformProps[];
  themes: ThemeProps[];
  user: UserProps;
};

export type FormErrors = Record<
  string | number,
  { url?: string; platform_id?: string; custom_name?: string }
>;

export default function Dashboard({ platforms, user, themes }: Props) {
  const [processing, setProcessing] = useState(false);

  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const { currentTheme, handleChangeTheme } = useTheme();

  const {
    links,
    setLinks,
    filteredPlatforms,
    handleAddLink,
    handleRemoveLink,
    handleUpdatePlatform,
    handleUpdateCustomName,
    handleUpdateUrl
  } = useLinks(user?.user_links, platforms);

  const onDragEnd = (result: DropResult) => {
    console.log('hi', result);
    if (!result.destination) return;

    const reorderedLinks = [...links];

    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
    console.log(reorderedLinks);
    setLinks(reorderedLinks);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLinks(links, platforms);

    if (validationErrors && Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setProcessing(true);

    setErrors({});

    try {
      const response = await axios.post('/user-links', {
        links: links.map((link, index) => ({
          platform_id: link.platform_id,
          url: link.url,
          order: index + 1,
          custom_name: link?.custom_name
        }))
      });

      if (response?.data?.message) {
        toast?.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        handleReqError(error);
      }
    } finally {
      setProcessing(false);
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

  return (
    currentTheme && (
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Dashboard
          </h2>
        }
      >
        <Head title="Dashboard" />

        {processing && <LoadingComponent hasOverlay />}

        <div className="lg:m-6 flex lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6 lg:mt-0">
          <div className="items-center justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
            <PhoneMockup links={links} user={user} />
          </div>

          <div className="flex flex-col w-full p-4 m-4 mt-6 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
            <PageHeader
              title="Customize your links"
              description="Add/edit/remove links below and then share all your profiles
            with the world!"
              themes={themes}
            />

            <Dialog.Root open={isLinksModalOpen}>
              <div className="flex items-center justify-center w-full gap-3">
                <SecondaryButton onClick={() => setIsLinksModalOpen(true)}>
                  + Add New Link
                </SecondaryButton>
              </div>
              <LinksModal
                handleAddLink={handleAddLink}
                platforms={platforms}
                onClose={() => setIsLinksModalOpen(false)}
              />
            </Dialog.Root>

            {links?.length > 0 ? (
              <LinksSection
                links={links}
                filteredPlatforms={filteredPlatforms}
                errors={errors}
                onDragEnd={onDragEnd}
                onRemoveLink={handleRemoveLink}
                onUpdateUrl={handleUpdateUrl}
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
                disabled={processing}
              >
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    )
  );
}
