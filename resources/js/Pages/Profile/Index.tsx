import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/Shared/PhoneMockup';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { ImageCropper } from '@/Components/Shared/ImageCropper';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { PlatformProps } from '@/types/platform';
import { ThemeProps } from '@/types/theme';
import { DEFAULT_THEME } from '@/utils/constants';
import useRequest from '@/utils/useRequest';
import { ProfileSection } from './partials/ProfileSection';
import { SocialMediaSection } from './partials/SocialMediaSection';
import { SocialMediaModal } from './partials/SocialMediaModal';
import {
  FormSection,
  ProfileFormSchema,
  profileFormSchema
} from './partials/FormSection';

type Props = {
  platforms: PlatformProps[];
  user: UserProps;
  themes: ThemeProps[];
};

export interface SocialLinksResponse {
  socialLinks: UserLinkProps[];
  count: number;
}

export default function Profile({ user, platforms, themes }: Props) {
  const filteredPlatforms = platforms.filter(
    (platform) => platform.is_social === true
  );

  const { handleChangeTheme } = useTheme();

  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [showCropper, setShowCropper] = useState(false);

  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const { data, mutate } = useRequest<SocialLinksResponse>({
    url: `/social-links`,
    method: 'GET'
  });

  const handleCroppedImage = (croppedImage: string) => {
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        setValue('avatar_url', file);
        setPhotoPreview(croppedImage);
        setShowCropper(false);
      });
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      username: user?.username || ''
    }
  });

  useEffect(() => {
    if (user?.theme) {
      handleChangeTheme(user.theme);
    } else {
      const defaultTheme = themes.find((theme) => {
        return theme.name === DEFAULT_THEME;
      });

      handleChangeTheme(defaultTheme as ThemeProps);
    }
  }, [user]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />
      {isSubmitting && <LoadingComponent hasOverlay />}

      {showCropper && originalImage && (
        <ImageCropper
          src={originalImage}
          onCrop={handleCroppedImage}
          aspectRatio={1}
          onClose={() => setShowCropper(false)}
        />
      )}

      <div className="lg:m-6 flex lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6 lg:mt-0">
        <div className="items-center justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <PhoneMockup
            links={user.user_links}
            socialLinks={data?.socialLinks}
            name={watch().name}
            photoPreview={photoPreview}
            user={user}
          />
        </div>
        <div className="flex flex-col w-full p-6 m-4 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
          <PageHeader
            title="Profile Details"
            description="Add details to personalize your profile"
            themes={themes}
          />

          <ProfileSection title="Connect your social media" wrap>
            <Dialog.Root open={isSocialMediaModalOpen}>
              <Dialog.Trigger asChild>
                <SocialMediaSection
                  onClick={() => setIsSocialMediaModalOpen(true)}
                  platforms={filteredPlatforms}
                />
              </Dialog.Trigger>
              <SocialMediaModal
                mutate={mutate}
                platforms={filteredPlatforms}
                onClose={() => setIsSocialMediaModalOpen(false)}
              />
            </Dialog.Root>
          </ProfileSection>

          <FormSection
            setPhotoPreview={setPhotoPreview}
            photoPreview={photoPreview}
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            user={user}
            isSubmitting={isSubmitting}
            setShowCropper={(value) => setShowCropper(value)}
            setOriginalImage={(value) => setOriginalImage(value)}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
