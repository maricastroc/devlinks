import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { z } from 'zod';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/Shared/PhoneMockup';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import { PhotoInput } from '@/Pages/Profile/partials/PhotoInput';
import { InputField } from '@/Components/Core/InputField';
import { FormError } from '@/Components/Core/FormError';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { handleReqError } from '@/utils/handleReqError';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import toast from 'react-hot-toast';
import { ImageCropper } from '@/Components/Shared/ImageCropper';
import { ThemeProps } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { PageHeader } from '@/Components/Shared/PageHeader';
import { DEFAULT_THEME } from '@/utils/constants';
import { PlatformProps } from '@/types/platform';
import { ProfileSection } from './partials/ProfileSection';
import { SocialMediaSection } from './partials/SocialMediaSection';
import { SocialMediaModal } from './partials/SocialMediaModal';
import useRequest from '@/utils/useRequest';

type Props = {
  platforms: PlatformProps[];
  user: UserProps;
  themes: ThemeProps[];
};

export interface SocialLinksResponse {
  socialLinks: UserLinkProps[];
  count: number;
}

const profileFormSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  username: z
    .string()
    .min(8, { message: 'Username must have at least 3 characters' }),
  avatar_url: z
    .custom<File>((file) => file instanceof File && file.size > 0)
    .optional()
});

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export default function Profile({ user, platforms, themes }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const filteredPlatforms = platforms.filter(
    (platform) => platform.is_social === true
  );

  const { handleChangeTheme } = useTheme();

  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormSchema) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('_method', 'PUT');

    if (data.avatar_url) {
      formData.append('avatar_url', data.avatar_url);
    }

    try {
      setIsLoading(true);

      const response = await axios.post('/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        toast?.success(response.data.message);
      }
    } catch (error) {
      handleReqError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('name', user?.name || '');

      if (user?.avatar_url) {
        setPhotoPreview(user.avatar_url as string);
      }

      if (user?.theme) {
        handleChangeTheme(user.theme);
      } else {
        const defaultTheme = themes.find((theme) => {
          return theme.name === DEFAULT_THEME;
        });

        handleChangeTheme(defaultTheme as ThemeProps);
      }
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
      {(isLoading || isSubmitting) && <LoadingComponent hasOverlay />}

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-6"
          >
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
            <ProfileSection title="Profile picture">
              <PhotoInput
                isProfileScreen
                withMarginTop={false}
                photoPreview={photoPreview || (user?.avatar_url as string)}
                onChange={handleAvatarChange}
                inputFileRef={inputFileRef as React.RefObject<HTMLInputElement>}
                isLoading={isLoading}
              />
              {errors.avatar_url && (
                <FormError error={errors.avatar_url.message} />
              )}
            </ProfileSection>

            <div className="flex flex-col p-5 rounded-md md:p-7 bg-light-gray">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Your name"
                    id="name"
                    type="text"
                    placeholder="Jon Doe"
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <InputField
                    prefix="devlinks/"
                    label="URL for your devlinks"
                    id="username"
                    type="text"
                    placeholder="username"
                    error={errors.username?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <hr className="my-6 md:my-8" />

            <div className="flex justify-end md:items-end">
              <PrimaryButton className="md:w-[6rem]" disabled={isLoading}>
                Save
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
