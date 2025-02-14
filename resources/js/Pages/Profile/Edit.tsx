import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
  status
}: PageProps<{ status?: string }>) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
          <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-background-secondary">
            <UpdateProfileInformationForm
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-background-secondary">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-background-secondary">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
