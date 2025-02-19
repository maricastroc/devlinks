import { useRef, useState } from 'react';
import { FormEventHandler } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PhoneMockup } from '@/Components/PhoneMockup';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { PhotoInput } from '@/Components/PhotoInput';
import NavLink from '@/Components/NavLink';
import { InputField } from '@/Components/InputField';
import { notyf } from '@/libs/notyf';
import { handleReqError } from '@/utils/handleReqError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';

type Props = {
  userLinks: UserLinkProps[];
  user: UserProps;
};

type ProfileFormData = {
  first_name: string;
  last_name: string;
  public_email: string;
  avatar_url: File | null;
};

type ProfileFormErrors = {
  first_name?: string;
  last_name?: string;
  public_email?: string;
  avatar_url?: string;
};

export default function Profile({ user, userLinks }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const [data, setData] = useState<ProfileFormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    public_email: user?.public_email || '',
    avatar_url: null
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setData({ ...data, avatar_url: file });
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('public_email', data.public_email);

    if (data.avatar_url) {
      formData.append('avatar_url', data.avatar_url);
    }

    formData.append('_method', 'PUT');

    setErrors({});

    try {
      const response = await axios.post('/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        notyf?.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        handleReqError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />
      <div className="lg:m-6 flex lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6">
        <div className="items-center justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <PhoneMockup
            links={userLinks}
            publicEmail={data?.public_email}
            lastName={data?.last_name}
            photoPreview={photoPreview}
            firstName={data?.first_name}
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

          <form onSubmit={submit} className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full p-5 rounded-md md:p-7 bg-light-gray">
              <PhotoInput
                isProfileScreen
                withMarginTop={false}
                photoPreview={photoPreview || (user?.avatar_url as string)}
                onChange={handleAvatarChange}
                error={errors?.avatar_url}
                inputFileRef={inputFileRef as React.RefObject<HTMLInputElement>}
                isLoading={isLoading}
              />
              <InputError message={errors.avatar_url} className="mt-1" />
            </div>

            <div className="flex flex-col p-5 rounded-md md:p-7 bg-light-gray">
              <InputField
                label="First name"
                id="first_name"
                type="text"
                value={data.first_name}
                placeholder="Ben"
                onChange={(e) =>
                  setData({ ...data, first_name: e.target.value })
                }
                error={errors.first_name}
              />
              <InputField
                label="Last name"
                id="last_name"
                type="text"
                value={data.last_name}
                placeholder="Wright"
                onChange={(e) =>
                  setData({ ...data, last_name: e.target.value })
                }
                error={errors.last_name}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                value={data.public_email}
                placeholder="e.g. alex@email.com"
                onChange={(e) =>
                  setData({ ...data, public_email: e.target.value })
                }
                error={errors.public_email}
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
