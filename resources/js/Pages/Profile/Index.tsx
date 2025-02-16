import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PhoneMockup } from '@/Components/PhoneMockup';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import ProfileForm from '@/Components/ProfileForm';

interface Props {
  userLinks: UserLinkProps[];
  user: UserProps;
}

export default function Profile({ user, userLinks }: Props) {
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
          <PhoneMockup links={userLinks} />
        </div>
        <div className="flex flex-col w-full p-6 m-4 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
          <h2 className="mb-1 text-2xl font-bold text-dark-gray">
            Profile details
          </h2>
          <p className="mb-8 text-medium-gray">
            Add details to personalize your profile
          </p>
          
          <ProfileForm 
            user={user}
            userLinks={userLinks}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}