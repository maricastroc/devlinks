import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import EmptySvg from '/public/assets/empty_campaign.svg'
import { EmptyContainer } from '@/Components/EmptyContainer'

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <EmptyContainer
        imagePath={EmptySvg}
        url='/'
        content="It looks like you haven't created any campaigns yet."
        title="Create Campaign"
      />
    </AuthenticatedLayout>
  )
}
