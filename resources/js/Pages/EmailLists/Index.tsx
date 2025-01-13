/* eslint-disable react-hooks/exhaustive-deps */
import { EmptyContainer } from '@/Components/EmptyContainer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import EmptySvg from '/public/assets/empty_lists.svg'
import { useEffect, useState } from 'react'
import { EmailListProps } from '@/types/emailList'
import TextInput from '@/Components/TextInput'
import LinkButton from '@/Components/LinkButton'
import { ListsTable } from './Partials/ListsTable'

interface Props {
  emailLists: EmailListProps[]
}

export default function EmailList({ emailLists }: Props) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        router.get(
          route('lists'),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          },
        )
      } else {
        router.get(
          route('lists.edit', {
            search,
          }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          },
        )
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists
        </h2>
      }
    >
      <Head title="List" />

      {(emailLists?.length > 0 && search === '') || search !== '' ? (
        <div className="flex flex-col">
          <Link href={route('lists')} className="mb-2 ml-1 text-xs text-gray-400">
            Lists
          </Link>
          <section className="p-8 w-[45rem] rounded-xl bg-background-secondary">
            <div className="grid grid-cols-[1fr,3.5fr] gap-4">
              <LinkButton href={route('lists.create')}>Create List</LinkButton>
              <TextInput
                id="search"
                name="search"
                className="block w-full py-2"
                placeholder="Search for a list"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                spellCheck={false}
              />
            </div>

            <ListsTable emailLists={emailLists} />
          </section>
        </div>
      ) : (
        <EmptyContainer
          url="/lists/create"
          imagePath={EmptySvg}
          content="It looks like you haven't created any lists yet."
          title="Create List"
        />
      )}
    </AuthenticatedLayout>
  )
}
