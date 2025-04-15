import { z } from 'zod';
import { PhotoInput } from './PhotoInput';
import { ProfileSection } from './ProfileSection';
import { useEffect, useRef } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue
} from 'react-hook-form';
import { InputField } from '@/Components/Core/InputField';
import { FormError } from '@/Components/Core/FormError';
import { UserProps } from '@/types/user';
import { api } from '@/libs/axios';
import toast from 'react-hot-toast';
import { handleApiError } from '@/utils/handleApiError';
import PrimaryButton from '@/Components/Core/PrimaryButton';

type Props = {
  user: UserProps;
  photoPreview: string | null;
  control: Control<ProfileFormSchema>;
  errors: FieldErrors<ProfileFormSchema>;
  isSubmitting: boolean;
  setValue: UseFormSetValue<ProfileFormSchema>;
  handleSubmit: UseFormHandleSubmit<ProfileFormSchema>;
  setOriginalImage: (value: string | null) => void;
  setShowCropper: (value: boolean) => void;
  setPhotoPreview: (value: string | null) => void;
};

export const profileFormSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  username: z
    .string()
    .min(3, { message: 'Username must have at least 3 characters' }),
  avatar_url: z
    .custom<File>((file) => file instanceof File && file.size > 0)
    .optional()
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export const FormSection = ({
  user,
  control,
  errors,
  photoPreview,
  isSubmitting,
  setValue,
  handleSubmit,
  setPhotoPreview,
  setOriginalImage,
  setShowCropper
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

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
    console.log(data);
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('_method', 'PUT');

    if (data.avatar_url) {
      formData.append('avatar_url', data.avatar_url);
    }

    try {
      const response = await api.post('/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        toast?.success(response.data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('name', user?.name || '');

      setValue('username', user?.username || '');

      if (user?.avatar_url) {
        setPhotoPreview(user.avatar_url as string);
      }
    }
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-6 mt-6"
    >
      <ProfileSection title="Profile picture">
        <PhotoInput
          isProfileScreen
          withMarginTop={false}
          photoPreview={photoPreview || (user?.avatar_url as string)}
          onChange={handleAvatarChange}
          inputFileRef={inputFileRef as React.RefObject<HTMLInputElement>}
        />
        {errors.avatar_url && <FormError error={errors.avatar_url.message} />}
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
              prefix="@/"
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

      <hr className="my-0" />

      <div className="flex justify-end md:items-end">
        <PrimaryButton className="md:w-[6rem]" disabled={isSubmitting}>
          Save
        </PrimaryButton>
      </div>
    </form>
  );
};
