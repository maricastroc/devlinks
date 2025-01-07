import { EmptyContainer } from '@/Components/EmptyContainer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import EmptySvg from '/public/assets/empty_lists.svg';
import { useEffect } from 'react';
import { notyf } from '@/libs/notyf';

export default function EmailList() {
  const { props } = usePage();
  
  const { success, error } = props;
console.log(props)
  useEffect(() => {
    if (success) {
      notyf?.success(success)
    } else if (error) {
      notyf?.error(error)
    }
  }, [success])
  
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists
        </h2>
      }
    >
      <Head title="List" />

      <EmptyContainer imagePath={EmptySvg} content="It looks like you haven't created any lists yet." title='Create List' />
    </AuthenticatedLayout>
  )
}
