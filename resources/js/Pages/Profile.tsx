import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { z } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/PhoneMockup';
import PrimaryButton from '@/Components/PrimaryButton';
import { PhotoInput } from '@/Components/PhotoInput';
import NavLink from '@/Components/NavLink';
import { InputField } from '@/Components/InputField';
import { FormError } from '@/Components/FormError';
import { LoadingComponent } from '@/Components/LoadingComponent';
import { handleReqError } from '@/utils/handleReqError';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';

type Props = {
  userLinks: UserLinkProps[];
  user: UserProps;
};

const profileFormSchema = z.object({
  first_name: z.string().min(3, 'First name is required'),
  last_name: z.string().min(3, 'Last name is required'),
  public_email: z.string().email('E-mail is required'),
  username: z
    .string()
    .min(8, { message: 'Username must have at least 3 characters' }),
  avatar_url: z
    .custom<File>((file) => file instanceof File && file.size > 0)
    .optional()
});

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export default function Profile({ user, userLinks }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      public_email: user?.public_email || '',
      username: user?.username || ''
    }
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue('avatar_url', file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormSchema) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('username', data.username);
    formData.append('public_email', data.public_email);
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
        notyf?.success(response.data.message);
      }
    } catch (error) {
      handleReqError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('first_name', user?.first_name || '');
      setValue('last_name', user?.last_name || '');
      setValue('public_email', user?.public_email || '');

      if (user?.avatar_url) {
        setPhotoPreview(user.avatar_url as string);
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
      <div className="lg:m-6 flex lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6">
        <div className="items-center justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <PhoneMockup
            links={userLinks}
            publicEmail={watch().public_email}
            lastName={watch().last_name}
            photoPreview={photoPreview}
            firstName={watch().first_name}
            user={user}
          />
        </div>
        <div className="flex flex-col w-full p-6 m-4 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
          <div className="flex items-center justify-between w-full">
            <h2 className="mb-1 md:text-[2rem] text-2xl font-bold text-dark-gray">
              Profile Details
            </h2>
            <NavLink
              className="flex items-center transition-all duration-150 md:gap-2 hover:text-medium-red"
              href={route('logout')}
              method="post"
            >
              <p className="hidden md:block">Logout</p>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </NavLink>
          </div>
          <p className="mb-8 text-medium-gray w-[80%]">
            Add details to personalize your profile
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-6"
          >
            <div className="flex flex-col w-full p-5 rounded-md md:p-7 bg-light-gray">
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
            </div>

            <div className="flex flex-col p-5 rounded-md md:p-7 bg-light-gray">
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="First name"
                    id="first_name"
                    type="text"
                    placeholder="Ben"
                    error={errors.first_name?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Last name"
                    id="last_name"
                    type="text"
                    placeholder="Wright"
                    error={errors.last_name?.message}
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
              <Controller
                name="public_email"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="e.g. alex@email.com"
                    error={errors.public_email?.message}
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
