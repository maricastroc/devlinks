import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  FormSection,
  ProfileFormSchema,
  profileFormSchema
} from './partials/FormSection';
import { SkeletonCard } from './partials/SkeletonCard';
import 'react-loading-skeleton/dist/skeleton.css';

export interface ThemesData {
  themes: ThemeProps[];
}

export interface ProfileData {
  user: UserProps;
}

export interface SocialLinksData {
  socialLinks: UserLinkProps[];
}

export interface PlatformsData {
  platforms: PlatformProps[];
}

export default function Profile() {
  const { handleChangeTheme } = useTheme();

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [showCropper, setShowCropper] = useState(false);

  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const { data: socialLinksData, mutate } = useRequest<SocialLinksData>({
    url: `/social-links`,
    method: 'GET'
  });

  const {
    data: profileData,
    isValidating,
    mutate: mutateProfileData
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

  const socialLinks = socialLinksData?.socialLinks || [];

  const platforms = platformsData?.platforms || [];

  const themes = themesData?.themes || [];

  const user = profileData?.user || undefined;

  const handleCroppedImage = (croppedImage: string) => {
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'avatar.jpg', {
          type: 'image/jpeg'
        });
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
    const theme = user?.theme || themes?.find((t) => t.name === DEFAULT_THEME);

    if (theme) handleChangeTheme(theme);
  }, [profileData, themesData]);

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
        <div className="items-start justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <div className="mt-12">
            <PhoneMockup
              links={user?.user_links}
              socialLinks={socialLinks}
              name={watch().name}
              bio={watch().bio}
              photoPreview={photoPreview}
              isLoading={isValidating || isSubmitting}
              user={user}
            />
          </div>
        </div>
        <div className="flex flex-col w-full p-4 m-4 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
          <PageHeader
            title="Profile Details"
            description="Add details to personalize your profile"
          />

          {isValidating || isSubmitting ? (
            <SkeletonCard />
          ) : (
            <>
              <ProfileSection title="Connect your social media" wrap>
                <SocialMediaSection
                  mutate={mutate}
                  socialLinks={socialLinks}
                  platforms={platforms}
                />
              </ProfileSection>

              <FormSection
                setPhotoPreview={setPhotoPreview}
                photoPreview={photoPreview}
                control={control}
                handleSubmit={handleSubmit}
                mutate={mutateProfileData}
                errors={errors}
                setValue={setValue}
                user={profileData?.user}
                isSubmitting={isSubmitting}
                setShowCropper={(value) => setShowCropper(value)}
                setOriginalImage={(value) => setOriginalImage(value)}
              />
            </>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
