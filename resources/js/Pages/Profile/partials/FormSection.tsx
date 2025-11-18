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
import { TextAreaField } from '@/Components/Core/TextareaField';
import Checkbox from '@/Components/Core/Checkbox';
import { scrollToInvalidInput } from '@/utils/scrollToInvalidInput';

type Props = {
  user: UserProps | undefined;
  photoPreview: string | null;
  control: Control<ProfileFormSchema>;
  errors: FieldErrors<ProfileFormSchema>;
  isSubmitting: boolean;
  changePassword: boolean;
  handleChangePassword: (value: boolean) => void;
  setValue: UseFormSetValue<ProfileFormSchema>;
  handleSubmit: UseFormHandleSubmit<ProfileFormSchema>;
  setOriginalImage: (value: string | null) => void;
  setShowCropper: (value: boolean) => void;
  setPhotoPreview: (value: string | null) => void;
  mutate: () => void;
};

export const profileFormSchema = (changePassword: boolean) =>
  z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.string().min(3, 'E-mail is required'),
    bio: z.string().nullable(),
    username: z.string().min(3, {
      message: 'Username must have at least 3 characters'
    }),
    avatar_url: z
      .instanceof(File)
      .refine((file) => file.size < 1024 * 1024, {
        message: 'Image must be below 1024x1024px'
      })
      .optional(),
    old_password: changePassword
      ? z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long.' })
      : z.string().optional(),
    new_password: changePassword
      ? z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long.' })
      : z.string().optional()
  });

export type ProfileFormSchema = z.infer<ReturnType<typeof profileFormSchema>>;

export const FormSection = ({
  user,
  control,
  errors,
  photoPreview,
  isSubmitting,
  changePassword,
  handleChangePassword,
  handleSubmit,
  setOriginalImage,
  setShowCropper,
  mutate
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be at most 2MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ProfileFormSchema) => {
    if (formRef.current) {
      formRef.current.classList.add('submitted');
    }

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('_method', 'PUT');

    if (data.bio) {
      formData.append('bio', data.bio);
    }

    if (data.avatar_url) {
      formData.append('avatar_url', data.avatar_url);
    }

    if (changePassword) {
      formData.append('old_password', data.old_password || '');
      formData.append('new_password', data.new_password || '');
    }

    try {
      const response = await api.post('/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast?.success(response.data.message);
      }

      mutate();
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      scrollToInvalidInput(errors, scrollContainerRef);
    }
  }, [errors]);

  return (
    <form
      ref={formRef}
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

      <div
        ref={(el) => {
          scrollContainerRef.current = el;
        }}
        className="flex flex-col p-5 rounded-md md:p-7 bg-light-gray lg:max-h-[15.5rem] overflow-y-auto custom-scrollbar"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              label="Your email"
              id="email"
              type="text"
              placeholder="e.g. alex@email.com"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
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

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextAreaField
              id="bio"
              label="Your bio"
              name={field.name}
              placeholder="Tell us about yourself..."
              rows={5}
              className="w-full min-w-full"
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              maxLength={80}
            />
          )}
        />

        <div className="flex items-center gap-2 mt-8">
          <Checkbox
            checked={!!changePassword}
            onChange={() => handleChangePassword(!changePassword)}
          />
          <p className="text-md text-medium-gray">Change Password?</p>
        </div>

        {changePassword && (
          <>
            <Controller
              name="old_password"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Your current password"
                  id="old_password"
                  type="password"
                  placeholder="At least 8 characters"
                  error={
                    errors.old_password?.message &&
                    'Password must be at least 8 characters long.'
                  }
                  {...field}
                />
              )}
            />

            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Your new password"
                  id="new_password"
                  type="password"
                  placeholder="At least 8 characters"
                  error={
                    errors.new_password?.message &&
                    'Password must be at least 8 characters long.'
                  }
                  {...field}
                />
              )}
            />
          </>
        )}
      </div>

      <hr className="my-0" />

      <div className="flex justify-end md:items-end">
        <PrimaryButton
          type="submit"
          className="md:w-[6rem]"
          disabled={isSubmitting}
        >
          Save
        </PrimaryButton>
      </div>
    </form>
  );
};
